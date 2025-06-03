
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertTriangle, TrendingUp } from 'lucide-react';

const AIInsightsCard = () => {
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
  );
};

export default AIInsightsCard;
