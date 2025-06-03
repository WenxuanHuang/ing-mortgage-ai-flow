
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, CheckSquare, AlertTriangle, Brain, Users } from 'lucide-react';
import StatusBadge from '@/components/shared/StatusBadge';
import AISmartButton from '@/components/AISmartButton';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  type: 'ai-generated' | 'human-assigned' | 'system-alert';
  applicationId: string;
  estimatedTime: number;
  aiConfidence?: number;
  dueDate: string;
  status: 'pending' | 'in-progress' | 'completed' | 'overdue';
}

interface TaskCardProps {
  task: Task;
  onComplete: (taskId: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onComplete }) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'ai-generated': return <Brain className="w-4 h-4 text-blue-500" />;
      case 'human-assigned': return <Users className="w-4 h-4 text-purple-500" />;
      case 'system-alert': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default: return <CheckSquare className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="p-4 border rounded-lg hover:bg-gray-50">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-3">
          {getTypeIcon(task.type)}
          <div className="flex-1">
            <h4 className="font-medium">{task.title}</h4>
            <p className="text-sm text-gray-600 mt-1">{task.description}</p>
            <div className="flex items-center gap-2 mt-2">
              <StatusBadge status={task.priority} type="priority" />
              <Badge variant="outline">
                {task.applicationId}
              </Badge>
              {task.aiConfidence && (
                <Badge variant="outline" className="text-xs">
                  AI: {task.aiConfidence}%
                </Badge>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">{task.estimatedTime}min</span>
          <Clock className="w-4 h-4 text-gray-400" />
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <AISmartButton type="review" size="sm" />
          <Button 
            size="sm" 
            className="bg-orange-500 hover:bg-orange-600"
            onClick={() => onComplete(task.id)}
          >
            Complete
          </Button>
          <Button size="sm" variant="outline">
            Reassign
          </Button>
        </div>
        <div className="text-xs text-gray-500">
          Due: {new Date(task.dueDate).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
