import { usePathname } from 'next/navigation';
import { Button } from '../../components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { Sheet, SheetContent, SheetTrigger } from '../../components/ui/sheet';
import { Menu, Moon, Sun } from 'lucide-react';
import Sidebar from './Sidebar';

const routeTitles: { [key: string]: string } = {
  '/dashboard': 'Save',
  '/dashboard/recommendations': 'Recommendations',
  '/dashboard/invoices': 'Invoices',
  '/dashboard/docs': 'Documentation',
  '/dashboard/account': 'Account',
  '/dashboard/settings': 'Settings',
};

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  theme: string;
  setTheme: (theme: string) => void;
}

export default function Header({
  sidebarOpen,
  setSidebarOpen,
  theme,
  setTheme,
}: HeaderProps) {
  const pathname = usePathname();
  const pageTitle =
    routeTitles[pathname as keyof typeof routeTitles] || 'Dashboard';

  return (
    <header className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 dark:border-gray-800 dark:bg-[#0F1115]">
      <div className="flex items-center">
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="mr-2 md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <Sidebar
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
            />
          </SheetContent>
        </Sheet>
        <h1 className="text-xl font-semibold">{pageTitle}</h1>
      </div>
      <div className="flex items-center space-x-2">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select account" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="account1">Account 1</SelectItem>
            <SelectItem value="account2">Account 2</SelectItem>
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          size="sm"
          className="border-gray-300 dark:border-gray-600"
        >
          AWS
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'light' ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
        </Button>
      </div>
    </header>
  );
}
