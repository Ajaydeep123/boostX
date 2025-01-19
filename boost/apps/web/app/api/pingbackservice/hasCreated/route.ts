import { NextRequest, NextResponse } from 'next/server';
import { CFStatusGetValue } from '../../../../utils/redis';
import apiResponse from '../../../../utils/apiResponse';
import { validateRequest } from '../../../../utils/validateRequest';

export const GET = async (req: NextRequest) => {
  const { user, session } = await validateRequest();
  if (!user || !session?.id) {
    return NextResponse.json(new apiResponse(401, 'Unauthorized', null), {
      status: 401,
    });
  }

  const hasCreated = await CFStatusGetValue(user.id as string);
  if (!hasCreated) {
    return NextResponse.json(new apiResponse(404, 'Not found', null), {
      status: 404,
    });
  }
  if (hasCreated === 'PENDING') {
    return NextResponse.json(
      new apiResponse(400, 'Pending', { stackCreated: hasCreated }),
      {
        status: 200,
      },
    );
  } else {
    return NextResponse.json(
      new apiResponse(200, 'Created', { stackCreated: hasCreated }),
      {
        status: 200,
      },
    );
  }
};
