
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, FileText, CheckCircle, AlertTriangle, Eye, Download } from 'lucide-react';

const DocumentProcessor = () => {
  const [selectedApplication, setSelectedApplication] = useState('APP-2024-001');
  
  const documentTypes = [
    { name: 'Salary Statement', required: true, status: 'verified', confidence: 94 },
    { name: 'Bank Statement', required: true, status: 'processing', confidence: 87 },
    { name: 'Employment Contract', required: true, status: 'verified', confidence: 96 },
    { name: 'Tax Return', required: true, status: 'pending', confidence: 0 },
    { name: 'Property Valuation', required: false, status: 'verified', confidence: 91 }
  ];

  const extractedData = {
    'Salary Statement': {
      monthlyIncome: '€4,200',
      employer: 'TechCorp Amsterdam',
      employmentType: 'Permanent',
      startDate: '2020-03-15',
      confidence: 94,
      oictoVerified: true
    },
    'Bank Statement': {
      averageBalance: '€12,450',
      monthlyInflows: '€4,180',
      monthlyOutflows: '€3,250',
      savingsRate: '22%',
      confidence: 87,
      oictoVerified: false
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'processing': return <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />;
      case 'pending': return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      default: return <FileText className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Document Processing</h2>
        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
          Ockto Integration Active
        </Badge>
      </div>

      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upload">Document Upload</TabsTrigger>
          <TabsTrigger value="processing">AI Processing</TabsTrigger>
          <TabsTrigger value="extracted">Extracted Data</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upload Documents - {selectedApplication}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-orange-400 transition-colors">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Drop documents here</h3>
                <p className="text-gray-600 mb-4">Or click to browse and upload files</p>
                <Button className="bg-orange-500 hover:bg-orange-600">
                  Select Files
                </Button>
                <p className="text-sm text-gray-500 mt-2">
                  Supported: PDF, JPG, PNG (Max 10MB per file)
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Document Checklist</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {documentTypes.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(doc.status)}
                      <div>
                        <h4 className="font-medium">{doc.name}</h4>
                        <p className="text-sm text-gray-600">
                          {doc.required ? 'Required' : 'Optional'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary" className={getStatusColor(doc.status)}>
                        {doc.status}
                      </Badge>
                      {doc.confidence > 0 && (
                        <span className="text-sm text-gray-600">{doc.confidence}%</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="processing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Processing Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Document Analysis</span>
                    <span>95%</span>
                  </div>
                  <Progress value={95} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Data Extraction</span>
                    <span>87%</span>
                  </div>
                  <Progress value={87} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Ockto Validation</span>
                    <span>100%</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Risk Assessment</span>
                    <span>73%</span>
                  </div>
                  <Progress value={73} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Processing Log</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Salary statement processed successfully</span>
                  <span className="text-gray-500 ml-auto">14:23</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Ockto validation completed</span>
                  <span className="text-gray-500 ml-auto">14:21</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  <span>Processing bank statement...</span>
                  <span className="text-gray-500 ml-auto">14:20</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Employment contract validated</span>
                  <span className="text-gray-500 ml-auto">14:18</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="extracted" className="space-y-4">
          {Object.entries(extractedData).map(([docType, data]) => (
            <Card key={docType}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {docType}
                  <div className="flex items-center gap-2">
                    {data.oictoVerified && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Ockto Verified
                      </Badge>
                    )}
                    <Badge variant="secondary">
                      {data.confidence}% Confidence
                    </Badge>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(data).map(([key, value]) => {
                    if (key === 'confidence' || key === 'oictoVerified') return null;
                    return (
                      <div key={key} className="space-y-1">
                        <p className="text-sm font-medium text-gray-600 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </p>
                        <p className="text-sm font-semibold">{value}</p>
                      </div>
                    );
                  })}
                </div>
                <div className="flex gap-2 mt-4">
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4 mr-2" />
                    View Original
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DocumentProcessor;
