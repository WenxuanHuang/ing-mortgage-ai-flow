
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Brain, Users } from 'lucide-react';

const DataFlowVisualization = () => {
  return (
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
  );
};

export default DataFlowVisualization;
