
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckSquare } from 'lucide-react';
import AISmartButton from './AISmartButton';
import StatsOverview from './action-hub/StatsOverview';
import TaskCard from './action-hub/TaskCard';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low' | 'critical';
  type: 'ai-generated' | 'human-assigned';
  applicationId: string;
  estimatedTime: number;
  aiConfidence?: number;
  dueDate: string;
  status: 'pending' | 'completed' | 'in-progress';
}

interface Stats {
  avgConfidence: number;
  overridesCount: number;
  completedToday: number;
  totalPending: number;
}

const ActionHub = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 'task-001',
      title: 'Verify bank statement anomaly',
      description: 'AI detected unusual transaction pattern in Jan van Bergen\'s account',
      priority: 'high',
      type: 'ai-generated',
      applicationId: 'APP-2024-001',
      estimatedTime: 15,
      aiConfidence: 73,
      dueDate: '2025-06-03 15:00',
      status: 'pending'
    },
    {
      id: 'task-002',
      title: 'Property valuation confirmation',
      description: 'Confirm €580,000 valuation for Thomas Mueller property',
      priority: 'medium',
      type: 'ai-generated',
      applicationId: 'APP-2024-003',
      estimatedTime: 30,
      aiConfidence: 89,
      dueDate: '2025-06-03 17:00',
      status: 'pending'
    },
    {
      id: 'task-003',
      title: 'Customer income clarification',
      description: 'Request additional documentation for freelance income',
      priority: 'medium',
      type: 'human-assigned',
      applicationId: 'APP-2024-002',
      estimatedTime: 10,
      dueDate: '2025-06-04 10:00',
      status: 'pending'
    }
  ]);

  const [stats, setStats] = useState<Stats>({
    avgConfidence: 84,
    overridesCount: 12,
    completedToday: 18,
    totalPending: 6
  });

  const handleTaskCompletion = (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, status: 'completed' as const }
        : task
    ));
    setStats(prev => ({
      ...prev,
      completedToday: prev.completedToday + 1,
      totalPending: prev.totalPending - 1
    }));
  };

  const pendingTasks = tasks.filter(task => task.status === 'pending');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Cross-Platform Action Hub</h2>
        <div className="flex gap-2">
          <AISmartButton type="refresh" />
          <Button size="sm" variant="outline">
            Bulk Actions
          </Button>
        </div>
      </div>

      <StatsOverview stats={stats} />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckSquare className="w-5 h-5" />
            Prioritized Action Items
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onComplete={handleTaskCompletion}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActionHub;
