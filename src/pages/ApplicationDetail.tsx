
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import ApplicationDetailView from '@/components/ApplicationDetailView';
import { useApplicationData } from '@/hooks/useApplicationData';

const ApplicationDetail = () => {
  const { applicationId } = useParams();
  const navigate = useNavigate();
  const { applications } = useApplicationData();
  
  const currentApplication = applications.find(app => app.id === applicationId);
  
  if (!currentApplication) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Application Not Found</h1>
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Applications
          </Button>
        </div>
      </div>
    );
  }

  const handleApplicationSelect = (appId: string) => {
    navigate(`/application/${appId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate('/')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Applications
            </Button>
            <img 
              src="/lovable-uploads/00adf838-6a5b-44a4-8209-15d1a7bd01fe.png" 
              alt="ING Logo" 
              className="h-8 w-auto"
            />
            <h1 className="text-xl font-semibold text-gray-900">
              Application Details - {currentApplication.id}
            </h1>
          </div>
        </div>
      </header>

      <SidebarProvider>
        <div className="flex min-h-[calc(100vh-80px)] w-full">
          <Sidebar className="w-64 border-r border-gray-200 flex-shrink-0">
            <SidebarHeader className="p-3 border-b border-gray-200">
              <h2 className="font-semibold text-gray-900 text-sm">All Applications</h2>
            </SidebarHeader>
            <SidebarContent>
              <SidebarMenu className="p-2">
                {applications.map((app) => (
                  <SidebarMenuItem key={app.id}>
                    <SidebarMenuButton
                      onClick={() => handleApplicationSelect(app.id)}
                      isActive={app.id === applicationId}
                      className="w-full p-3 text-left hover:bg-gray-100 rounded-lg min-h-[70px]"
                    >
                      <div className="flex flex-col gap-1 w-full">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-xs">{app.id}</span>
                          <span className={`px-1.5 py-0.5 text-xs rounded-full ${
                            app.risk === 'Low' ? 'bg-green-100 text-green-800' :
                            app.risk === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {app.risk}
                          </span>
                        </div>
                        <div className="text-xs text-gray-600 truncate">{app.customer}</div>
                        <div className="text-xs font-medium text-gray-900">{app.amount}</div>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarContent>
          </Sidebar>

          <main className="flex-1 p-6 overflow-auto min-w-0">
            <ApplicationDetailView application={currentApplication} />
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default ApplicationDetail;
