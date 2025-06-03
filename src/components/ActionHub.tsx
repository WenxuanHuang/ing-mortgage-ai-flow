
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckSquare, Clock, AlertTriangle, Brain, TrendingUp, Users } from 'lucide-react';
import AISmartButton from './AISmartButton';

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

  const [stats, setStats] = useState({
    avgConfidence: 84,
    overridesCount: 12,
    completedToday: 18,
    totalPending: 6
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'ai-generated': return <Brain className="w-4 h-4 text-blue-500" />;
      case 'human-assigned': return <Users className="w-4 h-4 text-purple-500" />;
      case 'system-alert': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default: return <CheckSquare className="w-4 h-4 text-gray-500" />;
    }
  };

  const handleTaskCompletion = (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, status: 'completed' }
        : task
    ));
    setStats(prev => ({
      ...prev,
      completedToday: prev.completedToday + 1,
      totalPending: prev.totalPending - 1
    }));
  };

  const calculatePriority = (task: Task) => {
    const riskScore = task.aiConfidence ? (100 - task.aiConfidence) / 100 : 0.5;
    const timeWeight = task.estimatedTime / 60; // Convert to hours
    const priorityWeights = { critical: 4, high: 3, medium: 2, low: 1 };
    return (riskScore * priorityWeights[task.priority]) / timeWeight;
  };

  const sortedTasks = [...tasks].sort((a, b) => calculatePriority(b) - calculatePriority(a));

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

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.avgConfidence}%</div>
            <p className="text-sm text-gray-600">AI Confidence</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{stats.overridesCount}</div>
            <p className="text-sm text-gray-600">Human Overrides</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.completedToday}</div>
            <p className="text-sm text-gray-600">Completed Today</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-600">{stats.totalPending}</div>
            <p className="text-sm text-gray-600">Pending Actions</p>
          </CardContent>
        </Card>
      </div>

      {/* Task List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckSquare className="w-5 h-5" />
            Prioritized Action Items
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sortedTasks.filter(task => task.status === 'pending').map((task) => (
              <div key={task.id} className="p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    {getTypeIcon(task.type)}
                    <div className="flex-1">
                      <h4 className="font-medium">{task.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary" className={getPriorityColor(task.priority)}>
                          {task.priority}
                        </Badge>
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
                      onClick={() => handleTaskCompletion(task.id)}
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
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActionHub;
