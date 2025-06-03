
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Activity, Brain, FileText, Shield, CheckCircle, Users, TrendingUp, AlertTriangle } from 'lucide-react';

const AgentNexus = () => {
  const [agentActivities, setAgentActivities] = useState([
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
  ]);

  const [agentStatuses, setAgentStatuses] = useState([
    { name: 'Document Intake', status: 'active', load: 75, icon: FileText },
    { name: 'Risk Assessment', status: 'active', load: 60, icon: TrendingUp },
    { name: 'Compliance', status: 'active', load: 40, icon: Shield },
    { name: 'Communication', status: 'idle', load: 20, icon: Users },
    { name: 'Quality Assurance', status: 'active', load: 85, icon: CheckCircle },
    { name: 'Workflow Optimization', status: 'active', load: 55, icon: Brain }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'idle': return 'bg-gray-100 text-gray-800';
      case 'overloaded': return 'bg-red-100 text-red-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const getActivityStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Activity className="w-4 h-4 text-blue-500 animate-pulse" />;
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default: return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">AI Agent Collaboration Map</h2>
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          <Brain className="w-3 h-3 mr-1" />
          All Systems Active
        </Badge>
      </div>

      {/* Agent Status Grid */}
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
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Processing Load</span>
                    <span>{agent.load}%</span>
                  </div>
                  <Progress value={agent.load} className="h-2" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Real-Time Processing Log */}
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

      {/* Data Flow Visualization */}
      <Card>
        <CardHeader>
          <CardTitle>Data Flow Map</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-8">
            <div className="grid grid-cols-3 gap-8 items-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                  <FileText className="w-8 h-8 text-blue-600" />
                </div>
                <p className="text-sm font-medium">Ockto Data</p>
              </div>
              <div className="flex items-center">
                <div className="flex-1 h-1 bg-orange-300 rounded"></div>
                <div className="w-3 h-3 bg-orange-500 rotate-45 mx-2"></div>
                <div className="flex-1 h-1 bg-orange-300 rounded"></div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-2">
                  <Brain className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-sm font-medium">AI Agents</p>
              </div>
              <div className="flex items-center">
                <div className="flex-1 h-1 bg-orange-300 rounded"></div>
                <div className="w-3 h-3 bg-orange-500 rotate-45 mx-2"></div>
                <div className="flex-1 h-1 bg-orange-300 rounded"></div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <p className="text-sm font-medium">Employee Portal</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentNexus;
