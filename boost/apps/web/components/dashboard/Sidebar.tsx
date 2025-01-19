'use Client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '../../components/ui/button';
import {
  ArrowRight,
  DollarSign,
  LineChart,
  FileText,
  User,
  X,
  Settings,
  LogOut,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '../../components/ui/select';

import OnboardingModal from '../../components/common/OnboardingModal';

import { logout } from '../../app/actions/logout.action';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useDialog } from '../../store/onboardingmodalstore';

interface NavItem {
  name: string;
  icon: React.ElementType;
  href: string;
}

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

interface UserData {
  avatar: string;
  username: string;
  email: string;
}

const navItems: NavItem[] = [
  { name: 'Save', icon: DollarSign, href: '/dashboard' },
  {
    name: 'Recommendations',
    icon: LineChart,
    href: '/dashboard/recommendations',
  },
  { name: 'Invoices', icon: FileText, href: '/dashboard/invoices' },
  { name: 'Docs', icon: FileText, href: '/dashboard/docs' },
];

export default function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  const [isOnboardingModalOpen, setIsOnboardingModalOpen] =
    useState<boolean>(false);
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const { onOpen } = useDialog();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/account/getUser');
        const { avatar, username, email } = response.data.data.user;
        setUserData({ avatar, username, email });
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleSelectChange = async (value: string) => {
    switch (value) {
      case 'signout':
        try {
          await logout();
        } catch (error) {
          console.error('Logout failed:', error);
        }
        break;
      case 'settings':
        router.push('/dashboard/settings');
        break;
      case 'account':
        router.push('/dashboard/account');
        break;
      default:
        console.log('Selected:', value);
    }
  };
  const pathname = usePathname();

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-gray-100 transition-transform duration-200 ease-in-out dark:bg-[#0A0C0F] ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}
    >
      <div className="flex h-full flex-col overflow-y-auto">
        <div className="p-4">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              100xBoost
            </h2>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close sidebar</span>
            </Button>
          </div>
          <nav className="flex flex-col space-y-2">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href} passHref>
                <Button
                  variant="ghost"
                  className={`w-full justify-start text-sm font-medium transition-colors hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-[#1E2023] dark:hover:text-white ${
                    pathname === item.href
                      ? 'bg-gray-200 text-gray-900 dark:bg-[#1E2023] dark:text-white'
                      : 'text-gray-600 dark:text-gray-300'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Button>
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-auto space-y-4 p-4">
          <Select onValueChange={handleSelectChange}>
            <SelectTrigger className="h-12 w-full border-gray-200 bg-white dark:border-gray-800 dark:bg-[#13151A]">
              <div className="flex items-center">
                <div className="mr-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#D591FE]">
                  {userData?.avatar ? (
                    <img
                      src={userData.avatar}
                      alt="User Avatar"
                      className="h-full w-full rounded-full"
                    />
                  ) : (
                    <User className="h-5 w-5 text-gray-900" />
                  )}
                </div>
                <div className="flex-grow text-left">
                  <div className="font-medium text-gray-900 dark:text-white">
                    {userData?.username}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {userData?.email || 'john@example.com'}
                  </div>
                </div>
              </div>
            </SelectTrigger>
            <SelectContent className="border-gray-200 bg-white dark:border-gray-800 dark:bg-[#13151A]">
              <SelectItem value="account">
                <div className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  <span>Account</span>
                </div>
              </SelectItem>
              <SelectItem value="settings">
                <div className="flex items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </div>
              </SelectItem>
              <SelectItem value="signout">
                <div className="flex items-center">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign Out</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
          <Button
            className="w-full bg-[#00FFD1] text-sm font-medium text-gray-900 hover:bg-[#00D1B2] dark:bg-[#00FFD1] dark:hover:bg-[#00D1B2]"
            onClick={onOpen}
          >
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <OnboardingModal />
      </div>
    </aside>
  );
}
