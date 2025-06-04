
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ApplicationsFilters from '@/components/applications/ApplicationsFilters';
import ApplicationsTable from '@/components/applications/ApplicationsTable';
import { useApplicationData } from '@/hooks/useApplicationData';

const ApplicationsList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState(null);
  const { applications } = useApplicationData();

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || app.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Mortgage Applications</h2>
        <Button className="bg-orange-500 hover:bg-orange-600">
          Scan for New Applications
        </Button>
      </div>

      <ApplicationsFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />

      <Card>
        <CardHeader>
          <CardTitle>Applications ({filteredApplications.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <ApplicationsTable
            applications={filteredApplications}
            onSelectApplication={setSelectedApplication}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplicationsList;
