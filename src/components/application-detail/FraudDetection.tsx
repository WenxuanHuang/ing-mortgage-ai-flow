
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, Shield, FileCheck, Eye, Clock, Hash } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface FraudDetectionProps {
  document: {
    name: string;
    docName: string;
  };
}

const FraudDetection: React.FC<FraudDetectionProps> = ({ document }) => {
  // Mock fraud detection data - in real implementation, this would come from AI analysis
  const fraudAnalysis = {
    overallScore: document.name === 'Salary Statement' ? 94 : document.name === 'Bank Statement' ? 78 : 91,
    riskLevel: document.name === 'Bank Statement' ? 'Medium' : 'Low',
    
    digitalIntegrity: {
      score: document.name === 'Bank Statement' ? 72 : 95,
      pixelAnalysis: document.name === 'Bank Statement' ? 'Inconsistencies detected in table rows 15-18' : 'No anomalies detected',
      compressionArtifacts: document.name === 'Bank Statement' ? 'Multiple compression cycles detected' : 'Single compression cycle',
      layerAnalysis: 'No hidden layers detected'
    },
    
    officialAuthority: {
      score: document.name === 'Salary Statement' ? 98 : document.name === 'Bank Statement' ? 85 : 96,
      signaturePresent: true,
      signatureAuthentic: document.name === 'Bank Statement' ? 'Partially verified' : 'Verified',
      letterheadValid: true,
      officialSeal: document.name === 'Employer Statement' ? 'Present and verified' : 'Not applicable',
      watermark: document.name === 'Bank Statement' ? 'Faded watermark detected' : 'Clear and authentic'
    },
    
    contentConsistency: {
      score: document.name === 'Bank Statement' ? 76 : 93,
      fontConsistency: document.name === 'Bank Statement' ? 'Minor inconsistencies in font rendering' : 'Consistent throughout',
      dateFormat: 'Standard format verified',
      calculationAccuracy: document.name === 'Bank Statement' ? 'One calculation discrepancy found' : 'All calculations verified',
      crossReference: 'Matches other submitted documents'
    },
    
    aiProcessingDetection: {
      score: 89,
      aiGenerated: 'No AI generation signatures detected',
      digitalEditing: document.name === 'Bank Statement' ? 'Possible text editing detected' : 'No editing traces found',
      templateMatching: 'Matches known authentic templates',
      patternRecognition: 'Human-generated patterns confirmed'
    },
    
    metadata: {
      creationDate: document.name === 'Bank Statement' ? '2024-01-15 14:23:17' : '2024-01-12 09:45:32',
      modificationDate: document.name === 'Bank Statement' ? '2024-01-15 14:27:44' : '2024-01-12 09:45:32',
      software: document.name === 'Bank Statement' ? 'Adobe Acrobat Pro DC, Microsoft Word' : 'Bank Statement Generator v2.1',
      suspicious: document.name === 'Bank Statement' ? 'Multiple modification timestamps' : 'Clean metadata',
      fileSize: '2.4 MB',
      pageCount: document.name === 'Bank Statement' ? '3' : '1',
      embedded: document.name === 'Bank Statement' ? 'Hidden text layers detected' : 'No embedded content'
    },
    
    specificFindings: document.name === 'Bank Statement' ? [
      { type: 'warning', message: 'Transaction amounts in rows 15-18 show pixel-level inconsistencies' },
      { type: 'warning', message: 'Document modified 4 minutes after creation' },
      { type: 'info', message: 'Balance calculation verified against transaction history' }
    ] : document.name === 'Salary Statement' ? [
      { type: 'success', message: 'All security features verified' },
      { type: 'info', message: 'Employer signature matches company records' }
    ] : [
      { type: 'success', message: 'Official company seal authenticated' },
      { type: 'info', message: 'HR department contact verified' }
    ]
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card className="mt-4 border-l-4 border-l-blue-500">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-lg">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-600" />
            Fraud Detection Analysis
          </div>
          <div className="flex items-center gap-2">
            <Badge className={`${getRiskColor(fraudAnalysis.riskLevel)} border`}>
              Risk: {fraudAnalysis.riskLevel}
            </Badge>
            <span className={`text-lg font-bold ${getScoreColor(fraudAnalysis.overallScore)}`}>
              {fraudAnalysis.overallScore}%
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Overall Authenticity Score */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">Document Authenticity</span>
            <span className={getScoreColor(fraudAnalysis.overallScore)}>
              {fraudAnalysis.overallScore}%
            </span>
          </div>
          <Progress 
            value={fraudAnalysis.overallScore} 
            className={`h-3 ${fraudAnalysis.overallScore >= 90 ? '[&>div]:bg-green-500' : 
              fraudAnalysis.overallScore >= 75 ? '[&>div]:bg-yellow-500' : '[&>div]:bg-red-500'}`}
          />
        </div>

        {/* Specific Findings */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Key Findings
          </h4>
          <div className="space-y-2">
            {fraudAnalysis.specificFindings.map((finding, index) => (
              <div key={index} className={`p-2 rounded-lg text-sm border ${
                finding.type === 'warning' ? 'bg-yellow-50 border-yellow-200 text-yellow-800' :
                finding.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' :
                'bg-blue-50 border-blue-200 text-blue-800'
              }`}>
                {finding.message}
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Analysis Sections */}
        <Collapsible>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-2 bg-gray-50 rounded-lg hover:bg-gray-100">
            <span className="font-medium text-sm">Digital Integrity Analysis</span>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-medium ${getScoreColor(fraudAnalysis.digitalIntegrity.score)}`}>
                {fraudAnalysis.digitalIntegrity.score}%
              </span>
              <Eye className="w-4 h-4" />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-3 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div>
                <span className="font-medium text-gray-600">Pixel Analysis:</span>
                <p className="text-gray-800">{fraudAnalysis.digitalIntegrity.pixelAnalysis}</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Compression:</span>
                <p className="text-gray-800">{fraudAnalysis.digitalIntegrity.compressionArtifacts}</p>
              </div>
              <div className="md:col-span-2">
                <span className="font-medium text-gray-600">Layer Analysis:</span>
                <p className="text-gray-800">{fraudAnalysis.digitalIntegrity.layerAnalysis}</p>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-2 bg-gray-50 rounded-lg hover:bg-gray-100">
            <span className="font-medium text-sm">Official Authority Verification</span>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-medium ${getScoreColor(fraudAnalysis.officialAuthority.score)}`}>
                {fraudAnalysis.officialAuthority.score}%
              </span>
              <FileCheck className="w-4 h-4" />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-3 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div>
                <span className="font-medium text-gray-600">Signature:</span>
                <p className="text-gray-800">{fraudAnalysis.officialAuthority.signatureAuthentic}</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Letterhead:</span>
                <p className="text-gray-800">{fraudAnalysis.officialAuthority.letterheadValid ? 'Valid' : 'Invalid'}</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Official Seal:</span>
                <p className="text-gray-800">{fraudAnalysis.officialAuthority.officialSeal}</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Watermark:</span>
                <p className="text-gray-800">{fraudAnalysis.officialAuthority.watermark}</p>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-2 bg-gray-50 rounded-lg hover:bg-gray-100">
            <span className="font-medium text-sm">AI Processing Detection</span>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-medium ${getScoreColor(fraudAnalysis.aiProcessingDetection.score)}`}>
                {fraudAnalysis.aiProcessingDetection.score}%
              </span>
              <Hash className="w-4 h-4" />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-3 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div>
                <span className="font-medium text-gray-600">AI Generation:</span>
                <p className="text-gray-800">{fraudAnalysis.aiProcessingDetection.aiGenerated}</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Digital Editing:</span>
                <p className="text-gray-800">{fraudAnalysis.aiProcessingDetection.digitalEditing}</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Template Match:</span>
                <p className="text-gray-800">{fraudAnalysis.aiProcessingDetection.templateMatching}</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Pattern Analysis:</span>
                <p className="text-gray-800">{fraudAnalysis.aiProcessingDetection.patternRecognition}</p>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-2 bg-gray-50 rounded-lg hover:bg-gray-100">
            <span className="font-medium text-sm">Document Metadata Analysis</span>
            <div className="flex items-center gap-2">
              <Badge variant={fraudAnalysis.metadata.suspicious.includes('Clean') ? 'secondary' : 'destructive'} className="text-xs">
                {fraudAnalysis.metadata.suspicious.includes('Clean') ? 'Clean' : 'Suspicious'}
              </Badge>
              <Clock className="w-4 h-4" />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-3 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div>
                <span className="font-medium text-gray-600">Created:</span>
                <p className="text-gray-800">{fraudAnalysis.metadata.creationDate}</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Modified:</span>
                <p className="text-gray-800">{fraudAnalysis.metadata.modificationDate}</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Software Used:</span>
                <p className="text-gray-800">{fraudAnalysis.metadata.software}</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">File Size:</span>
                <p className="text-gray-800">{fraudAnalysis.metadata.fileSize}</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Assessment:</span>
                <p className={`font-medium ${fraudAnalysis.metadata.suspicious.includes('Clean') ? 'text-green-600' : 'text-yellow-600'}`}>
                  {fraudAnalysis.metadata.suspicious}
                </p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Embedded Content:</span>
                <p className="text-gray-800">{fraudAnalysis.metadata.embedded}</p>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};

export default FraudDetection;
