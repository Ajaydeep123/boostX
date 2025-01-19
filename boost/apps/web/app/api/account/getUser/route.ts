import { NextRequest, NextResponse } from 'next/server';
import { validateRequest } from '../../../../utils/validateRequest';
import apiResponse from '../../../../utils/apiResponse';
import prismaClient from '@boost/db';
import { Account } from 'aws-sdk';

export const GET = async (req: NextRequest) => {
  const { user, session } = await validateRequest();
  if (!user || !session?.id) {
    return NextResponse.json(new apiResponse(401, 'Unauthorized', null), {
      status: 401,
    });
  }

  const userData = await prismaClient.user.findFirst({
    where: {
      id: user.id,
    },
    select: {
      email: true,
      username: true,
      firstName: true,
      lastName: true,
      role: true,
      avatar: true,
      id: true,
      createdAt: true,
      account: {
        take: 1,
        select: {
          accountType: true,
          awsAccountId: true,
          roleType: true,
        },
      },
    },
  });
  if (!userData) {
    return NextResponse.json(new apiResponse(404, 'User not found', null), {
      status: 404,
    });
  }
  if (userData.account.length == 0) {
    return NextResponse.json(
      new apiResponse(200, 'User found but account doesnt exist', {
        user: userData,
        accountExist: false,
      }),
      { status: 200 },
    );
  }

  return NextResponse.json(
    new apiResponse(200, 'User found', { user: userData, accountExist: true }),
    {
      status: 200,
    },
  );
};
