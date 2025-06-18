
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Shield, AlertTriangle, CheckCircle, XCircle, Eye, Zap, FileSearch, Fingerprint } from 'lucide-react';

interface FraudDetectionProps {
  documentType: string;
}

const FraudDetection: React.FC<FraudDetectionProps> = ({ documentType }) => {
  const getFraudDetectionData = (docType: string) => {
    switch (docType) {
      case 'Bank Statement':
        return {
          overallScore: 94,
          riskLevel: 'Low',
          digitalIntegrity: {
            score: 96,
            findings: [
              { type: 'metadata', status: 'verified', detail: 'Original PDF creation timestamp matches bank systems' },
              { type: 'compression', status: 'verified', detail: 'No signs of document recompression or editing' },
              { type: 'layers', status: 'verified', detail: 'Single layer PDF structure confirmed' }
            ]
          },
          officialAuthority: {
            score: 92,
            findings: [
              { type: 'letterhead', status: 'verified', detail: 'ING Bank official letterhead authenticated' },
              { type: 'watermark', status: 'verified', detail: 'Security watermark detected and validated' },
              { type: 'signature', status: 'warning', detail: 'Digital signature present but requires manual verification' }
            ]
          },
          contentConsistency: {
            score: 95,
            findings: [
              { type: 'formatting', status: 'verified', detail: 'Standard ING Bank statement format confirmed' },
              { type: 'calculations', status: 'verified', detail: 'All mathematical calculations are accurate' },
              { type: 'dates', status: 'verified', detail: 'Date sequences are logical and consistent' }
            ]
          },
          aiProcessingDetection: {
            score: 98,
            findings: [
              { type: 'aiGenerated', status: 'verified', detail: 'No AI-generated content detected' },
              { type: 'editing', status: 'verified', detail: 'No traces of document editing software found' },
              { type: 'ocr', status: 'verified', detail: 'Original digital text, not OCR processed' }
            ]
          }
        };
      case 'Payment Slip':
        return {
          overallScore: 87,
          riskLevel: 'Medium',
          digitalIntegrity: {
            score: 85,
            findings: [
              { type: 'metadata', status: 'warning', detail: 'PDF creation software differs from employer standard' },
              { type: 'compression', status: 'verified', detail: 'Original compression ratio maintained' },
              { type: 'layers', status: 'error', detail: 'Multiple PDF layers detected - requires investigation' }
            ]
          },
          officialAuthority: {
            score: 89,
            findings: [
              { type: 'letterhead', status: 'verified', detail: 'TechCorp Amsterdam letterhead matches records' },
              { type: 'stamp', status: 'verified', detail: 'HR department stamp authenticated' },
              { type: 'signature', status: 'verified', detail: 'Manager signature verified against database' }
            ]
          },
          contentConsistency: {
            score: 90,
            findings: [
              { type: 'formatting', status: 'verified', detail: 'Standard payroll template format' },
              { type: 'calculations', status: 'verified', detail: 'Tax and deduction calculations accurate' },
              { type: 'employee_id', status: 'verified', detail: 'Employee ID matches HR records' }
            ]
          },
          aiProcessingDetection: {
            score: 84,
            findings: [
              { type: 'aiGenerated', status: 'verified', detail: 'No AI-generated content detected' },
              { type: 'editing', status: 'warning', detail: 'Minor editing traces found in salary field' },
              { type: 'fonts', status: 'warning', detail: 'Font inconsistency detected in amount section' }
            ]
          }
        };
      case 'Employer Statement':
        return {
          overallScore: 96,
          riskLevel: 'Low',
          digitalIntegrity: {
            score: 98,
            findings: [
              { type: 'metadata', status: 'verified', detail: 'Original document metadata intact' },
              { type: 'compression', status: 'verified', detail: 'No recompression artifacts detected' },
              { type: 'hash', status: 'verified', detail: 'Document hash matches employer database' }
            ]
          },
          officialAuthority: {
            score: 97,
            findings: [
              { type: 'letterhead', status: 'verified', detail: 'Official TechCorp letterhead authenticated' },
              { type: 'seal', status: 'verified', detail: 'Company seal verified against registry' },
              { type: 'signature', status: 'verified', detail: 'HR Director signature authenticated' }
            ]
          },
          contentConsistency: {
            score: 95,
            findings: [
              { type: 'formatting', status: 'verified', detail: 'Standard employment letter format' },
              { type: 'employment_data', status: 'verified', detail: 'Employment details match HR records' },
              { type: 'legal_language', status: 'verified', detail: 'Legal terminology and structure verified' }
            ]
          },
          aiProcessingDetection: {
            score: 96,
            findings: [
              { type: 'aiGenerated', status: 'verified', detail: 'No AI-generated content detected' },
              { type: 'editing', status: 'verified', detail: 'No document editing traces found' },
              { type: 'authenticity', status: 'verified', detail: 'Document authenticity confirmed' }
            ]
          }
        };
      default:
        return null;
    }
  };

  const fraudData = getFraudDetectionData(documentType);
  
  if (!fraudData) return null;

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'error': return <XCircle className="w-4 h-4 text-red-600" />;
      default: return <Eye className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'text-green-700';
      case 'warning': return 'text-yellow-700';
      case 'error': return 'text-red-700';
      default: return 'text-gray-700';
    }
  };

  return (
    <div className="mt-6 border border-orange-200 rounded-xl bg-gradient-to-br from-orange-50 to-red-50">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-6 h-6 text-orange-600" />
          <h4 className="text-lg font-semibold text-gray-900">Fraud Detection Analysis</h4>
          <Badge className={`${getRiskColor(fraudData.riskLevel)} border`}>
            {fraudData.riskLevel} Risk
          </Badge>
        </div>

        {/* Overall Authenticity Score */}
        <div className="mb-6 p-4 bg-white rounded-lg border border-orange-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-700">Document Authenticity Score</span>
            <span className="text-lg font-bold text-gray-900">{fraudData.overallScore}%</span>
          </div>
          <Progress value={fraudData.overallScore} className="h-3" />
          <p className="text-xs text-gray-600 mt-2">
            Advanced pattern recognition and integrity analysis completed
          </p>
        </div>

        {/* Detailed Analysis Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Digital Integrity */}
          <Card className="border-blue-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Zap className="w-4 h-4 text-blue-600" />
                Digital Integrity
                <Badge variant="secondary" className="text-xs">
                  {fraudData.digitalIntegrity.score}%
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {fraudData.digitalIntegrity.findings.map((finding, index) => (
                <div key={index} className="flex items-start gap-2 text-xs">
                  {getStatusIcon(finding.status)}
                  <div className="flex-1">
                    <p className={`font-medium ${getStatusColor(finding.status)}`}>
                      {finding.type.charAt(0).toUpperCase() + finding.type.slice(1)}
                    </p>
                    <p className="text-gray-600">{finding.detail}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Official Authority */}
          <Card className="border-purple-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Fingerprint className="w-4 h-4 text-purple-600" />
                Official Authority
                <Badge variant="secondary" className="text-xs">
                  {fraudData.officialAuthority.score}%
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {fraudData.officialAuthority.findings.map((finding, index) => (
                <div key={index} className="flex items-start gap-2 text-xs">
                  {getStatusIcon(finding.status)}
                  <div className="flex-1">
                    <p className={`font-medium ${getStatusColor(finding.status)}`}>
                      {finding.type.charAt(0).toUpperCase() + finding.type.slice(1)}
                    </p>
                    <p className="text-gray-600">{finding.detail}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Content Consistency */}
          <Card className="border-green-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <FileSearch className="w-4 h-4 text-green-600" />
                Content Consistency
                <Badge variant="secondary" className="text-xs">
                  {fraudData.contentConsistency.score}%
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {fraudData.contentConsistency.findings.map((finding, index) => (
                <div key={index} className="flex items-start gap-2 text-xs">
                  {getStatusIcon(finding.status)}
                  <div className="flex-1">
                    <p className={`font-medium ${getStatusColor(finding.status)}`}>
                      {finding.type.charAt(0).toUpperCase() + finding.type.slice(1)}
                    </p>
                    <p className="text-gray-600">{finding.detail}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* AI Processing Detection */}
          <Card className="border-indigo-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Eye className="w-4 h-4 text-indigo-600" />
                AI Processing Detection
                <Badge variant="secondary" className="text-xs">
                  {fraudData.aiProcessingDetection.score}%
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {fraudData.aiProcessingDetection.findings.map((finding, index) => (
                <div key={index} className="flex items-start gap-2 text-xs">
                  {getStatusIcon(finding.status)}
                  <div className="flex-1">
                    <p className={`font-medium ${getStatusColor(finding.status)}`}>
                      {finding.type.charAt(0).toUpperCase() + finding.type.slice(1)}
                    </p>
                    <p className="text-gray-600">{finding.detail}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Risk Assessment Summary */}
        <div className="mt-6 p-4 bg-white rounded-lg border border-orange-200">
          <h5 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-orange-600" />
            Risk Assessment Summary
          </h5>
          <div className="text-sm text-gray-700">
            {fraudData.riskLevel === 'Low' && (
              <p>Document shows high authenticity with minimal risk factors. All major verification checks passed successfully.</p>
            )}
            {fraudData.riskLevel === 'Medium' && (
              <p>Document authenticity is generally good with some minor concerns that require attention. Manual review recommended for flagged items.</p>
            )}
            {fraudData.riskLevel === 'High' && (
              <p>Document shows significant authenticity concerns. Immediate manual verification required before proceeding with application.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FraudDetection;
