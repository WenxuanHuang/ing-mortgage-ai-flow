
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, CheckCircle, AlertTriangle } from 'lucide-react';

const ProcessingLog = () => {
  const agentActivities = [
    {
      id: 1,
      time: '09:45:23',
      agent: 'Document Intake',
      action: 'Processing',
      target: 'Salary Statement - Jan van Bergen',
      status: 'active',
      confidence: 94
    },
    {
      id: 2,
      time: '09:44:15',
      agent: 'Risk Assessment',
      action: 'Analyzing',
      target: 'Credit History - Maria Silva',
      status: 'active',
      confidence: 87
    },
    {
      id: 3,
      time: '09:43:08',
      agent: 'Compliance',
      action: 'Validating',
      target: 'KYC Requirements - Thomas Mueller',
      status: 'completed',
      confidence: 98
    }
  ];

  const getActivityStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Activity className="w-4 h-4 text-blue-500 animate-pulse" />;
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default: return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5" />
          Real-Time Processing Log
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {agentActivities.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                {getActivityStatusIcon(activity.status)}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{activity.time}</span>
                    <Badge variant="outline" className="text-xs">
                      {activity.agent}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{activity.action}: {activity.target}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">Confidence: {activity.confidence}%</span>
                <div className={`w-2 h-2 rounded-full ${
                  activity.confidence >= 90 ? 'bg-green-500' :
                  activity.confidence >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                }`} />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProcessingLog;
