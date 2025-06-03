
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, CheckCircle, AlertTriangle, Zap, Eye, Download, RefreshCw } from 'lucide-react';

interface AISmartButtonProps {
  type: 'validate' | 'escalate' | 'fasttrack' | 'review' | 'download' | 'refresh';
  context?: any;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'default' | 'outline' | 'secondary';
  size?: 'sm' | 'default' | 'lg';
}

const AISmartButton: React.FC<AISmartButtonProps> = ({ 
  type, 
  context, 
  onClick, 
  disabled = false,
  variant = 'outline',
  size = 'sm'
}) => {
  const [status, setStatus] = useState<'idle' | 'processing' | 'completed' | 'error'>('idle');
  const [aiData, setAiData] = useState<any>(null);

  const buttonConfigs = {
    validate: {
      icon: CheckCircle,
      label: 'Validate',
      processingText: 'Cross-checking Ockto data...',
      className: 'hover:bg-green-50 hover:border-green-300'
    },
    escalate: {
      icon: AlertTriangle,
      label: 'Escalate',
      processingText: 'Generating case summary...',
      className: 'hover:bg-red-50 hover:border-red-300'
    },
    fasttrack: {
      icon: Zap,
      label: 'Fast Track',
      processingText: 'Calculating SLA impact...',
      className: 'hover:bg-orange-50 hover:border-orange-300'
    },
    review: {
      icon: Eye,
      label: 'Review',
      processingText: 'Preparing review data...',
      className: 'hover:bg-blue-50 hover:border-blue-300'
    },
    download: {
      icon: Download,
      label: 'Download',
      processingText: 'Generating report...',
      className: 'hover:bg-gray-50 hover:border-gray-300'
    },
    refresh: {
      icon: RefreshCw,
      label: 'Refresh',
      processingText: 'Updating data...',
      className: 'hover:bg-purple-50 hover:border-purple-300'
    }
  };

  const config = buttonConfigs[type];
  const Icon = config.icon;

  const handleClick = async () => {
    if (onClick) {
      onClick();
      return;
    }

    setStatus('processing');
    
    try {
      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock AI response based on button type
      const mockResponses = {
        validate: { discrepancies: 0, confidence: 98, matchRate: '99.2%' },
        escalate: { priority: 'high', estimatedResolution: '2 hours', supervisor: 'Team Lead' },
        fasttrack: { approvalLikelihood: '94%', slaImpact: '-2 days', riskScore: 'low' },
        review: { completeness: '95%', flaggedItems: 2, recommendations: 3 },
        download: { fileSize: '2.3MB', format: 'PDF', pages: 15 },
        refresh: { lastUpdate: 'now', newItems: 3, changes: 'detected' }
      };
      
      setAiData(mockResponses[type]);
      setStatus('completed');
      
      // Reset after 3 seconds
      setTimeout(() => {
        setStatus('idle');
        setAiData(null);
      }, 3000);
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const getStatusBadge = () => {
    if (!aiData) return null;
    
    switch (type) {
      case 'validate':
        return (
          <Badge variant="secondary" className="ml-2 bg-green-100 text-green-800">
            {aiData.discrepancies} issues
          </Badge>
        );
      case 'fasttrack':
        return (
          <Badge variant="secondary" className="ml-2 bg-orange-100 text-orange-800">
            {aiData.approvalLikelihood}
          </Badge>
        );
      case 'escalate':
        return (
          <Badge variant="secondary" className="ml-2 bg-red-100 text-red-800">
            {aiData.priority}
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center">
      <Button
        variant={variant}
        size={size}
        onClick={handleClick}
        disabled={disabled || status === 'processing'}
        className={`${config.className} ${status === 'processing' ? 'animate-pulse' : ''}`}
      >
        {status === 'processing' ? (
          <Loader2 className="w-4 h-4 animate-spin mr-2" />
        ) : (
          <Icon className="w-4 h-4 mr-2" />
        )}
        {status === 'processing' ? config.processingText : config.label}
      </Button>
      {getStatusBadge()}
    </div>
  );
};

export default AISmartButton;
