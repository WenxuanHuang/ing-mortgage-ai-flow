
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface StatusBadgeProps {
  status: string;
  type?: 'status' | 'risk' | 'priority';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, type = 'status' }) => {
  const getStatusColor = () => {
    if (type === 'status') {
      switch (status) {
        case 'AI Processing': return 'bg-blue-100 text-blue-800';
        case 'Document Review': return 'bg-yellow-100 text-yellow-800';
        case 'Risk Assessment': return 'bg-purple-100 text-purple-800';
        case 'Compliance Check': return 'bg-orange-100 text-orange-800';
        case 'Pending Documents': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    }
    
    if (type === 'risk') {
      switch (status) {
        case 'Low': return 'bg-green-100 text-green-800';
        case 'Medium': return 'bg-yellow-100 text-yellow-800';
        case 'High': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    }

    if (type === 'priority') {
      switch (status) {
        case 'critical': return 'bg-red-100 text-red-800';
        case 'high': return 'bg-orange-100 text-orange-800';
        case 'medium': return 'bg-yellow-100 text-yellow-800';
        case 'low': return 'bg-green-100 text-green-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    }

    return 'bg-gray-100 text-gray-800';
  };

  return (
    <Badge variant="secondary" className={getStatusColor()}>
      {status}
    </Badge>
  );
};

export default StatusBadge;
