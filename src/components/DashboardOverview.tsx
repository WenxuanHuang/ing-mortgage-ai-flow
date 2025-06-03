
import React from 'react';
import MetricsGrid from '@/components/dashboard/MetricsGrid';
import RecentApplicationsCard from '@/components/dashboard/RecentApplicationsCard';
import AIInsightsCard from '@/components/dashboard/AIInsightsCard';
import ProcessingStatsCard from '@/components/dashboard/ProcessingStatsCard';

const DashboardOverview = () => {
  return (
    <div className="space-y-6">
      <MetricsGrid />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentApplicationsCard />
        <AIInsightsCard />
      </div>

      <ProcessingStatsCard />
    </div>
  );
};

export default DashboardOverview;
