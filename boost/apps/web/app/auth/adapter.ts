import { Google } from 'arctic';

import db from '@boost/db';
import { PrismaAdapter } from '@lucia-auth/adapter-prisma';
import { Lucia, TimeSpan } from 'lucia';

interface DatabaseAttributes {
  displayName: string;
  email: string;
  id: string;
  imageUrl: string;
  username: string;
  role: string;
}

const adapter = new PrismaAdapter(db.session, db.user);

export const googleAuth = new Google(
  process.env.GOOGLE_CLIENT_ID!,
  process.env.GOOGLE_CLIENT_SECRET!,
  `${process.env.NEXT_PUBLIC_BASE_URL}/api/login/google`,
);

export const lucia = new Lucia(adapter, {
  sessionExpiresIn: new TimeSpan(2, 'w'), // TODO: Discuss with team, what would be a good time to expire a session
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === 'production',
    },
  },
  getUserAttributes: (attributes) => {
    return {
      id: attributes.id,
      displayName: attributes.displayName,
      email: attributes.email,
      username: attributes.username,
      imageUrl: attributes.imageUrl,
      role: attributes.role,
    };
  },
});

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseAttributes;
    UserId: string;
  }
}
