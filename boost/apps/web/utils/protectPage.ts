import { redirect } from 'next/navigation';
import { validateRequest } from './validateRequest';

export async function protectPage() {
  const { user, session } = await validateRequest();

  if (!session || !user) {
    redirect('/auth');
  }

  return { user, session };
}
