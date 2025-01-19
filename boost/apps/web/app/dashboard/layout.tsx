import { ThemeProvider } from '../../components/theme-provider';
import DashboardLayout from '../../components/layouts/dashboard-layout';

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <DashboardLayout>{children}</DashboardLayout>
    </ThemeProvider>
  );
}
