
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, TrendingUp, Shield, Users, CheckCircle, Brain, Database, MessageSquare, ArrowRight } from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  icon: any;
  position: { x: number; y: number };
  color: string;
  status: 'active' | 'idle' | 'processing';
}

interface Connection {
  from: string;
  to: string;
  type: 'data' | 'file' | 'communication' | 'validation';
  label: string;
  active: boolean;
}

const DataFlowVisualization = () => {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [hoveredConnection, setHoveredConnection] = useState<string | null>(null);

  const agents: Agent[] = [
    { id: 'intake', name: 'Document Intake', icon: FileText, position: { x: 100, y: 150 }, color: 'blue', status: 'active' },
    { id: 'ocr', name: 'OCR Processing', icon: FileText, position: { x: 300, y: 100 }, color: 'purple', status: 'processing' },
    { id: 'validation', name: 'Data Validation', icon: CheckCircle, position: { x: 500, y: 150 }, color: 'green', status: 'active' },
    { id: 'risk', name: 'Risk Assessment', icon: TrendingUp, position: { x: 300, y: 250 }, color: 'orange', status: 'active' },
    { id: 'compliance', name: 'Compliance Check', icon: Shield, position: { x: 500, y: 300 }, color: 'red', status: 'idle' },
    { id: 'communication', name: 'Customer Comms', icon: Users, position: { x: 100, y: 350 }, color: 'cyan', status: 'active' },
    { id: 'database', name: 'Data Storage', icon: Database, position: { x: 700, y: 200 }, color: 'gray', status: 'active' },
    { id: 'orchestrator', name: 'Workflow Engine', icon: Brain, position: { x: 350, y: 400 }, color: 'indigo', status: 'active' }
  ];

  const connections: Connection[] = [
    { from: 'intake', to: 'ocr', type: 'file', label: 'Raw Documents', active: true },
    { from: 'ocr', to: 'validation', type: 'data', label: 'Extracted Text', active: true },
    { from: 'validation', to: 'risk', type: 'data', label: 'Validated Data', active: false },
    { from: 'validation', to: 'database', type: 'data', label: 'Clean Data', active: true },
    { from: 'risk', to: 'compliance', type: 'data', label: 'Risk Score', active: false },
    { from: 'compliance', to: 'database', type: 'validation', label: 'Compliance Status', active: false },
    { from: 'orchestrator', to: 'communication', type: 'communication', label: 'Customer Updates', active: true },
    { from: 'database', to: 'orchestrator', type: 'data', label: 'Process Status', active: true },
    { from: 'intake', to: 'orchestrator', type: 'communication', label: 'New Case Alert', active: true },
    { from: 'risk', to: 'orchestrator', type: 'communication', label: 'Risk Alert', active: false }
  ];

  const getConnectionColor = (type: string) => {
    switch (type) {
      case 'data': return '#3B82F6';
      case 'file': return '#10B981';
      case 'communication': return '#F59E0B';
      case 'validation': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getAgentColor = (color: string, status: string) => {
    const opacity = status === 'active' ? '1' : status === 'processing' ? '0.8' : '0.5';
    const colors: { [key: string]: string } = {
      blue: '#3B82F6',
      purple: '#8B5CF6',
      green: '#10B981',
      orange: '#F97316',
      red: '#EF4444',
      cyan: '#06B6D4',
      gray: '#6B7280',
      indigo: '#6366F1'
    };
    return colors[color] || '#6B7280';
  };

  const renderConnection = (connection: Connection, index: number) => {
    const fromAgent = agents.find(a => a.id === connection.from);
    const toAgent = agents.find(a => a.id === connection.to);
    
    if (!fromAgent || !toAgent) return null;

    const isHovered = hoveredConnection === `${connection.from}-${connection.to}`;
    const opacity = connection.active ? (isHovered ? 1 : 0.7) : 0.3;
    
    return (
      <line
        key={index}
        x1={fromAgent.position.x + 40}
        y1={fromAgent.position.y + 40}
        x2={toAgent.position.x + 40}
        y2={toAgent.position.y + 40}
        stroke={getConnectionColor(connection.type)}
        strokeWidth={isHovered ? 3 : 2}
        strokeOpacity={opacity}
        strokeDasharray={connection.active ? 'none' : '5,5'}
        className="cursor-pointer transition-all duration-200"
        onMouseEnter={() => setHoveredConnection(`${connection.from}-${connection.to}`)}
        onMouseLeave={() => setHoveredConnection(null)}
      />
    );
  };

  const getAgentConnections = (agentId: string) => {
    return connections.filter(c => c.from === agentId || c.to === agentId);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Interactive Agent Data Flow Network</CardTitle>
        <div className="flex gap-2 flex-wrap">
          <Badge variant="outline" className="text-xs">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-1"></div>
            Data Transfer
          </Badge>
          <Badge variant="outline" className="text-xs">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
            File Exchange
          </Badge>
          <Badge variant="outline" className="text-xs">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mr-1"></div>
            Communication
          </Badge>
          <Badge variant="outline" className="text-xs">
            <div className="w-2 h-2 bg-red-500 rounded-full mr-1"></div>
            Validation
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <svg width="800" height="500" className="border rounded-lg bg-gray-50">
            {/* Render connections first (behind agents) */}
            {connections.map(renderConnection)}
            
            {/* Render agents */}
            {agents.map((agent) => {
              const Icon = agent.icon;
              const isSelected = selectedAgent === agent.id;
              const agentConnections = getAgentConnections(agent.id);
              
              return (
                <g key={agent.id}>
                  <circle
                    cx={agent.position.x + 40}
                    cy={agent.position.y + 40}
                    r={isSelected ? 45 : 35}
                    fill={getAgentColor(agent.color, agent.status)}
                    fillOpacity={agent.status === 'active' ? 0.2 : 0.1}
                    stroke={getAgentColor(agent.color, agent.status)}
                    strokeWidth={isSelected ? 3 : 2}
                    className="cursor-pointer transition-all duration-200"
                    onClick={() => setSelectedAgent(selectedAgent === agent.id ? null : agent.id)}
                  />
                  <foreignObject
                    x={agent.position.x + 25}
                    y={agent.position.y + 25}
                    width="30"
                    height="30"
                    className="pointer-events-none"
                  >
                    <Icon 
                      className="w-6 h-6" 
                      style={{ color: getAgentColor(agent.color, agent.status) }}
                    />
                  </foreignObject>
                  <text
                    x={agent.position.x + 40}
                    y={agent.position.y + 100}
                    textAnchor="middle"
                    className="text-xs font-medium fill-gray-700"
                  >
                    {agent.name}
                  </text>
                  {agent.status === 'processing' && (
                    <circle
                      cx={agent.position.x + 65}
                      cy={agent.position.y + 15}
                      r="4"
                      fill="#F59E0B"
                      className="animate-pulse"
                    />
                  )}
                </g>
              );
            })}
          </svg>
          
          {/* Connection details panel */}
          {hoveredConnection && (
            <div className="absolute top-4 right-4 bg-white p-3 rounded-lg shadow-lg border max-w-xs">
              {(() => {
                const connection = connections.find(c => `${c.from}-${c.to}` === hoveredConnection);
                const fromAgent = agents.find(a => a.id === connection?.from);
                const toAgent = agents.find(a => a.id === connection?.to);
                
                return connection && fromAgent && toAgent ? (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: getConnectionColor(connection.type) }}
                      ></div>
                      <span className="text-sm font-medium capitalize">{connection.type}</span>
                    </div>
                    <div className="text-xs text-gray-600">
                      <div className="flex items-center gap-1 mb-1">
                        <span>{fromAgent.name}</span>
                        <ArrowRight className="w-3 h-3" />
                        <span>{toAgent.name}</span>
                      </div>
                      <div className="font-medium">{connection.label}</div>
                      <div className={`mt-1 ${connection.active ? 'text-green-600' : 'text-gray-400'}`}>
                        {connection.active ? 'Active' : 'Inactive'}
                      </div>
                    </div>
                  </div>
                ) : null;
              })()}
            </div>
          )}
          
          {/* Agent details panel */}
          {selectedAgent && (
            <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-lg border max-w-sm">
              {(() => {
                const agent = agents.find(a => a.id === selectedAgent);
                const agentConnections = getAgentConnections(selectedAgent);
                
                return agent ? (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: getAgentColor(agent.color, agent.status) }}
                      ></div>
                      <span className="font-medium">{agent.name}</span>
                      <Badge variant={agent.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                        {agent.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      <div className="font-medium mb-1">Connections ({agentConnections.length})</div>
                      {agentConnections.map((conn, idx) => {
                        const isOutgoing = conn.from === selectedAgent;
                        const otherAgent = agents.find(a => a.id === (isOutgoing ? conn.to : conn.from));
                        return (
                          <div key={idx} className="flex items-center gap-1 text-xs mb-1">
                            <div 
                              className="w-2 h-2 rounded-full" 
                              style={{ backgroundColor: getConnectionColor(conn.type) }}
                            ></div>
                            <span className="capitalize">{conn.type}</span>
                            <span className="text-gray-400">
                              {isOutgoing ? '→' : '←'} {otherAgent?.name}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : null;
              })()}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DataFlowVisualization;
