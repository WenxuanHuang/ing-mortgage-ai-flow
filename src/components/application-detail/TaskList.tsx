
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, AlertTriangle } from 'lucide-react';

interface TaskListProps {
  application: any;
}

const TaskList: React.FC<TaskListProps> = ({ application }) => (
  <Card>
    <CardHeader>
      <CardTitle>Workflow Collaboration</CardTitle>
    </CardHeader>
    <CardContent>
      <Tabs defaultValue="completed" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="completed">AI Completed</TabsTrigger>
          <TabsTrigger value="pending">Your Actions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="completed" className="space-y-3">
          {application.tasks.filter(t => t.status === 'done').map(task => (
            <div key={task.id} className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium">{task.description}</p>
                  <p className="text-sm text-gray-600">Confidence: {task.confidence}%</p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                AI Completed
              </Badge>
            </div>
          ))}
        </TabsContent>
        
        <TabsContent value="pending" className="space-y-3">
          {application.tasks.filter(t => t.status === 'pending' || t.status === 'in-progress').map(task => (
            <div key={task.id} className="flex items-center justify-between p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="font-medium">{task.description}</p>
                  {task.flaggedBy && (
                    <p className="text-sm text-gray-600">Flagged by: {task.flaggedBy}</p>
                  )}
                  {task.confidence && (
                    <p className="text-sm text-gray-600">AI Confidence: {task.confidence}%</p>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  Review
                </Button>
                <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                  Complete
                </Button>
              </div>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </CardContent>
  </Card>
);

export default TaskList;
