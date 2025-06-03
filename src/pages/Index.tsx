
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bell, Zap } from 'lucide-react';
import ApplicationsList from '@/components/ApplicationsList';

const Index = () => {
  const [notifications, setNotifications] = useState(3);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img 
              src="/lovable-uploads/00adf838-6a5b-44a4-8209-15d1a7bd01fe.png" 
              alt="ING Logo" 
              className="h-8"
            />
            <h1 className="text-xl font-semibold text-gray-900">Applicant Income Analysis</h1>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <Zap className="w-3 h-3 mr-1" />
              AI Agents Active
            </Badge>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-4 h-4" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </Button>
            <Avatar>
              <AvatarFallback>MA</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">Mortgage Advisor</p>
              <p className="text-xs text-gray-500">Amsterdam Branch</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <ApplicationsList />
      </main>
    </div>
  );
};

export default Index;
