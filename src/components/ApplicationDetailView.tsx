
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CustomerProfile from './application-detail/CustomerProfile';
import AgentActivity from './application-detail/AgentActivity';
import TaskList from './application-detail/TaskList';
import DocumentProcessing from './application-detail/DocumentProcessing';
import AuditTrail from './application-detail/AuditTrail';
import ResultSummary from './application-detail/ResultSummary';

const ApplicationDetailView = ({ application }) => {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="documents">Document Processing</TabsTrigger>
        <TabsTrigger value="tasks">Tasks & Workflow</TabsTrigger>
        <TabsTrigger value="audit">Audit Trail</TabsTrigger>
        <TabsTrigger value="result">Result</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <CustomerProfile application={application} />
          <AgentActivity application={application} />
        </div>
      </TabsContent>

      <TabsContent value="documents" className="space-y-4">
        <DocumentProcessing />
      </TabsContent>

      <TabsContent value="tasks" className="space-y-4">
        <TaskList application={application} />
      </TabsContent>

      <TabsContent value="audit" className="space-y-4">
        <AuditTrail />
      </TabsContent>

      <TabsContent value="result" className="space-y-4">
        <ResultSummary />
      </TabsContent>
    </Tabs>
  );
};

export default ApplicationDetailView;
