import { NextRequest, NextResponse } from 'next/server';
import apiResponse from '../../../../utils/apiResponse';
import AWS from 'aws-sdk';
import prismaClient from '@boost/db';
import { validateRequest } from '../../../../utils/validateRequest';
export const POST = async (req: NextRequest) => {
  const { user, session } = await validateRequest();
  if (!user || !session?.id) {
    return NextResponse.json(new apiResponse(401, 'Unauthorized', null), {
      status: 401,
    });
  }
  const body = await req.json();
  if (!body) {
    return NextResponse.json(new apiResponse(400, 'body is required', null), {
      status: 400,
    });
  }
  if (!body.startDate || !body.endDate) {
    return NextResponse.json(
      new apiResponse(400, 'userId, startDate and endDate are required', null),
      { status: 400 },
    );
  }
  if (typeof body.startDate != 'string' || typeof body.endDate != 'string') {
    return NextResponse.json(
      new apiResponse(400, ' startDate and endDate should be string', null),
      { status: 400 },
    );
  }
  const getAccountDetails = await prismaClient.account.findFirst({
    where: {
      userId: user.id,
    },
    select: {
      externalId: true,
      assumeRoleArn: true,
    },
  });
  if (!getAccountDetails) {
    return NextResponse.json(new apiResponse(404, 'Account not found', null), {
      status: 404,
    });
  }
  AWS.config.update({
    accessKeyId: process.env.S3_ACCESS_KEY?.toString().trim() || '',
    secretAccessKey: process.env.S3_ACCESS_SECRET?.toString().trim() || '',
  });
  const sts = new AWS.STS();
  try {
    let credentials;
    try {
      const data = await sts
        .assumeRole({
          RoleArn: getAccountDetails.assumeRoleArn,
          RoleSessionName: 'costing',
          ExternalId: getAccountDetails.externalId,
        })
        .promise();
      if (!data || !data.Credentials) {
        return NextResponse.json(
          new apiResponse(
            400,
            'There was some problem assuming the role',
            null,
          ),
          { status: 400 },
        );
      }

      credentials = data.Credentials;
    } catch (error) {
      console.error('Error assuming role:', error);
      return NextResponse.json(
        new apiResponse(400, 'There was some problem assuming the role', null),
        { status: 400 },
      );
    }
    const costExplorer = new AWS.CostExplorer({
      accessKeyId: credentials.AccessKeyId,
      secretAccessKey: credentials.SecretAccessKey,
      sessionToken: credentials.SessionToken,
    });
    const params = {
      TimePeriod: {
        Start: body.startDate,
        End: body.endDate,
      },
      Granularity: 'MONTHLY',
      Metrics: ['UnblendedCost'],
      Filter: {
        Dimensions: {
          Key: 'SERVICE',
          Values: ['Amazon Elastic Compute Cloud - Compute'],
        },
      },
    };
    try {
      const costData = await costExplorer.getCostAndUsage(params).promise();
      return costData;
    } catch (error) {
      console.error('Error fetching cost data:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error assuming role or fetching cost details:', error);
    return NextResponse.json(
      new apiResponse(
        400,
        'There was some problem while fetching the cost',
        null,
      ),
      { status: 400 },
    );
  }
};
