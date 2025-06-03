
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Zap, Eye, MessageSquare } from 'lucide-react';
import StatusBadge from '@/components/shared/StatusBadge';
import ApplicationDetailView from '@/components/ApplicationDetailView';
import { Application } from '@/hooks/useApplicationData';

interface ApplicationsTableProps {
  applications: Application[];
  onSelectApplication: (app: Application) => void;
}

const ApplicationsTable: React.FC<ApplicationsTableProps> = ({ 
  applications, 
  onSelectApplication 
}) => {
  return (
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
        {applications.map((app) => (
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
              <StatusBadge status={app.status} type="status" />
            </TableCell>
            <TableCell>
              <StatusBadge status={app.risk} type="risk" />
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
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline" onClick={() => onSelectApplication(app)}>
                      <Eye className="w-4 h-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Application Details - {app.id}</DialogTitle>
                    </DialogHeader>
                    <ApplicationDetailView application={app} />
                  </DialogContent>
                </Dialog>
                <Button size="sm" variant="outline">
                  <MessageSquare className="w-4 h-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ApplicationsTable;
