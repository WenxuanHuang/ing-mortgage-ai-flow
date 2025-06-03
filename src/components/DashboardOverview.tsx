
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { FileText, Clock, CheckCircle, AlertTriangle, TrendingUp, Zap, Users } from 'lucide-react';

const DashboardOverview = () => {
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

  const aiInsights = [
    {
      type: 'recommendation',
      message: 'APP-2024-001 ready for approval - all AI checks passed',
      priority: 'high'
    },
    {
      type: 'alert',
      message: 'Income verification required for APP-2024-005',
      priority: 'medium'
    },
    {
      type: 'optimization',
      message: '3 applications could benefit from Fast Lane Track',
      priority: 'low'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Metrics Grid */}
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Applications */}
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
                      <Badge variant={app.risk === 'Low' ? 'default' : 'secondary'}>
                        {app.risk} Risk
                      </Badge>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">{app.amount}</span>
                    <span className="text-sm text-gray-600">{app.status}</span>
                  </div>
                  <Progress value={app.progress} className="h-2" />
                  <p className="text-xs text-gray-500 mt-1">{app.progress}% complete</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              AI Insights & Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {aiInsights.map((insight, index) => (
                <div key={index} className={`p-3 rounded-lg border-l-4 ${
                  insight.priority === 'high' ? 'border-red-500 bg-red-50' :
                  insight.priority === 'medium' ? 'border-yellow-500 bg-yellow-50' :
                  'border-blue-500 bg-blue-50'
                }`}>
                  <div className="flex items-start gap-3">
                    {insight.type === 'recommendation' && <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />}
                    {insight.type === 'alert' && <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5" />}
                    {insight.type === 'optimization' && <TrendingUp className="w-4 h-4 text-blue-600 mt-0.5" />}
                    <div>
                      <p className="text-sm font-medium">{insight.message}</p>
                      <Button size="sm" variant="outline" className="mt-2">
                        Take Action
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Processing Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Processing Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">2.3 days</p>
              <p className="text-sm text-gray-600">Average Processing Time</p>
              <p className="text-xs text-green-600">↓ 1.2 days improvement</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">94%</p>
              <p className="text-sm text-gray-600">AI Accuracy Rate</p>
              <p className="text-xs text-blue-600">↑ 3% improvement</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-orange-600">87%</p>
              <p className="text-sm text-gray-600">Customer Satisfaction</p>
              <p className="text-xs text-orange-600">↑ 5% improvement</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardOverview;
