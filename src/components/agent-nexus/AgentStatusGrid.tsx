
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, TrendingUp, Shield, Users, CheckCircle, Brain } from 'lucide-react';
import ProgressBar from '@/components/shared/ProgressBar';

const AgentStatusGrid = () => {
  const agentStatuses = [
    { name: 'Document Intake', status: 'active', load: 75, icon: FileText },
    { name: 'Risk Assessment', status: 'active', load: 60, icon: TrendingUp },
    { name: 'Compliance', status: 'active', load: 40, icon: Shield },
    { name: 'Communication', status: 'idle', load: 20, icon: Users },
    { name: 'Quality Assurance', status: 'active', load: 85, icon: CheckCircle },
    { name: 'Workflow Optimization', status: 'active', load: 55, icon: Brain }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'idle': return 'bg-gray-100 text-gray-800';
      case 'overloaded': return 'bg-red-100 text-red-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {agentStatuses.map((agent) => {
        const Icon = agent.icon;
        return (
          <Card key={agent.name}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Icon className="w-5 h-5" />
                  <span className="font-medium text-sm">{agent.name}</span>
                </div>
                <Badge variant="secondary" className={getStatusColor(agent.status)}>
                  {agent.status}
                </Badge>
              </div>
              <ProgressBar
                value={agent.load}
                label="Processing Load"
                showPercentage={true}
              />
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default AgentStatusGrid;
