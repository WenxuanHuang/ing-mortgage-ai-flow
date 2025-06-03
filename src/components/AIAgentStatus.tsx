
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Activity, FileText, Shield, MessageSquare, TrendingUp } from 'lucide-react';

const AIAgentStatus = () => {
  const agents = [
    {
      name: 'Document Analyzer',
      status: 'active',
      icon: FileText,
      progress: 78,
      description: 'Processing 4 documents'
    },
    {
      name: 'Risk Assessor',
      status: 'active',
      icon: Shield,
      progress: 92,
      description: 'Analyzing credit profiles'
    },
    {
      name: 'Communication Hub',
      status: 'standby',
      icon: MessageSquare,
      progress: 45,
      description: 'Monitoring customer queries'
    },
    {
      name: 'Compliance Monitor',
      status: 'active',
      icon: Activity,
      progress: 100,
      description: 'All checks passed'
    },
    {
      name: 'Workflow Optimizer',
      status: 'learning',
      icon: TrendingUp,
      progress: 65,
      description: 'Analyzing patterns'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'standby': return 'bg-yellow-500';
      case 'learning': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Active';
      case 'standby': return 'Standby';
      case 'learning': return 'Learning';
      default: return 'Offline';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center gap-2">
          <Activity className="w-4 h-4" />
          AI Agent Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {agents.map((agent, index) => {
          const Icon = agent.icon;
          return (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium">{agent.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(agent.status)}`} />
                  <span className="text-xs text-gray-600">{getStatusText(agent.status)}</span>
                </div>
              </div>
              <div className="space-y-1">
                <Progress value={agent.progress} className="h-1" />
                <p className="text-xs text-gray-500">{agent.description}</p>
              </div>
            </div>
          );
        })}
        
        <div className="pt-2 border-t">
          <div className="flex justify-between text-xs text-gray-600">
            <span>System Load</span>
            <span>Normal</span>
          </div>
          <Progress value={72} className="h-1 mt-1" />
        </div>
      </CardContent>
    </Card>
  );
};

export default AIAgentStatus;
