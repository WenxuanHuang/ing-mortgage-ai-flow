
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Brain } from 'lucide-react';
import AgentStatusGrid from './agent-nexus/AgentStatusGrid';
import ProcessingLog from './agent-nexus/ProcessingLog';
import DataFlowVisualization from './agent-nexus/DataFlowVisualization';

const AgentNexus = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">AI Agent Collaboration Map</h2>
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          <Brain className="w-3 h-3 mr-1" />
          All Systems Active
        </Badge>
      </div>

      <AgentStatusGrid />
      <ProcessingLog />
      <DataFlowVisualization />
    </div>
  );
};

export default AgentNexus;
