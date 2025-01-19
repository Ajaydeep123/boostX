import { validateRequest } from '../../utils/validateRequest';
import { redirect } from 'next/navigation';
import AuthClient from '../../components/common/AuthClient';

export default async function AuthPage() {
  const { session } = await validateRequest();
  if (session) {
    redirect('/dashboard');
  }
  return <AuthClient />;
}
