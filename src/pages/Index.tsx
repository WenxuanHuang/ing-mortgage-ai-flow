
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bell, FileText, Users, TrendingUp, AlertCircle, CheckCircle, Clock, Zap } from 'lucide-react';
import DashboardOverview from '@/components/DashboardOverview';
import DocumentProcessor from '@/components/DocumentProcessor';
import CustomerCommunications from '@/components/CustomerCommunications';
import AIAgentStatus from '@/components/AIAgentStatus';
import ApplicationsList from '@/components/ApplicationsList';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [notifications, setNotifications] = useState(3);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">ING</span>
            </div>
            <h1 className="text-xl font-semibold text-gray-900">Mortgage Processing Portal</h1>
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
      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <div className="p-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} orientation="vertical" className="w-full">
              <TabsList className="grid w-full grid-rows-4 h-auto bg-gray-50">
                <TabsTrigger value="dashboard" className="justify-start data-[state=active]:bg-orange-50 data-[state=active]:text-orange-700">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Dashboard
                </TabsTrigger>
                <TabsTrigger value="applications" className="justify-start data-[state=active]:bg-orange-50 data-[state=active]:text-orange-700">
                  <FileText className="w-4 h-4 mr-2" />
                  Applications
                </TabsTrigger>
                <TabsTrigger value="documents" className="justify-start data-[state=active]:bg-orange-50 data-[state=active]:text-orange-700">
                  <FileText className="w-4 h-4 mr-2" />
                  Document Processing
                </TabsTrigger>
                <TabsTrigger value="communications" className="justify-start data-[state=active]:bg-orange-50 data-[state=active]:text-orange-700">
                  <Users className="w-4 h-4 mr-2" />
                  Customer Comms
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          {/* AI Agent Status Sidebar */}
          <div className="p-4 border-t">
            <AIAgentStatus />
          </div>
        </nav>

        {/* Content Area */}
        <main className="flex-1 p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsContent value="dashboard">
              <DashboardOverview />
            </TabsContent>
            
            <TabsContent value="applications">
              <ApplicationsList />
            </TabsContent>
            
            <TabsContent value="documents">
              <DocumentProcessor />
            </TabsContent>
            
            <TabsContent value="communications">
              <CustomerCommunications />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Index;
