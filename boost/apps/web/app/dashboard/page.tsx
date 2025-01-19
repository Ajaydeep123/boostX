import SavePage from '../../components/dashboard/Save';
import { redirect } from 'next/navigation';
import { validateRequest } from '../../utils/validateRequest';
export default async function DashboardPage() {
  const { session } = await validateRequest();

  if (!session) {
    redirect('/auth');
  }

  return <SavePage />;
}
