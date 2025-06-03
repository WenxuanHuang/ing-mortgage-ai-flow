
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Calculator, FileText, DollarSign, Shield, Bot } from 'lucide-react';

const ResultSummary: React.FC = () => {
  const mockResultData = {
    maxLoanAmount: 420000,
    requestedAmount: 450000,
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
        estimatedAnnualIncome: 49800,
        incomeComponents: {
          salary: 42000,
          bonuses: 3600,
          otherIncome: 4200
        }
      },
      paymentSlip: {
        estimatedAnnualIncome: 50400,
        incomeComponents: {
          baseSalary: 48000,
          holidayAllowance: 2400,
          other: 0
        }
      },
      employerStatement: {
        estimatedAnnualIncome: 50400,
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

  const currentLoanToIncomeRatio = (mockResultData.maxLoanAmount / mockResultData.incomeAnalysis.finalEstimate.annualIncome);
  const targetRatio = 5.0;
  const suggestedLoanAmount = mockResultData.incomeAnalysis.finalEstimate.annualIncome * targetRatio;
  const ratioDeviation = Math.abs(currentLoanToIncomeRatio - targetRatio);
  const needsAdjustment = ratioDeviation > 0.2;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Income Estimation Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Bank Statement
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <span className="text-sm text-gray-600">Estimated Annual Income</span>
                  <p className="text-xl font-bold">€{mockResultData.incomeAnalysis.bankStatement.estimatedAnnualIncome.toLocaleString()}</p>
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

            <Card className="border border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Payment Slip
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <span className="text-sm text-gray-600">Estimated Annual Income</span>
                  <p className="text-xl font-bold">€{mockResultData.incomeAnalysis.paymentSlip.estimatedAnnualIncome.toLocaleString()}</p>
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

            <Card className="border border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Employer Statement
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <span className="text-sm text-gray-600">Estimated Annual Income</span>
                  <p className="text-xl font-bold">€{mockResultData.incomeAnalysis.employerStatement.estimatedAnnualIncome.toLocaleString()}</p>
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

          <Card className="bg-green-50 border-green-200">
            <CardHeader>
              <CardTitle className="text-lg text-green-800">Final Income Assessment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <span className="text-sm text-green-700">Final Estimated Annual Income</span>
                  <p className="text-2xl font-bold text-green-800">€{mockResultData.incomeAnalysis.finalEstimate.annualIncome.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-sm text-green-700">Overall Confidence Score</span>
                  <p className="text-2xl font-bold text-green-800">{(100 - mockResultData.incomeAnalysis.finalEstimate.deviation).toFixed(1)}%</p>
                </div>
                <div>
                  <span className="text-sm text-green-700">Document Deviation</span>
                  <p className="text-2xl font-bold text-green-800">{mockResultData.incomeAnalysis.finalEstimate.deviation}%</p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-green-200">
                <h4 className="font-medium text-green-800 mb-2">Analysis Summary</h4>
                <p className="text-sm text-green-700">
                  The three income verification documents show excellent consistency with only {mockResultData.incomeAnalysis.finalEstimate.deviation}% deviation. 
                  The employer statement provides the most authoritative source, 
                  while bank statement analysis confirms sustained income patterns. 
                  This high confidence score of {(100 - mockResultData.incomeAnalysis.finalEstimate.deviation).toFixed(1)}% supports the lending decision.
                </p>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            Lending Decision Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-lg mb-2">Maximum Loan Amount</h4>
                <div className="text-3xl font-bold text-ing-orange">
                  €{mockResultData.maxLoanAmount.toLocaleString()}
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Requested: €{mockResultData.requestedAmount.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-lg mb-2">Loan-to-Income Ratio</h4>
                <div className="text-3xl font-bold text-blue-800">
                  {currentLoanToIncomeRatio.toFixed(1)}x
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  €{mockResultData.maxLoanAmount.toLocaleString()} ÷ €{mockResultData.incomeAnalysis.finalEstimate.annualIncome.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Target ratio: 5.0x for optimal lending standards
                </p>
              </div>
            </div>
          </div>

          {needsAdjustment && (
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-lg text-blue-800 flex items-center gap-2">
                  <Bot className="w-5 h-5" />
                  AI Guidance for Loan Amount Adjustment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-blue-700">Current Ratio</span>
                    <p className="text-xl font-bold text-blue-800">{currentLoanToIncomeRatio.toFixed(1)}x</p>
                  </div>
                  <div>
                    <span className="text-sm text-blue-700">Target Ratio</span>
                    <p className="text-xl font-bold text-blue-800">{targetRatio}x</p>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-blue-200">
                  <h4 className="font-medium text-blue-800 mb-2">Recommended Adjustment</h4>
                  <div className="bg-white p-4 rounded border border-blue-200">
                    <p className="text-sm text-blue-700 mb-2">
                      <strong>Suggested Maximum Loan Amount:</strong> €{suggestedLoanAmount.toLocaleString()}
                    </p>
                    <p className="text-sm text-blue-600">
                      To achieve the optimal 5x loan-to-income ratio based on the final income assessment of 
                      €{mockResultData.incomeAnalysis.finalEstimate.annualIncome.toLocaleString()}, 
                      the recommended maximum loan amount is €{suggestedLoanAmount.toLocaleString()}. 
                      This {currentLoanToIncomeRatio > targetRatio ? 'reduces' : 'increases'} the current amount by 
                      €{Math.abs(suggestedLoanAmount - mockResultData.maxLoanAmount).toLocaleString()} 
                      to align with sustainable lending practices.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultSummary;
