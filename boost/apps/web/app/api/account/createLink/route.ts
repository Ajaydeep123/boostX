import { NextRequest, NextResponse } from 'next/server';
import apiResponse from '../../../../utils/apiResponse';
import { v4 as uuidv4 } from 'uuid';
import { validateRequest } from '../../../../utils/validateRequest';
import { CFStatusSetValue } from '../../../../utils/redis';
import { CloudformationStatus } from '../../../../types/CloudformationStatus.types';
export async function GET(req: NextRequest) {
  const { user, session } = await validateRequest();

  if (!user || !session?.id) {
    return NextResponse.json(new apiResponse(401, 'Unauthorized', null), {
      status: 401,
    });
  }

  const roleType = req.nextUrl.searchParams.get('role_type');
  console.log(roleType);

  if (!roleType || roleType !== 'READONLY') {
    return NextResponse.json(
      new apiResponse(400, 'Role type is required and must be READONLY', null),
      { status: 400 },
    );
  }

  try {
    const externalId = uuidv4();
    console.log(externalId);
    const boostId = user.id;
    const region = 'ap-south-1';

    const quickCreateLink =
      `https://${region}.console.aws.amazon.com/cloudformation/home?region=${region}#/stacks/create/review` +
      `?templateURL=${encodeURIComponent(process.env.BOOST_STACK_URL as string)}` +
      `&stackName=BoostReadOnlyRoleStack${boostId}` +
      `&param_BoostID=${boostId}` +
      `&param_BoostExternalID=${encodeURIComponent(externalId)}` +
      `&param_BoostIamRole=${encodeURIComponent(process.env.BOOST_IAM_ROLE || '')}` +
      `&param_BoostPingbackArn=${encodeURIComponent(process.env.BOOST_PINGBACK_ARN || '')}` +
      `&param_BoostRoleType=${encodeURIComponent(roleType)}`;

    console.log(quickCreateLink);
    CFStatusSetValue(boostId, CloudformationStatus.PENDING);
    return NextResponse.json(
      new apiResponse(200, 'CloudFormation link generated successfully', {
        link: quickCreateLink,
      }),
      { status: 200 },
    );
  } catch (error) {
    console.error('Error generating CloudFormation link:', error);
    return NextResponse.json(
      new apiResponse(500, 'Internal server error', error),
      { status: 500 },
    );
  }
}
