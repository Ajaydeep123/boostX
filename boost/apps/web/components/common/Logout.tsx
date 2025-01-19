import { logout } from '../../app/actions/logout.action';

export default function Logout() {
  return (
    <form action={logout}>
      <button className="rounded-md bg-red-500 px-4 py-2" type="submit">
        Sign out
      </button>
    </form>
  );
}
