'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';

const Sidebar = dynamic(() => import('../dashboard/Sidebar'), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-y-0 left-0 z-50 w-64 bg-gray-100 md:relative dark:bg-[#0A0C0F]">
      <div className="p-4">
        <div className="h-8 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
      </div>
    </div>
  ),
});

const Header = dynamic(() => import('../dashboard/Header'), {
  ssr: false,
  loading: () => (
    <div className="h-16 border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-[#0F1115]">
      <div className="flex h-full items-center px-4">
        <div className="h-8 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
      </div>
    </div>
  ),
});

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex h-screen bg-white text-gray-900 transition-colors duration-200 ease-in-out dark:bg-[#0F1115] dark:text-white">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          theme={theme as string}
          setTheme={setTheme}
        />
        <main className="flex-1 space-y-4 overflow-auto p-4">
          {mounted ? children : null}
        </main>
      </div>
    </div>
  );
}
