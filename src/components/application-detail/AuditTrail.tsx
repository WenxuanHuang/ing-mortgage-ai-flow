
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AuditTrail: React.FC = () => (
  <Card>
    <CardHeader>
      <CardTitle>Audit Trail & Decision History</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        <div className="p-3 border-l-4 border-green-500 bg-green-50">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-medium">AI Risk Assessment Completed</p>
              <p className="text-sm text-gray-600">Model version: v2.3.1 | Confidence: 94%</p>
              <p className="text-sm text-gray-600">Training data snapshot: 2024-Q1</p>
            </div>
            <span className="text-sm text-gray-500">2025-06-03 09:15</span>
          </div>
        </div>
        
        <div className="p-3 border-l-4 border-blue-500 bg-blue-50">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-medium">Ockto Data Validation</p>
              <p className="text-sm text-gray-600">Cross-referenced employment data with 98% match</p>
              <p className="text-sm text-gray-600">Source: Official payroll systems</p>
            </div>
            <span className="text-sm text-gray-500">2025-06-03 09:12</span>
          </div>
        </div>

        <div className="p-3 border-l-4 border-yellow-500 bg-yellow-50">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-medium">Human Override Required</p>
              <p className="text-sm text-gray-600">Bank statement anomaly flagged for manual review</p>
              <p className="text-sm text-gray-600">AI Confidence: 73% (below threshold)</p>
            </div>
            <span className="text-sm text-gray-500">2025-06-03 09:10</span>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default AuditTrail;
