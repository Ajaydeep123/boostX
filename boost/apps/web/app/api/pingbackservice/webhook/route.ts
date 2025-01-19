import { NextRequest, NextResponse } from 'next/server';
import apiResponse from '../../../../utils/apiResponse';
import prismaClient from '@boost/db';
import { CFStatusUpdateValue } from '../../../../utils/redis';
import { CloudformationStatus } from '../../../../types/CloudformationStatus.types';

export const POST = async (req: NextRequest) => {
  const headers = req.headers;
  const authToken = headers.get('Authorization');
  const body = await req.json();
  console.log(authToken);
  console.log(body);
  if (!authToken) {
    return NextResponse.json(new apiResponse(401, 'Unauthorized', null), {
      status: 401,
    });
  }
  if (!(authToken.split(' ')[1] == process.env.WEBHOOK_AUTH_TOKEN)) {
    return NextResponse.json(new apiResponse(401, 'Unauthorized', null), {
      status: 401,
    });
  }
  //validation
  if (!body) {
    return NextResponse.json(new apiResponse(400, 'Body is required', null), {
      status: 400,
    });
  }
  if (
    !body.userId ||
    !body.AccountID ||
    !body.RoleType ||
    !body.ExternalID ||
    !body.RoleArn
  ) {
    return NextResponse.json(
      new apiResponse(400, 'all the parameters are required', null),
      {
        status: 400,
      },
    );
  }
  if (
    typeof body.userId !== 'string' ||
    typeof body.AccountID !== 'string' ||
    typeof body.RoleType !== 'string' ||
    typeof body.ExternalID !== 'string' ||
    typeof body.RoleArn !== 'string'
  ) {
    return NextResponse.json(
      new apiResponse(400, 'all the parameters should be of type string', null),
      {
        status: 400,
      },
    );
  }
  const userExists = await prismaClient.user.findFirst({
    where: {
      id: body.userId,
    },
  });
  if (!userExists) {
    return NextResponse.json(new apiResponse(404, 'User not found', null), {
      status: 404,
    });
  }
  const accountExists = await prismaClient.account.findFirst({
    where: {
      awsAccountId: body.AccountId,
    },
  });
  if (accountExists) {
    return NextResponse.json(
      new apiResponse(409, 'Account already exists', null),
      {
        status: 409,
      },
    );
  }

  const accountCreated = await prismaClient.account.create({
    data: {
      awsAccountId: body.AccountID,
      userId: body.BoostID,
      roleType: body.RoleType,
      externalId: body.ExternalID,
      assumeRoleArn: body.RoleArn,
    },
  });
  if (!accountCreated) {
    return NextResponse.json(
      new apiResponse(500, 'Internal Server Error', null),
      {
        status: 500,
      },
    );
  }
  CFStatusUpdateValue(body.BoostID, CloudformationStatus.SUCCESS);
  return NextResponse.json(new apiResponse(200, 'Success', null), {
    status: 200,
  });
};
