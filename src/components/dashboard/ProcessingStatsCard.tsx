
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ProcessingStatsCard = () => {
  return (
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
  );
};

export default ProcessingStatsCard;
