import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { CheckCircle, AlertTriangle, Clock, FileText, User, Shield, Activity, Zap, Eye, Download, RefreshCw, Calculator, TrendingUp, DollarSign } from 'lucide-react';

const ApplicationDetailView = ({ application }) => {
  const [overrideValues, setOverrideValues] = useState({});

  const AgentActivity = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5" />
          AI Agent Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Document Intake
              </span>
              <span className="text-sm text-gray-600">{application.agents.documentIntake}%</span>
            </div>
            <Progress value={application.agents.documentIntake} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Risk Assessment
              </span>
              <span className="text-sm text-gray-600">{application.agents.riskAssessment}%</span>
            </div>
            <Progress value={application.agents.riskAssessment} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Compliance
              </span>
              <span className="text-sm text-gray-600">{application.agents.compliance}%</span>
            </div>
            <Progress value={application.agents.compliance} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium flex items-center gap-2">
                <User className="w-4 h-4" />
                Communication
              </span>
              <span className="text-sm text-gray-600">{application.agents.communication}%</span>
            </div>
            <Progress value={application.agents.communication} className="h-2" />
          </div>
        </div>

        <div className="border-t pt-4">
          <h4 className="font-medium mb-2">Recent AI Activity</h4>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {application.agentLogs.map((log, index) => (
              <div key={index} className="flex items-start gap-2 text-sm">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  log.type === 'success' ? 'bg-green-500' :
                  log.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                }`} />
                <div>
                  <span className="text-gray-500">{log.timestamp}</span>
                  <p className="text-gray-700">{log.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const TaskList = () => (
    <Card>
      <CardHeader>
        <CardTitle>Workflow Collaboration</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="completed" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="completed">AI Completed</TabsTrigger>
            <TabsTrigger value="pending">Your Actions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="completed" className="space-y-3">
            {application.tasks.filter(t => t.status === 'done').map(task => (
              <div key={task.id} className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium">{task.description}</p>
                    <p className="text-sm text-gray-600">Confidence: {task.confidence}%</p>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  AI Completed
                </Badge>
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="pending" className="space-y-3">
            {application.tasks.filter(t => t.status === 'pending' || t.status === 'in-progress').map(task => (
              <div key={task.id} className="flex items-center justify-between p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="font-medium">{task.description}</p>
                    {task.flaggedBy && (
                      <p className="text-sm text-gray-600">Flagged by: {task.flaggedBy}</p>
                    )}
                    {task.confidence && (
                      <p className="text-sm text-gray-600">AI Confidence: {task.confidence}%</p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    Review
                  </Button>
                  <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                    Complete
                  </Button>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );

  const DocumentProcessing = () => {
    const mockDocuments = [
      {
        name: 'Salary Statement',
        extractionProgress: 100,
        validationScore: 98,
        tasks: [
          'Cross-referencing Ockto employment data',
          'Calculating 36-month income stability index'
        ],
        fields: [
          { name: 'Monthly Income', value: '€4,200', confidence: 98, sourcePage: 1, docName: 'salary_statement.pdf' },
          { name: 'Employer', value: 'TechCorp Amsterdam', confidence: 100, sourcePage: 1, docName: 'salary_statement.pdf' }
        ]
      },
      {
        name: 'Bank Statement',
        extractionProgress: 87,
        validationScore: 94,
        tasks: [
          'Detecting altered PDF metadata',
          'Analyzing transaction patterns'
        ],
        fields: [
          { name: 'Average Balance', value: '€12,450', confidence: 94, sourcePage: 2, docName: 'bank_statement.pdf' },
          { name: 'Monthly Inflows', value: '€4,180', confidence: 89, sourcePage: 3, docName: 'bank_statement.pdf' }
        ]
      }
    ];

    const DataValidation = ({ field }) => {
      const [isEditing, setIsEditing] = useState(false);
      const [editValue, setEditValue] = useState(field.value);

      const handleOverride = () => {
        setOverrideValues({ ...overrideValues, [field.name]: editValue });
        setIsEditing(false);
      };

      return (
        <div className="border rounded-lg p-4 space-y-3">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-medium">{field.name}</h4>
              <p className="text-sm text-gray-600">
                Source: Page {field.sourcePage} of {field.docName}
              </p>
            </div>
            <Badge variant="secondary" className={
              field.confidence >= 95 ? 'bg-green-100 text-green-800' :
              field.confidence >= 85 ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }>
              {field.confidence}% Confidence
            </Badge>
          </div>
          
          <div className="space-y-2">
            <div>
              <span className="text-sm font-medium text-gray-600">AI Extraction:</span>
              <p className="font-medium">{field.value}</p>
            </div>
            
            {isEditing ? (
              <div className="space-y-2">
                <Input
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="w-full"
                />
                <div className="flex gap-2">
                  <Button size="sm" onClick={handleOverride}>
                    Submit Correction
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
                Override Value
              </Button>
            )}
          </div>
        </div>
      );
    };

    return (
      <div className="space-y-4">
        {mockDocuments.map((doc, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{doc.name}</span>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">
                    Validation: {doc.validationScore}/100
                  </Badge>
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4 mr-2" />
                    View PDF
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Extraction Progress</span>
                  <span>{doc.extractionProgress}%</span>
                </div>
                <Progress value={doc.extractionProgress} className="h-2" />
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Current AI Tasks:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {doc.tasks.map((task, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <RefreshCw className="w-3 h-3 animate-spin" />
                      {task}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Extracted Fields:</h4>
                {doc.fields.map((field, i) => (
                  <DataValidation key={i} field={field} />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  const CustomerProfile = () => (
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

  const ResultSummary = () => {
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
          confidence: 94,
          monthsAnalyzed: 12,
          averageMonthlyIncome: 4150
        },
        paymentSlip: {
          estimatedAnnualIncome: 50400,
          confidence: 98,
          grossMonthlySalary: 4200,
          netMonthlySalary: 3150
        },
        employerStatement: {
          estimatedAnnualIncome: 50400,
          confidence: 100,
          officialAnnualSalary: 50400,
          bonuses: 0
        },
        finalEstimate: {
          annualIncome: 50200,
          overallConfidence: 97,
          deviation: 1.2
        }
      }
    };

    return (
      <div className="space-y-6">
        {/* Lending Decision Summary */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              Lending Decision Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
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
                  {mockResultData.maxLoanAmount < mockResultData.requestedAmount && (
                    <Badge variant="destructive" className="mt-2">
                      Below Requested Amount
                    </Badge>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-600">Monthly Payment</span>
                    <p className="font-semibold">€{mockResultData.monthlyPayment}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Interest Rate</span>
                    <p className="font-semibold">{mockResultData.interestRate}%</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Loan-to-Value</span>
                    <p className="font-semibold">{mockResultData.loanToValue}%</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Term</span>
                    <p className="font-semibold">{mockResultData.loanTerm} years</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Calculation Rationale</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Gross Monthly Income:</span>
                    <span className="font-medium">€{mockResultData.rationale.grossMonthlyIncome}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Debt-to-Income Ratio:</span>
                    <span className="font-medium">{mockResultData.rationale.debtToIncomeRatio}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Credit Score:</span>
                    <span className="font-medium">{mockResultData.rationale.creditScore}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Down Payment:</span>
                    <span className="font-medium">€{mockResultData.rationale.downPayment.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monthly Expenses:</span>
                    <span className="font-medium">€{mockResultData.rationale.monthlyExpenses}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Income Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Income Estimation Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Bank Statement */}
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
                  <div>
                    <span className="text-sm text-gray-600">Average Monthly</span>
                    <p className="font-medium">€{mockResultData.incomeAnalysis.bankStatement.averageMonthlyIncome}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Analysis Period</span>
                    <p className="font-medium">{mockResultData.incomeAnalysis.bankStatement.monthsAnalyzed} months</p>
                  </div>
                  <div className="pt-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">Confidence</span>
                      <span className="text-sm font-medium">{mockResultData.incomeAnalysis.bankStatement.confidence}%</span>
                    </div>
                    <Progress value={mockResultData.incomeAnalysis.bankStatement.confidence} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* Payment Slip */}
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
                  <div>
                    <span className="text-sm text-gray-600">Gross Monthly</span>
                    <p className="font-medium">€{mockResultData.incomeAnalysis.paymentSlip.grossMonthlySalary}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Net Monthly</span>
                    <p className="font-medium">€{mockResultData.incomeAnalysis.paymentSlip.netMonthlySalary}</p>
                  </div>
                  <div className="pt-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">Confidence</span>
                      <span className="text-sm font-medium">{mockResultData.incomeAnalysis.paymentSlip.confidence}%</span>
                    </div>
                    <Progress value={mockResultData.incomeAnalysis.paymentSlip.confidence} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* Employer Statement */}
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
                  <div>
                    <span className="text-sm text-gray-600">Official Annual Salary</span>
                    <p className="font-medium">€{mockResultData.incomeAnalysis.employerStatement.officialAnnualSalary.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Annual Bonuses</span>
                    <p className="font-medium">€{mockResultData.incomeAnalysis.employerStatement.bonuses}</p>
                  </div>
                  <div className="pt-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">Confidence</span>
                      <span className="text-sm font-medium">{mockResultData.incomeAnalysis.employerStatement.confidence}%</span>
                    </div>
                    <Progress value={mockResultData.incomeAnalysis.employerStatement.confidence} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Final Analysis */}
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
                    <p className="text-2xl font-bold text-green-800">{mockResultData.incomeAnalysis.finalEstimate.overallConfidence}%</p>
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
                    The employer statement provides the most authoritative source ({mockResultData.incomeAnalysis.employerStatement.confidence}% confidence), 
                    while bank statement analysis over {mockResultData.incomeAnalysis.bankStatement.monthsAnalyzed} months confirms sustained income patterns. 
                    This high confidence score of {mockResultData.incomeAnalysis.finalEstimate.overallConfidence}% supports the lending decision.
                  </p>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="documents">Document Processing</TabsTrigger>
        <TabsTrigger value="tasks">Tasks & Workflow</TabsTrigger>
        <TabsTrigger value="audit">Audit Trail</TabsTrigger>
        <TabsTrigger value="result">Result</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <CustomerProfile />
          <AgentActivity />
        </div>
      </TabsContent>

      <TabsContent value="documents" className="space-y-4">
        <DocumentProcessing />
      </TabsContent>

      <TabsContent value="tasks" className="space-y-4">
        <TaskList />
      </TabsContent>

      <TabsContent value="audit" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Audit Trail & Decision History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 border-l-4 border-green-500 bg-green-50">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">AI Risk Assessment Completed</p>
                    <p className="text-sm text-gray-600">Model version: v2.3.1 | Confidence: 94%</p>
                    <p className="text-sm text-gray-600">Training data snapshot: 2024-Q1</p>
                  </div>
                  <span className="text-sm text-gray-500">2025-06-03 09:15</span>
                </div>
              </div>
              
              <div className="p-3 border-l-4 border-blue-500 bg-blue-50">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">Ockto Data Validation</p>
                    <p className="text-sm text-gray-600">Cross-referenced employment data with 98% match</p>
                    <p className="text-sm text-gray-600">Source: Official payroll systems</p>
                  </div>
                  <span className="text-sm text-gray-500">2025-06-03 09:12</span>
                </div>
              </div>

              <div className="p-3 border-l-4 border-yellow-500 bg-yellow-50">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">Human Override Required</p>
                    <p className="text-sm text-gray-600">Bank statement anomaly flagged for manual review</p>
                    <p className="text-sm text-gray-600">AI Confidence: 73% (below threshold)</p>
                  </div>
                  <span className="text-sm text-gray-500">2025-06-03 09:10</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="result" className="space-y-4">
        <ResultSummary />
      </TabsContent>
    </Tabs>
  );
};

export default ApplicationDetailView;
