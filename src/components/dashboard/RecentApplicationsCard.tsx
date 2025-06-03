
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Zap } from 'lucide-react';
import ProgressBar from '@/components/shared/ProgressBar';
import StatusBadge from '@/components/shared/StatusBadge';

const RecentApplicationsCard = () => {
  const recentApplications = [
    {
      id: 'APP-2024-001',
      customer: 'Jan van Bergen',
      status: 'AI Processing',
      risk: 'Low',
      amount: '€450,000',
      progress: 75,
      fastTrack: true
    },
    {
      id: 'APP-2024-002',
      customer: 'Maria Silva',
      status: 'Document Review',
      risk: 'Medium',
      amount: '€320,000',
      progress: 45,
      fastTrack: false
    },
    {
      id: 'APP-2024-003',
      customer: 'Thomas Mueller',
      status: 'Risk Assessment',
      risk: 'Low',
      amount: '€580,000',
      progress: 60,
      fastTrack: true
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Recent Applications
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentApplications.map((app) => (
            <div key={app.id} className="p-4 border rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium">{app.customer}</h4>
                  <p className="text-sm text-gray-600">{app.id}</p>
                </div>
                <div className="flex gap-2">
                  {app.fastTrack && (
                    <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                      <Zap className="w-3 h-3 mr-1" />
                      Fast Track
                    </Badge>
                  )}
                  <StatusBadge status={app.risk} type="risk" />
                </div>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">{app.amount}</span>
                <span className="text-sm text-gray-600">{app.status}</span>
              </div>
              <ProgressBar value={app.progress} showPercentage={true} />
              <p className="text-xs text-gray-500 mt-1">{app.progress}% complete</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentApplicationsCard;
