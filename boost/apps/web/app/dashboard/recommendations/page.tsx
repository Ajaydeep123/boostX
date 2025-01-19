import RecommendationsPage from '../../../components/dashboard/Recommendations';
import { redirect } from 'next/navigation';
import { validateRequest } from '../../../utils/validateRequest';
export default async function RecommendationsRoute() {
  const { session } = await validateRequest();

  if (!session) {
    redirect('/auth');
  }
  return <RecommendationsPage />;
}
