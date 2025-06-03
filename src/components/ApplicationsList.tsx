
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Filter, Zap, Eye, MessageSquare } from 'lucide-react';

const ApplicationsList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const applications = [
    {
      id: 'APP-2024-001',
      customer: 'Jan van Bergen',
      email: 'jan.vanbergen@email.nl',
      amount: '€450,000',
      status: 'AI Processing',
      risk: 'Low',
      progress: 75,
      fastTrack: true,
      submittedDate: '2024-01-15',
      aiConfidence: 94
    },
    {
      id: 'APP-2024-002',
      customer: 'Maria Silva',
      email: 'maria.silva@email.com',
      amount: '€320,000',
      status: 'Document Review',
      risk: 'Medium',
      progress: 45,
      fastTrack: false,
      submittedDate: '2024-01-14',
      aiConfidence: 87
    },
    {
      id: 'APP-2024-003',
      customer: 'Thomas Mueller',
      email: 'thomas.mueller@email.de',
      amount: '€580,000',
      status: 'Risk Assessment',
      risk: 'Low',
      progress: 60,
      fastTrack: true,
      submittedDate: '2024-01-13',
      aiConfidence: 92
    },
    {
      id: 'APP-2024-004',
      customer: 'Sophie Dubois',
      email: 'sophie.dubois@email.fr',
      amount: '€275,000',
      status: 'Compliance Check',
      risk: 'Low',
      progress: 85,
      fastTrack: false,
      submittedDate: '2024-01-12',
      aiConfidence: 96
    },
    {
      id: 'APP-2024-005',
      customer: 'Lars Andersen',
      email: 'lars.andersen@email.dk',
      amount: '€420,000',
      status: 'Pending Documents',
      risk: 'High',
      progress: 25,
      fastTrack: false,
      submittedDate: '2024-01-11',
      aiConfidence: 73
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'AI Processing': return 'bg-blue-100 text-blue-800';
      case 'Document Review': return 'bg-yellow-100 text-yellow-800';
      case 'Risk Assessment': return 'bg-purple-100 text-purple-800';
      case 'Compliance Check': return 'bg-orange-100 text-orange-800';
      case 'Pending Documents': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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
          New Application
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search applications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="AI Processing">AI Processing</SelectItem>
                <SelectItem value="Document Review">Document Review</SelectItem>
                <SelectItem value="Risk Assessment">Risk Assessment</SelectItem>
                <SelectItem value="Compliance Check">Compliance Check</SelectItem>
                <SelectItem value="Pending Documents">Pending Documents</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Applications Table */}
      <Card>
        <CardHeader>
          <CardTitle>Applications ({filteredApplications.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Application ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Risk Level</TableHead>
                <TableHead>AI Confidence</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplications.map((app) => (
                <TableRow key={app.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {app.fastTrack && <Zap className="w-4 h-4 text-orange-500" />}
                      {app.id}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{app.customer}</p>
                      <p className="text-sm text-gray-500">{app.email}</p>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{app.amount}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={getStatusColor(app.status)}>
                      {app.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={getRiskColor(app.risk)}>
                      {app.risk}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{app.aiConfidence}%</span>
                      <div className={`w-2 h-2 rounded-full ${
                        app.aiConfidence >= 90 ? 'bg-green-500' :
                        app.aiConfidence >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                      }`} />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="w-full max-w-[100px]">
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>{app.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-orange-500 h-2 rounded-full"
                          style={{ width: `${app.progress}%` }}
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <MessageSquare className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApplicationsList;
