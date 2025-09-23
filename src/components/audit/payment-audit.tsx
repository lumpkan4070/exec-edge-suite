import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Clock, Zap } from 'lucide-react';

interface AuditResult {
  id: string;
  description: string;
  status: 'pass' | 'fail' | 'warning' | 'pending';
  priority: 'P0' | 'P1' | 'P2' | 'P3';
  measurementMs?: number;
  details?: string;
}

export default function PaymentAudit() {
  const [auditResults, setAuditResults] = useState<AuditResult[]>([
    // PAY-001 through PAY-014 from WRD
    { id: 'PAY-001', description: 'Click "Start Free Trial" → overlay shows instantly (<0.5s)', status: 'pending', priority: 'P0' },
    { id: 'PAY-002', description: 'Stripe checkout loads fully in <3s', status: 'pending', priority: 'P0' },
    { id: 'PAY-003', description: 'Personal $29/mo trial starts correctly', status: 'pending', priority: 'P0' },
    { id: 'PAY-004', description: 'Professional $99/mo trial starts correctly', status: 'pending', priority: 'P0' },
    { id: 'PAY-005', description: 'Stripe card payment works', status: 'pending', priority: 'P0' },
    { id: 'PAY-006', description: 'Apple Pay flow works', status: 'pending', priority: 'P1' },
    { id: 'PAY-007', description: 'Google Pay flow works', status: 'pending', priority: 'P1' },
    { id: 'PAY-008', description: 'Valid card → no charge until day 4', status: 'pending', priority: 'P0' },
    { id: 'PAY-009', description: 'Trial converts to paid subscription automatically', status: 'pending', priority: 'P0' },
    { id: 'PAY-010', description: 'Cancel before day 3 → no charge', status: 'pending', priority: 'P0' },
    { id: 'PAY-011', description: '95% of checkout loads <3s', status: 'pending', priority: 'P0' },
    { id: 'PAY-012', description: 'Load testing (100 concurrent users) maintains <3s checkout', status: 'pending', priority: 'P1' },
    { id: 'PAY-013', description: 'Invalid card → error message, no trial start', status: 'pending', priority: 'P0' },
    { id: 'PAY-014', description: 'Timeout → retry prompt, no blank page', status: 'pending', priority: 'P1' },
  ]);

  const [testingInProgress, setTestingInProgress] = useState(false);

  // Listen for audit events in console logs
  useEffect(() => {
    const originalLog = console.log;
    console.log = (...args) => {
      originalLog.apply(console, args);
      
      // Parse audit logs
      const message = args.join(' ');
      if (message.includes('[AUDIT]')) {
        parseAuditMessage(message);
      }
    };

    return () => {
      console.log = originalLog;
    };
  }, []);

  const parseAuditMessage = (message: string) => {
    // Extract PAY-XXX test results from console logs
    const payMatch = message.match(/PAY-(\d+)/);
    if (payMatch) {
      const testId = `PAY-${payMatch[1]}`;
      
      // Extract timing information
      const timeMatch = message.match(/(\d+(?:\.\d+)?)ms/);
      const measurementMs = timeMatch ? parseFloat(timeMatch[1]) : undefined;
      
      // Determine status based on message content
      let status: 'pass' | 'fail' | 'warning' = 'pass';
      if (message.includes('ERROR') || message.includes('FAILED')) {
        status = 'fail';
      } else if (message.includes('WARNING') || (measurementMs && measurementMs > 3000)) {
        status = 'warning';
      }

      setAuditResults(prev => prev.map(result => 
        result.id === testId 
          ? { ...result, status, measurementMs, details: message }
          : result
      ));
    }
  };

  const runFullAudit = async () => {
    setTestingInProgress(true);
    console.log('[AUDIT] Starting comprehensive payment audit...');
    
    // Reset all results
    setAuditResults(prev => prev.map(r => ({ ...r, status: 'pending' as const })));
    
    // Simulate automated testing (in a real implementation, this would trigger actual tests)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setTestingInProgress(false);
    console.log('[AUDIT] Audit completed');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'fail': return <XCircle className="w-5 h-5 text-red-600" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      default: return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'P0': return 'text-red-600 font-bold';
      case 'P1': return 'text-orange-600 font-semibold';
      case 'P2': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  const passedTests = auditResults.filter(r => r.status === 'pass').length;
  const failedTests = auditResults.filter(r => r.status === 'fail').length;
  const warningTests = auditResults.filter(r => r.status === 'warning').length;
  const pendingTests = auditResults.filter(r => r.status === 'pending').length;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Payment Flow Audit Dashboard
            </h1>
            <p className="text-gray-600">
              WRD v1.2 Compliance Testing - APEX Executive
            </p>
          </div>
          <button
            onClick={runFullAudit}
            disabled={testingInProgress}
            className="bg-vivid-indigo text-white px-6 py-3 rounded-lg hover:bg-vivid-indigo/90 disabled:opacity-50 flex items-center space-x-2"
          >
            <Zap className="w-4 h-4" />
            <span>{testingInProgress ? 'Testing...' : 'Run Audit'}</span>
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-green-800 font-semibold">Passed</span>
            </div>
            <div className="text-2xl font-bold text-green-900">{passedTests}</div>
          </div>
          
          <div className="bg-red-50 rounded-lg p-4 border border-red-200">
            <div className="flex items-center space-x-2">
              <XCircle className="w-5 h-5 text-red-600" />
              <span className="text-red-800 font-semibold">Failed</span>
            </div>
            <div className="text-2xl font-bold text-red-900">{failedTests}</div>
          </div>
          
          <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              <span className="text-yellow-800 font-semibold">Warnings</span>
            </div>
            <div className="text-2xl font-bold text-yellow-900">{warningTests}</div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-gray-600" />
              <span className="text-gray-800 font-semibold">Pending</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{pendingTests}</div>
          </div>
        </div>

        {/* Detailed Results */}
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Test Results</h2>
          {auditResults.map((result) => (
            <div
              key={result.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border"
            >
              <div className="flex items-center space-x-3">
                {getStatusIcon(result.status)}
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-900">{result.id}</span>
                    <span className={`text-xs px-2 py-1 rounded ${getPriorityColor(result.priority)}`}>
                      {result.priority}
                    </span>
                  </div>
                  <div className="text-gray-700">{result.description}</div>
                  {result.details && (
                    <div className="text-xs text-gray-500 mt-1 font-mono">
                      {result.details}
                    </div>
                  )}
                </div>
              </div>
              <div className="text-right">
                {result.measurementMs && (
                  <div className={`text-sm font-medium ${
                    result.measurementMs > 3000 ? 'text-red-600' : 
                    result.measurementMs > 1000 ? 'text-yellow-600' : 'text-green-600'
                  }`}>
                    {result.measurementMs.toFixed(1)}ms
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Final Acceptance Status */}
        <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            Final Acceptance Criteria
          </h3>
          <div className="space-y-2 text-blue-800">
            <div className="flex items-center space-x-2">
              {failedTests === 0 ? 
                <CheckCircle className="w-4 h-4 text-green-600" /> : 
                <XCircle className="w-4 h-4 text-red-600" />
              }
              <span>No P0/P1 failures: {failedTests === 0 ? 'PASS' : 'FAIL'}</span>
            </div>
            <div className="flex items-center space-x-2">
              {passedTests >= 10 ? 
                <CheckCircle className="w-4 h-4 text-green-600" /> : 
                <XCircle className="w-4 h-4 text-red-600" />
              }
              <span>Core payment flows working: {passedTests >= 10 ? 'PASS' : 'FAIL'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}