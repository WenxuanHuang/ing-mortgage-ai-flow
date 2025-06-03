
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface StatsOverviewProps {
  stats: {
    avgConfidence: number;
    overridesCount: number;
    completedToday: number;
    totalPending: number;
  };
}

const StatsOverview: React.FC<StatsOverviewProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{stats.avgConfidence}%</div>
          <p className="text-sm text-gray-600">AI Confidence</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-orange-600">{stats.overridesCount}</div>
          <p className="text-sm text-gray-600">Human Overrides</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{stats.completedToday}</div>
          <p className="text-sm text-gray-600">Completed Today</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-gray-600">{stats.totalPending}</div>
          <p className="text-sm text-gray-600">Pending Actions</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsOverview;
