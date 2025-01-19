'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Button } from '../../components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../components/ui/tabs';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import { ChartContainer } from '../../components/ui/chart';

import OnboardingModal from '../../components/common/OnboardingModal';
import { useDialog } from '../../store/onboardingmodalstore';

const data = [
  { name: 'Oct', value: 0 },
  { name: 'Nov', value: 0 },
  { name: 'Dec', value: 0 },
  { name: 'Jan', value: 0 },
  { name: 'Feb', value: 0 },
  { name: 'Mar', value: 0 },
];

export default function SavePage() {
  const [selectedPeriod, setSelectedPeriod] = useState('1M');
  const [mounted, setMounted] = useState(false);
  const { onOpen } = useDialog();
  useEffect(() => {
    setMounted(true);
    onOpen();
  }, [onOpen]);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <div className="flex-1 overflow-auto">
        <main className="space-y-4 p-4">
          <Card className="border-gray-200 bg-white dark:border-gray-800 dark:bg-[#13151A]">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">
                  100xBoost savings
                </CardTitle>
                <div className="flex items-center space-x-1">
                  {['1M', '3M', '6M', '1Y'].map((period) => (
                    <Button
                      key={period}
                      variant={
                        selectedPeriod === period ? 'secondary' : 'ghost'
                      }
                      size="sm"
                      onClick={() => setSelectedPeriod(period)}
                      className="px-2 py-1 text-xs"
                    >
                      {period}
                    </Button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{ value: { label: 'Savings ($)', color: '#D591FE' } }}
                className="h-[250px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis dataKey="name" stroke="#6B7280" fontSize={12} />
                    <YAxis stroke="#6B7280" fontSize={12} />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#D591FE"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
              <div className="mt-3 text-center">
                <p className="mb-2 text-sm font-medium">
                  Complete onboarding to unlock your savings.
                </p>
                <div className="space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-300 text-xs dark:border-gray-600"
                  >
                    Book a demo
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-300 text-xs dark:border-gray-600"
                    onClick={onOpen}
                  >
                    Self-serve
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200 bg-white dark:border-gray-800 dark:bg-[#13151A]">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">
                Savings overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1 text-sm">
                {[
                  { label: 'Original costs', value: '$0.00' },
                  { label: 'Past savings', value: '$0.00' },
                  { label: '100xBoost savings (estimated)', value: '$0.00' },
                  { label: 'Actual costs (estimated)', value: '$0.00' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">
                      {label}
                    </span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="summary" className="space-y-2">
            <TabsList className="border-gray-200 bg-white dark:border-gray-800 dark:bg-[#13151A]">
              {[
                'Summary',
                'SPs',
                'RIs',
                'Group buying',
                'Anomalies',
                'Budget alerts',
              ].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab.toLowerCase().replace(' ', '-')}
                  className="text-xs"
                >
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value="summary">
              <Card className="border-gray-200 bg-white dark:border-gray-800 dark:bg-[#13151A]">
                <CardContent className="p-4">
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                    No cost is accrued yet for this period 🤷‍♂️
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>

      <OnboardingModal />
    </>
  );
}
