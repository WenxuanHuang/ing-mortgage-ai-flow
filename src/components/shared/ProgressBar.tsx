
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface ProgressBarProps {
  value: number;
  label?: string;
  showPercentage?: boolean;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  value, 
  label, 
  showPercentage = true, 
  className = "h-2" 
}) => {
  return (
    <div className="space-y-1">
      {label && (
        <div className="flex justify-between text-sm">
          <span>{label}</span>
          {showPercentage && <span>{value}%</span>}
        </div>
      )}
      <Progress value={value} className={className} />
    </div>
  );
};

export default ProgressBar;
