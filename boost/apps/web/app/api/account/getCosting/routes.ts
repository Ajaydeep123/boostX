import { NextRequest, NextResponse } from 'next/server';
import { validateRequest } from '../../../../utils/validateRequest';
import apiResponse from '../../../../utils/apiResponse';
import AWS from 'aws-sdk';
import prismaClient from '@boost/db';
import {
  CostExplorer,
  GetCostAndUsageCommand,
  GetReservationPurchaseRecommendationCommand,
  GetDimensionValuesCommand,
  GetSavingsPlansPurchaseRecommendationCommand,
  GetRightsizingRecommendationCommand,
  CostExplorerClient,
} from '@aws-sdk/client-cost-explorer';
import { STSClient, AssumeRoleCommand } from '@aws-sdk/client-sts';

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

  const sts = new STSClient({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY?.toString().trim() || '',
      secretAccessKey: process.env.S3_ACCESS_SECRET?.toString().trim() || '',
    },
  });
  let credentials;
  try {
    const command = new AssumeRoleCommand({
      RoleArn: getAccountDetails.assumeRoleArn,
      RoleSessionName: 'costing',
      ExternalId: getAccountDetails.externalId,
    });
    const data = await sts.send(command);
    if (!data || !data.Credentials) {
      return NextResponse.json(
        new apiResponse(400, 'There was some problem assuming the role', null),
        { status: 400 },
      );
    }

    credentials = data.Credentials;
    if (
      !credentials ||
      !credentials.AccessKeyId ||
      !credentials.SecretAccessKey ||
      !credentials.SessionToken
    ) {
      throw new Error('Missing or invalid temporary credentials');
    }
    const costExplorer = new CostExplorerClient({
      credentials: {
        accessKeyId: credentials.AccessKeyId,
        secretAccessKey: credentials.SecretAccessKey,
        sessionToken: credentials.SessionToken,
      },
      region: process.env.AWS_REGION || 'ap-south-1',
    });
    const historicalData = getHistoricalCosts(costExplorer);
    console.log(JSON.stringify(historicalData));
    const reserveInstanceRecommendation = analyzeRIOpportunities(costExplorer);
    console.log(JSON.stringify(reserveInstanceRecommendation));
    console.log(JSON.stringify(getRightsizingRecommendation(costExplorer)));
    console.log(JSON.stringify(getSavingsPlanRecommendation(costExplorer)));
  } catch (error) {
    console.error('Error assuming role:', error);
    return NextResponse.json(
      new apiResponse(400, 'There was some problem assuming the role', null),
      { status: 400 },
    );
  }
};

async function getHistoricalCosts(ce: CostExplorerClient) {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - 12);

  const command = new GetCostAndUsageCommand({
    TimePeriod: {
      Start: startDate.toISOString().split('T')[0],
      End: endDate.toISOString().split('T')[0],
    },
    Granularity: 'MONTHLY',
    Metrics: ['UnblendedCost', 'UsageQuantity'],
    Filter: {
      Dimensions: {
        Key: 'SERVICE',
        Values: ['Amazon Elastic Compute Cloud - Compute'],
      },
    },
  });

  const response = await ce.send(command);

  return response.ResultsByTime?.map((result) => ({
    date: result.TimePeriod?.Start,
    ec2Cost: parseFloat(result.Total?.UnblendedCost?.Amount || '0'),
    usageQuantity: parseFloat(result.Total?.UsageQuantity?.Amount || '0'),
  }));
}

async function analyzeRIOpportunities(ce: CostExplorerClient) {
  const command = new GetReservationPurchaseRecommendationCommand({
    Service: 'Amazon Elastic Compute Cloud - Compute',
    LookbackPeriodInDays: 'THIRTY_DAYS',
    TermInYears: 'ONE_YEAR',
    PaymentOption: 'ALL_UPFRONT',
  });

  const response = await ce.send(command);

  return response;
}

async function getRightsizingRecommendation(ce: CostExplorerClient) {
  const command = new GetRightsizingRecommendationCommand({
    Service: 'Amazon Elastic Compute Cloud - Compute',
    Configuration: {
      RecommendationTarget: 'SAME_INSTANCE_FAMILY',
      BenefitsConsidered: true,
    },
  });

  const response = await ce.send(command);

  return response;
}

async function getSavingsPlanRecommendation(ce: CostExplorerClient) {
  const command = new GetSavingsPlansPurchaseRecommendationCommand({
    LookbackPeriodInDays: 'THIRTY_DAYS',
    PaymentOption: 'ALL_UPFRONT',
    SavingsPlansType: 'COMPUTE_SP',
    AccountScope: 'LINKED',
    TermInYears: 'ONE_YEAR',
  });
  const response = await ce.send(command);
  return response;
}
