
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ResultSummary from './application-detail/ResultSummary';
import DocumentProcessing from './application-detail/DocumentProcessing';
import TaskList from './application-detail/TaskList';
import AgentActivity from './application-detail/AgentActivity';
import AuditTrail from './application-detail/AuditTrail';
import CustomerProfile from './application-detail/CustomerProfile';

const ApplicationDetailView = ({ application }) => {
  return (
    <div className="w-full">
      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="documents">Income Analysis Documents</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="agents">Agent Activity</TabsTrigger>
          <TabsTrigger value="audit">Audit Trail</TabsTrigger>
          <TabsTrigger value="customer">Customer</TabsTrigger>
        </TabsList>
        
        <TabsContent value="summary" className="mt-6">
          <ResultSummary />
        </TabsContent>
        
        <TabsContent value="documents" className="mt-6">
          <DocumentProcessing />
        </TabsContent>
        
        <TabsContent value="tasks" className="mt-6">
          <TaskList application={application} />
        </TabsContent>
        
        <TabsContent value="agents" className="mt-6">
          <AgentActivity application={application} />
        </TabsContent>
        
        <TabsContent value="audit" className="mt-6">
          <AuditTrail />
        </TabsContent>
        
        <TabsContent value="customer" className="mt-6">
          <CustomerProfile application={application} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ApplicationDetailView;
