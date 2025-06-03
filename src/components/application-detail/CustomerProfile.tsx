
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap } from 'lucide-react';

interface CustomerProfileProps {
  application: any;
}

const CustomerProfile: React.FC<CustomerProfileProps> = ({ application }) => (
  <Card>
    <CardHeader>
      <CardTitle>Customer Information</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="font-medium">Personal Details</h4>
          <div className="space-y-2 mt-2">
            <p><span className="text-gray-600">Name:</span> {application.customer}</p>
            <p><span className="text-gray-600">Email:</span> {application.email}</p>
            <p><span className="text-gray-600">Application ID:</span> {application.id}</p>
            <p><span className="text-gray-600">Submitted:</span> {application.submittedDate}</p>
          </div>
        </div>
        <div>
          <h4 className="font-medium">Application Details</h4>
          <div className="space-y-2 mt-2">
            <p><span className="text-gray-600">Loan Amount:</span> {application.amount}</p>
            <p><span className="text-gray-600">Risk Level:</span> 
              <Badge variant="secondary" className={`ml-2 ${
                application.risk === 'Low' ? 'bg-green-100 text-green-800' :
                application.risk === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {application.risk}
              </Badge>
            </p>
            <p><span className="text-gray-600">Fast Track:</span> 
              {application.fastTrack ? (
                <Badge variant="secondary" className="ml-2 bg-orange-100 text-orange-800">
                  <Zap className="w-3 h-3 mr-1" />
                  Enabled
                </Badge>
              ) : (
                <span className="ml-2 text-gray-500">Disabled</span>
              )}
            </p>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default CustomerProfile;
