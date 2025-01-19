'use client';

import { useState, useEffect } from 'react';
import { Button } from '../../components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import { Switch } from '../../components/ui/switch';
import { Skeleton } from '../../components/ui/skeleton';
import { BarChart, FileText, Sparkles } from 'lucide-react';
import StatCard from './StatCard';
import StatCardSkeleton from './StatCardSkeleton';

interface Recommendation {
  id: number;
  service: string;
  onDemandPrice: string;
  riPrice: string;
  monthlySavings: string;
}

export default function RecommendationsPage() {
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [savingsMode, setSavingsMode] = useState('manual');

  // TODO : Fetch actual data
  const generateRecommendations = () => {
    setLoading(true);
    setTimeout(() => {
      setRecommendations([
        {
          id: 1,
          service: 'EC2',
          onDemandPrice: '$100',
          riPrice: '$80',
          monthlySavings: '$20',
        },
        {
          id: 2,
          service: 'RDS',
          onDemandPrice: '$150',
          riPrice: '$120',
          monthlySavings: '$30',
        },
      ]);
      setLoading(false);
    }, 1500);
  };

  return (
    <>
      <section className="mb-6">
        <div className="mb-4 flex items-center justify-between">
          <Button
            onClick={generateRecommendations}
            className="bg-[#D591FE] text-gray-900 hover:bg-[#F8DAFE]"
          >
            Generate
          </Button>
        </div>
        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          {loading ? (
            <>
              <StatCardSkeleton />
              <StatCardSkeleton />
              <StatCardSkeleton />
            </>
          ) : (
            <>
              <StatCard
                title="Total Savings"
                value="$1,234.56"
                icon={BarChart}
              />
              <StatCard
                title="Commitment Cost"
                value="$5,678.90"
                icon={FileText}
              />
              <StatCard title="Total Instances" value="42" icon={Sparkles} />
            </>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">Savings Mode:</span>
          <Switch
            checked={savingsMode === 'auto'}
            onCheckedChange={(checked) =>
              setSavingsMode(checked ? 'auto' : 'manual')
            }
            className="data-[state=checked]:bg-[#D591FE]"
          />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {savingsMode === 'auto' ? 'Auto' : 'Manual'}
          </span>
        </div>
      </section>

      <Card className="border-gray-200 bg-white dark:border-gray-800 dark:bg-[#13151A]">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold">
            Recommendations Table
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
            </div>
          ) : recommendations.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full overflow-hidden rounded-lg bg-white shadow-md dark:bg-[#13151A]">
                <thead className="bg-gray-100 dark:bg-gray-800">
                  <tr>
                    <th className="px-4 py-2 text-left">Recommendation</th>
                    <th className="px-4 py-2 text-left">Service</th>
                    <th className="px-4 py-2 text-left">On Demand Price</th>
                    <th className="px-4 py-2 text-left">RI Price</th>
                    <th className="px-4 py-2 text-left">Monthly Savings</th>
                    <th className="px-4 py-2 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recommendations.map((rec) => (
                    <tr
                      key={rec.id}
                      className="border-t border-gray-200 dark:border-gray-700"
                    >
                      <td className="px-4 py-2">Switch to Reserved Instance</td>
                      <td className="px-4 py-2">{rec.service}</td>
                      <td className="px-4 py-2">{rec.onDemandPrice}</td>
                      <td className="px-4 py-2">{rec.riPrice}</td>
                      <td className="px-4 py-2">{rec.monthlySavings}</td>
                      <td className="px-4 py-2">
                        <Button variant="outline" size="sm">
                          Apply
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-4 text-center">
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                No current recommendations
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                We're on the lookout to maximize your savings. Stay tuned!
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
