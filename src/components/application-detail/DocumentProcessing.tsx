
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Eye, RefreshCw } from 'lucide-react';

const DocumentProcessing: React.FC = () => {
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
    },
    {
      name: 'Employer Statement',
      extractionProgress: 95,
      validationScore: 96,
      tasks: [
        'Validating employment contract details',
        'Cross-checking salary information with payroll systems'
      ],
      fields: [
        { name: 'Annual Salary', value: '€50,400', confidence: 100, sourcePage: 1, docName: 'employer_statement.pdf' },
        { name: 'Employment Start Date', value: '2020-03-15', confidence: 98, sourcePage: 1, docName: 'employer_statement.pdf' },
        { name: 'Employment Type', value: 'Permanent', confidence: 100, sourcePage: 1, docName: 'employer_statement.pdf' }
      ]
    }
  ];

  const DataValidation = ({ field }) => {
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

export default DocumentProcessing;
