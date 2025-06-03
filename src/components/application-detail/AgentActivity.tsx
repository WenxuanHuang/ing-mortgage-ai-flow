
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Activity, FileText, Shield, CheckCircle, User } from 'lucide-react';

interface AgentActivityProps {
  application: any;
}

const AgentActivity: React.FC<AgentActivityProps> = ({ application }) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Activity className="w-5 h-5" />
        AI Agent Progress
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Document Intake
            </span>
            <span className="text-sm text-gray-600">{application.agents.documentIntake}%</span>
          </div>
          <Progress value={application.agents.documentIntake} className="h-2" />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Risk Assessment
            </span>
            <span className="text-sm text-gray-600">{application.agents.riskAssessment}%</span>
          </div>
          <Progress value={application.agents.riskAssessment} className="h-2" />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Compliance
            </span>
            <span className="text-sm text-gray-600">{application.agents.compliance}%</span>
          </div>
          <Progress value={application.agents.compliance} className="h-2" />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium flex items-center gap-2">
              <User className="w-4 h-4" />
              Communication
            </span>
            <span className="text-sm text-gray-600">{application.agents.communication}%</span>
          </div>
          <Progress value={application.agents.communication} className="h-2" />
        </div>
      </div>

      <div className="border-t pt-4">
        <h4 className="font-medium mb-2">Recent AI Activity</h4>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {application.agentLogs.map((log, index) => (
            <div key={index} className="flex items-start gap-2 text-sm">
              <div className={`w-2 h-2 rounded-full mt-2 ${
                log.type === 'success' ? 'bg-green-500' :
                log.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
              }`} />
              <div>
                <span className="text-gray-500">{log.timestamp}</span>
                <p className="text-gray-700">{log.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </CardContent>
  </Card>
);

export default AgentActivity;
