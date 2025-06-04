import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Calculator, FileText, DollarSign, Shield, Bot, ChevronDown, ChevronUp, ZoomIn, ZoomOut, Download } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const ResultSummary: React.FC = () => {
  const [expandedDocument, setExpandedDocument] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(100);
  
  const mockResultData = {
    maxLoanAmount: 420000,
    requestedAmount: 300000,
    loanToValue: 85,
    propertyValue: 525000,
    monthlyPayment: 1680,
    interestRate: 3.2,
    loanTerm: 30,
    rationale: {
      grossMonthlyIncome: 4200,
      debtToIncomeRatio: 40,
      creditScore: 780,
      downPayment: 78750,
      monthlyExpenses: 2100
    },
    incomeAnalysis: {
      bankStatement: {
        annualIncome: 49800,
        incomeComponents: {
          salary: 42000,
          bonuses: 3600,
          otherIncome: 4200
        }
      },
      paymentSlip: {
        annualIncome: 50400,
        incomeComponents: {
          baseSalary: 48000,
          holidayAllowance: 2400,
          other: 0
        }
      },
      employerStatement: {
        annualIncome: 50400,
        incomeComponents: {
          annualSalary: 50400,
          variableCompensation: 0,
          benefits: 0
        }
      },
      finalEstimate: {
        annualIncome: 50200,
        overallConfidence: 98.8,
        deviation: 1.2
      }
    }
  };

  const requestedLoanToIncomeRatio = (mockResultData.requestedAmount / mockResultData.incomeAnalysis.finalEstimate.annualIncome);
  const targetRatio = 5.0;
  const suggestedLoanAmount = mockResultData.incomeAnalysis.finalEstimate.annualIncome * targetRatio;
  const needsAdjustment = Math.abs(requestedLoanToIncomeRatio - targetRatio) > 0.2;
  const isRatioHigh = requestedLoanToIncomeRatio > 5;

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 25, 50));
  };

  const handleAIExtraction = () => {
    console.log('AI extraction triggered for document');
  };

  const handleDownload = () => {
    console.log('Download triggered for document');
  };

  const getDocumentSpecificData = (documentType: string) => {
    switch (documentType) {
      case 'Bank Statement':
        return {
          accountNumber: 'NL91 INGB 0002 4567 89',
          statementPeriod: '01/01/2024 - 31/03/2024',
          totalDeposits: '€12,450',
          averageMonthlyBalance: '€8,750',
          numberOfTransactions: '247',
          salaryDeposits: '12',
          regularIncome: '€4,150/month',
          irregularIncome: '€300/month',
          bankName: 'ING Bank N.V.',
          accountType: 'Current Account',
          overdraftLimit: '€500',
          averageBalance: '€8,750',
          minimumBalance: '€2,150',
          maximumBalance: '€15,420'
        };
      case 'Payment Slip':
        return {
          employerName: 'Tech Solutions BV',
          employeeId: 'EMP-2024-0789',
          payPeriod: 'March 2024',
          grossSalary: '€4,000',
          netSalary: '€3,200',
          taxDeducted: '€600',
          socialContributions: '€200',
          pensionContribution: '€320',
          departmentCode: 'IT-DEV-001',
          costCenter: '4200',
          workingDays: '21',
          overtimeHours: '8',
          vacationDays: '2.5',
          sickLeaveDays: '0'
        };
      case 'Employer Statement':
        return {
          companyName: 'Tech Solutions BV',
          companyRegistration: 'KvK 12345678',
          employmentStartDate: '15/06/2020',
          contractType: 'Permanent Full-time',
          workingHours: '40 hours/week',
          probationPeriod: 'Completed',
          nextSalaryReview: 'June 2024',
          benefits: 'Health insurance, Pension',
          managerId: 'MGR-001',
          hrContact: 'hr@techsolutions.nl',
          officeLocation: 'Amsterdam HQ',
          noticePeriod: '1 month'
        };
      default:
        return {};
    }
  };

  const handleDocumentClick = (documentType: string) => {
    setExpandedDocument(expandedDocument === documentType ? null : documentType);
  };

  const renderDocumentPreview = (documentType: string) => {
    const specificData = getDocumentSpecificData(documentType);
    
    return (
      <div className="mt-4 border border-gray-200 rounded-lg bg-gray-50 w-full">
        <div className="p-4">
          {/* Two column layout: PDF preview on left, extracted info on right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left side - Document Preview */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Document Preview</h4>
              <div className="bg-white border rounded-lg p-6 relative">
                
                {/* PDF Controls - always visible and centered */}
                <div className="flex justify-center mb-4">
                  <div className="bg-gray-800 rounded-lg p-2 flex items-center gap-2 shadow-lg">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-white hover:bg-gray-700 h-8 w-8 p-0"
                            onClick={handleZoomOut}
                          >
                            <ZoomOut className="w-4 h-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Zoom Out</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-white hover:bg-gray-700 h-8 w-8 p-0"
                            onClick={handleZoomIn}
                          >
                            <ZoomIn className="w-4 h-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Zoom In</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <div className="w-px h-6 bg-gray-600"></div>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-white hover:bg-gray-700 h-8 w-8 p-0"
                            onClick={handleAIExtraction}
                          >
                            <Bot className="w-4 h-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>AI Extraction</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-white hover:bg-gray-700 h-8 w-8 p-0"
                            onClick={handleDownload}
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Download</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>

                <AspectRatio ratio={210/297}>
                  {documentType === 'Payment Slip' ? (
                    <img
                      src="/lovable-uploads/df41c8c1-77eb-476b-9f21-73ccbcf0ad2a.png"
                      alt="Payment Slip Document"
                      className="w-full h-full object-contain border rounded transition-transform duration-200"
                      style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'center' }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-50">
                      <div className="text-center text-gray-500">
                        <FileText className="w-16 h-16 mx-auto mb-3" />
                        <p className="text-lg font-medium">PDF Preview</p>
                        <p className="text-sm">{documentType}</p>
                      </div>
                    </div>
                  )}
                </AspectRatio>
              </div>
            </div>

            {/* Right side - AI Extracted Information in single column */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">AI Extracted Information</h4>
              <div className="space-y-4">
                {/* Document Details */}
                <div className="bg-white border rounded-lg p-4">
                  <h5 className="font-medium text-sm text-gray-700 mb-2">Document Details</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Document Type:</span>
                      <span className="font-medium">{documentType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date Range:</span>
                      <span className="font-medium">Jan 2024 - Mar 2024</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Validation Status:</span>
                      <span className="text-green-600 font-medium">Verified</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Confidence Score:</span>
                      <span className="font-medium">98.5%</span>
                    </div>
                  </div>
                </div>
                
                {/* Extracted Data Fields */}
                <div className="bg-white border rounded-lg p-4">
                  <h5 className="font-medium text-sm text-gray-700 mb-2">Extracted Data Fields</h5>
                  <div className="space-y-2 text-sm">
                    {Object.entries(specificData).slice(0, 6).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Additional Information */}
                {Object.entries(specificData).length > 6 && (
                  <div className="bg-white border rounded-lg p-4">
                    <h5 className="font-medium text-sm text-gray-700 mb-2">Additional Information</h5>
                    <div className="space-y-2 text-sm">
                      {Object.entries(specificData).slice(6).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                          <span className="font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Final Assessment */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            Final Assessment
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <span className="text-sm text-gray-600">Final Annual Income</span>
              <p className="text-2xl font-bold text-gray-900">€{mockResultData.incomeAnalysis.finalEstimate.annualIncome.toLocaleString()}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600">Overall Confidence Score</span>
              <p className="text-2xl font-bold text-gray-900">{(100 - mockResultData.incomeAnalysis.finalEstimate.deviation).toFixed(1)}%</p>
            </div>
            <div>
              <span className="text-sm text-gray-600">Requested Loan Amount</span>
              <p className="text-2xl font-bold text-gray-900">€{mockResultData.requestedAmount.toLocaleString()}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600">Loan-to-Income Ratio</span>
              <p className={`text-2xl font-bold ${isRatioHigh ? 'text-red-600' : 'text-gray-900'}`}>
                {requestedLoanToIncomeRatio.toFixed(1)}x
              </p>
            </div>
          </div>

          {needsAdjustment && (
            <div className="pt-4 border-t border-gray-200">
              <div className="bg-orange-50 p-4 rounded">
                <div className="flex items-center gap-2 mb-2">
                  <Bot className="w-4 h-4 text-orange-600" />
                  <span className="font-medium text-gray-900">AI Guidance</span>
                </div>
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Suggested Maximum Loan Amount:</strong> €{suggestedLoanAmount.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">
                  To achieve the optimal 5x loan-to-income ratio based on the final income assessment of 
                  €{mockResultData.incomeAnalysis.finalEstimate.annualIncome.toLocaleString()}, 
                  the recommended maximum loan amount is €{suggestedLoanAmount.toLocaleString()}. 
                  This {requestedLoanToIncomeRatio > targetRatio ? 'reduces' : 'increases'} the current amount by 
                  €{Math.abs(suggestedLoanAmount - mockResultData.requestedAmount).toLocaleString()} 
                  to align with sustainable lending practices.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Income Analysis Documents */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Income Analysis Documents
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Horizontal layout for document cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className={`cursor-pointer hover:shadow-md transition-all ${
              expandedDocument === 'Bank Statement' 
                ? 'border-orange-500 border-2 shadow-md' 
                : 'border border-gray-200'
            }`} 
                  onClick={() => handleDocumentClick('Bank Statement')}>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Bank Statement
                  </div>
                  {expandedDocument === 'Bank Statement' ? 
                    <ChevronUp className="w-4 h-4" /> : 
                    <ChevronDown className="w-4 h-4" />
                  }
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <span className="text-sm text-gray-600">Annual Income</span>
                  <p className="text-xl font-bold">€{mockResultData.incomeAnalysis.bankStatement.annualIncome.toLocaleString()}</p>
                </div>
                
                <div className="pt-3 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Income Components</h4>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Salary:</span>
                      <span className="font-medium">€{mockResultData.incomeAnalysis.bankStatement.incomeComponents.salary.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Bonuses:</span>
                      <span className="font-medium">€{mockResultData.incomeAnalysis.bankStatement.incomeComponents.bonuses.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Other Income:</span>
                      <span className="font-medium">€{mockResultData.incomeAnalysis.bankStatement.incomeComponents.otherIncome.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className={`cursor-pointer hover:shadow-md transition-all ${
              expandedDocument === 'Payment Slip' 
                ? 'border-orange-500 border-2 shadow-md' 
                : 'border border-gray-200'
            }`} 
                  onClick={() => handleDocumentClick('Payment Slip')}>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Payment Slip
                  </div>
                  {expandedDocument === 'Payment Slip' ? 
                    <ChevronUp className="w-4 h-4" /> : 
                    <ChevronDown className="w-4 h-4" />
                  }
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <span className="text-sm text-gray-600">Annual Income</span>
                  <p className="text-xl font-bold">€{mockResultData.incomeAnalysis.paymentSlip.annualIncome.toLocaleString()}</p>
                </div>
                
                <div className="pt-3 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Income Components</h4>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Base Salary:</span>
                      <span className="font-medium">€{mockResultData.incomeAnalysis.paymentSlip.incomeComponents.baseSalary.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Holiday Allowance:</span>
                      <span className="font-medium">€{mockResultData.incomeAnalysis.paymentSlip.incomeComponents.holidayAllowance.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Other:</span>
                      <span className="font-medium">€{mockResultData.incomeAnalysis.paymentSlip.incomeComponents.other}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className={`cursor-pointer hover:shadow-md transition-all ${
              expandedDocument === 'Employer Statement' 
                ? 'border-orange-500 border-2 shadow-md' 
                : 'border border-gray-200'
            }`} 
                  onClick={() => handleDocumentClick('Employer Statement')}>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Employer Statement
                  </div>
                  {expandedDocument === 'Employer Statement' ? 
                    <ChevronUp className="w-4 h-4" /> : 
                    <ChevronDown className="w-4 h-4" />
                  }
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <span className="text-sm text-gray-600">Annual Income</span>
                  <p className="text-xl font-bold">€{mockResultData.incomeAnalysis.employerStatement.annualIncome.toLocaleString()}</p>
                </div>
                
                <div className="pt-3 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Income Components</h4>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Annual Salary:</span>
                      <span className="font-medium">€{mockResultData.incomeAnalysis.employerStatement.incomeComponents.annualSalary.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Variable Comp:</span>
                      <span className="font-medium">€{mockResultData.incomeAnalysis.employerStatement.incomeComponents.variableCompensation}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Benefits:</span>
                      <span className="font-medium">€{mockResultData.incomeAnalysis.employerStatement.incomeComponents.benefits}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Expanded content below the row */}
          {expandedDocument && (
            <div className="w-full">
              {renderDocumentPreview(expandedDocument)}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultSummary;
