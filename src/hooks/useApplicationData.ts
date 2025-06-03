import { useState, useEffect } from 'react';

export interface Application {
  id: string;
  customer: string;
  email: string;
  amount: string;
  status: string;
  risk: string;
  progress: number;
  fastTrack: boolean;
  submittedDate: string;
  aiConfidence: number;
  agents?: {
    documentIntake: number;
    riskAssessment: number;
    compliance: number;
    communication: number;
  };
  agentLogs?: Array<{
    timestamp: string;
    message: string;
    type: string;
  }>;
  tasks?: Array<{
    id: number;
    description: string;
    status: string;
    agent: string;
    confidence?: number;
    flaggedBy?: string;
  }>;
}

export const useApplicationData = () => {
  const [applications, setApplications] = useState<Application[]>([
    {
      id: 'APP-2024-001',
      customer: 'Jan van Bergen',
      email: 'jan.vanbergen@email.nl',
      amount: '€450,000',
      status: 'AI Processing',
      risk: 'Low',
      progress: 75,
      fastTrack: true,
      submittedDate: '2024-01-15',
      aiConfidence: 94,
      agents: {
        documentIntake: 100,
        riskAssessment: 85,
        compliance: 90,
        communication: 60
      },
      agentLogs: [
        { timestamp: '2025-06-03 09:15', message: 'Cross-referenced Ockto-validated salary data with uploaded PDF (98% match confidence)', type: 'success' },
        { timestamp: '2025-06-03 09:12', message: 'Document authenticity verified via PDF metadata analysis', type: 'success' },
        { timestamp: '2025-06-03 09:10', message: 'Processing bank statement anomaly detected', type: 'warning' }
      ],
      tasks: [
        { id: 1, description: 'Salary validation against Ockto data', status: 'done', agent: 'AI', confidence: 98 },
        { id: 2, description: 'Initial debt-to-income calculation', status: 'done', agent: 'AI', confidence: 95 },
        { id: 3, description: 'Document authenticity check via PDF metadata', status: 'done', agent: 'AI', confidence: 100 },
        { id: 4, description: 'Verify 3-month bank statement anomaly', status: 'pending', agent: 'Human', flaggedBy: 'AI' },
        { id: 5, description: 'Confirm property valuation exception', status: 'pending', agent: 'Human', confidence: 89 }
      ]
    },
    {
      id: 'APP-2024-002',
      customer: 'Maria Silva',
      email: 'maria.silva@email.com',
      amount: '€320,000',
      status: 'Document Review',
      risk: 'Medium',
      progress: 45,
      fastTrack: false,
      submittedDate: '2024-01-14',
      aiConfidence: 87,
      agents: {
        documentIntake: 80,
        riskAssessment: 60,
        compliance: 75,
        communication: 40
      },
      agentLogs: [
        { timestamp: '2025-06-03 08:45', message: 'Employment verification in progress', type: 'info' },
        { timestamp: '2025-06-03 08:30', message: 'Credit history analysis completed', type: 'success' }
      ],
      tasks: [
        { id: 1, description: 'Employment verification', status: 'in-progress', agent: 'AI', confidence: 87 },
        { id: 2, description: 'Credit history analysis', status: 'done', agent: 'AI', confidence: 92 }
      ]
    },
    {
      id: 'APP-2024-003',
      customer: 'Thomas Mueller',
      email: 'thomas.mueller@email.de',
      amount: '€580,000',
      status: 'Risk Assessment',
      risk: 'Low',
      progress: 60,
      fastTrack: true,
      submittedDate: '2024-01-13',
      aiConfidence: 92
    },
    {
      id: 'APP-2024-004',
      customer: 'Sophie Dubois',
      email: 'sophie.dubois@email.fr',
      amount: '€275,000',
      status: 'Compliance Check',
      risk: 'Low',
      progress: 85,
      fastTrack: false,
      submittedDate: '2024-01-12',
      aiConfidence: 96
    },
    {
      id: 'APP-2024-005',
      customer: 'Lars Andersen',
      email: 'lars.andersen@email.dk',
      amount: '€420,000',
      status: 'Pending Documents',
      risk: 'High',
      progress: 25,
      fastTrack: false,
      submittedDate: '2024-01-11',
      aiConfidence: 73
    }
  ]);

  return { applications, setApplications };
};
