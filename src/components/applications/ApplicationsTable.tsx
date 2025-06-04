
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import StatusBadge from '@/components/shared/StatusBadge';
import { Application } from '@/hooks/useApplicationData';

interface ApplicationsTableProps {
  applications: Application[];
  onSelectApplication: (app: Application) => void;
}

const ApplicationsTable: React.FC<ApplicationsTableProps> = ({ 
  applications, 
  onSelectApplication 
}) => {
  const navigate = useNavigate();

  const handleViewApplication = (app: Application) => {
    onSelectApplication(app);
    navigate(`/application/${app.id}`);
  };

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
              {app.id}
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
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => handleViewApplication(app)}
              >
                <Eye className="w-4 h-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ApplicationsTable;
