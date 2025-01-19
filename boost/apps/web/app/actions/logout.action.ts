'use server';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { validateRequest } from '../../utils/validateRequest';
import { lucia } from '@/auth/adapter';

export async function logout(): Promise<void> {
  const { session } = await validateRequest();
  if (!session) {
    redirect('/auth');
    return;
  }

  await lucia.invalidateSession(session.id);
  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  redirect('/auth');
}
