
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, FileText } from 'lucide-react';

const DocumentViewer = () => {
  const { documentType } = useParams();
  const navigate = useNavigate();

  const documentData = {
    'bank-statement': {
      title: 'Bank Statement',
      pdfUrl: '/lovable-uploads/sample-bank-statement.pdf',
      extractedData: {
        documentType: 'Bank Statement',
        confidenceScore: 94,
        extractedFields: [
          { field: 'Account Holder', value: 'Jan van Bergen', confidence: 100 },
          { field: 'Account Number', value: 'NL91 ABNA 0417 1643 00', confidence: 98 },
          { field: 'Statement Period', value: '01/10/2024 - 31/10/2024', confidence: 100 },
          { field: 'Opening Balance', value: '€11,250.43', confidence: 97 },
          { field: 'Closing Balance', value: '€12,680.12', confidence: 97 },
          { field: 'Total Credits', value: '€4,180.00', confidence: 95 },
          { field: 'Total Debits', value: '€2,750.31', confidence: 95 },
          { field: 'Average Monthly Inflow', value: '€4,180.00', confidence: 94 },
          { field: 'Salary Deposits', value: '€3,500.00', confidence: 96 },
          { field: 'Other Income', value: '€680.00', confidence: 89 }
        ]
      }
    },
    'payment-slip': {
      title: 'Payment Slip',
      pdfUrl: '/lovable-uploads/sample-payment-slip.pdf',
      extractedData: {
        documentType: 'Payment Slip',
        confidenceScore: 96,
        extractedFields: [
          { field: 'Employee Name', value: 'Jan van Bergen', confidence: 100 },
          { field: 'Employee ID', value: 'TC-2020-4157', confidence: 100 },
          { field: 'Pay Period', value: 'October 2024', confidence: 100 },
          { field: 'Gross Salary', value: '€4,200.00', confidence: 98 },
          { field: 'Net Salary', value: '€3,150.75', confidence: 98 },
          { field: 'Tax Deduction', value: '€890.25', confidence: 97 },
          { field: 'Pension Contribution', value: '€159.00', confidence: 95 },
          { field: 'Holiday Allowance', value: '€200.00', confidence: 94 },
          { field: 'Year-to-Date Gross', value: '€42,000.00', confidence: 96 }
        ]
      }
    },
    'employer-statement': {
      title: 'Employer Statement',
      pdfUrl: '/lovable-uploads/sample-employer-statement.pdf',
      extractedData: {
        documentType: 'Employer Statement',
        confidenceScore: 98,
        extractedFields: [
          { field: 'Employee Name', value: 'Jan van Bergen', confidence: 100 },
          { field: 'Employer', value: 'TechCorp Amsterdam B.V.', confidence: 100 },
          { field: 'Employment Start Date', value: '15/03/2020', confidence: 100 },
          { field: 'Employment Type', value: 'Permanent Full-time', confidence: 100 },
          { field: 'Annual Salary', value: '€50,400.00', confidence: 100 },
          { field: 'Contract Hours', value: '40 hours/week', confidence: 100 },
          { field: 'Department', value: 'Software Development', confidence: 98 },
          { field: 'Job Title', value: 'Senior Developer', confidence: 100 },
          { field: 'Performance Rating', value: 'Exceeds Expectations', confidence: 95 }
        ]
      }
    }
  };

  const currentDoc = documentData[documentType as keyof typeof documentData];

  if (!currentDoc) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="text-center">
          <h2 className="text-xl font-bold">Document not found</h2>
          <Button onClick={() => navigate('/')} className="mt-4">
            Go back to Applications
          </Button>
        </div>
      </div>
    );
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 95) return 'bg-green-100 text-green-800';
    if (confidence >= 85) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate('/')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Applications
            </Button>
            <img 
              src="/lovable-uploads/00adf838-6a5b-44a4-8209-15d1a7bd01fe.png" 
              alt="ING Logo" 
              className="h-8"
            />
            <h1 className="text-xl font-semibold text-gray-900">{currentDoc.title}</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-120px)]">
          {/* PDF Viewer */}
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Document Preview
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[calc(100%-80px)]">
              <div className="w-full h-full bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                <div className="text-center">
                  <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 font-medium">PDF Document Viewer</p>
                  <p className="text-sm text-gray-500 mt-2">{currentDoc.title}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    In a real implementation, this would show the actual PDF using a library like react-pdf
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Extracted Information */}
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>AI Extracted Information</span>
                <Badge className={getConfidenceColor(currentDoc.extractedData.confidenceScore)}>
                  {currentDoc.extractedData.confidenceScore}% Confidence
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[calc(100%-80px)] overflow-y-auto">
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-medium text-blue-800 mb-2">Document Analysis Summary</h3>
                  <p className="text-sm text-blue-700">
                    AI has successfully processed the {currentDoc.extractedData.documentType.toLowerCase()} 
                    with {currentDoc.extractedData.confidenceScore}% overall confidence. 
                    All key financial information has been extracted and validated.
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-gray-800">Extracted Fields</h4>
                  {currentDoc.extractedData.extractedFields.map((field, index) => (
                    <div key={index} className="border rounded-lg p-3 bg-white">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-medium text-gray-700">{field.field}</span>
                        <Badge 
                          variant="secondary" 
                          className={getConfidenceColor(field.confidence)}
                        >
                          {field.confidence}%
                        </Badge>
                      </div>
                      <p className="text-lg font-semibold text-gray-900">{field.value}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-6">
                  <h4 className="font-medium text-green-800 mb-2">Validation Status</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-green-700">Document Authenticity:</span>
                      <span className="font-medium text-green-800">Verified</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-700">Data Consistency:</span>
                      <span className="font-medium text-green-800">High</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-700">Cross-validation:</span>
                      <span className="font-medium text-green-800">Passed</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default DocumentViewer;
