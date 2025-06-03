
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Clock, CheckCircle, Zap } from 'lucide-react';

const MetricsGrid = () => {
  const metrics = [
    {
      title: 'Active Applications',
      value: '24',
      change: '+12%',
      icon: FileText,
      color: 'blue'
    },
    {
      title: 'Fast Lane Track',
      value: '8',
      change: '+25%',
      icon: Zap,
      color: 'orange'
    },
    {
      title: 'Pending Reviews',
      value: '6',
      change: '-8%',
      icon: Clock,
      color: 'yellow'
    },
    {
      title: 'Approved Today',
      value: '12',
      change: '+15%',
      icon: CheckCircle,
      color: 'green'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        return (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                  <p className={`text-sm ${metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {metric.change} from last week
                  </p>
                </div>
                <Icon className={`w-8 h-8 text-${metric.color}-500`} />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default MetricsGrid;
