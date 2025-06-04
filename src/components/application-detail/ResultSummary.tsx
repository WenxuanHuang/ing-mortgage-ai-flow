
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Calculator, FileText, DollarSign, Shield, Bot, ChevronDown, ChevronUp } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const ResultSummary: React.FC = () => {
  const [expandedDocument, setExpandedDocument] = useState<string | null>(null);
  
  const mockResultData = {
    maxLoanAmount: 420000,
    requestedAmount: 300000, // Updated to 300,000 euros
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

  const handleDocumentClick = (documentType: string) => {
    setExpandedDocument(expandedDocument === documentType ? null : documentType);
  };

  const renderDocumentPreview = (documentType: string) => {
    return (
      <div className="mt-4 p-4 bg-gray-50 rounded-lg border-t">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Document Preview</h4>
            <div className="bg-white border rounded-lg p-4 h-64 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <FileText className="w-12 h-12 mx-auto mb-2" />
                <p className="text-sm">PDF Preview</p>
                <p className="text-xs">{documentType}</p>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-3">AI Extracted Information</h4>
            <div className="space-y-4">
              <div className="bg-white border rounded-lg p-4">
                <h5 className="font-medium text-sm text-gray-700 mb-2">Key Data Points</h5>
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
              
              <div className="bg-white border rounded-lg p-4">
                <h5 className="font-medium text-sm text-gray-700 mb-2">Analysis Notes</h5>
                <p className="text-sm text-gray-600">
                  Document authenticity verified through digital signature validation. 
                  Income patterns show consistent monthly deposits. All required fields 
                  successfully extracted with high confidence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Final Assessment - Updated styling to white/black */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
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
              <p className="text-2xl font-bold text-gray-900">{requestedLoanToIncomeRatio.toFixed(1)}x</p>
            </div>
          </div>

          {needsAdjustment && (
            <div className="pt-4 border-t border-gray-200">
              <div className="bg-gray-50 p-4 rounded border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <Bot className="w-4 h-4 text-gray-600" />
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

      {/* Income Analysis Documents - Updated layout to horizontal */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Income Analysis Documents
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Horizontal layout for document cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border border-gray-200 cursor-pointer hover:shadow-md transition-shadow" 
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

            <Card className="border border-gray-200 cursor-pointer hover:shadow-md transition-shadow" 
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

            <Card className="border border-gray-200 cursor-pointer hover:shadow-md transition-shadow" 
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
