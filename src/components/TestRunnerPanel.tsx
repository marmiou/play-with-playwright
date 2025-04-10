
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, Clock, Play, AlertCircle, FileText, Terminal, Image, Split } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';

interface Test {
  id: string;
  name: string;
  status: 'passed' | 'failed' | 'pending' | 'running';
  duration?: number;
  error?: string;
  browser: string;
}

interface TestRunnerPanelProps {
  selectedSpec: string | null;
}

const TestRunnerPanel: React.FC<TestRunnerPanelProps> = ({ selectedSpec }) => {
  const [tests, setTests] = useState<Test[]>([
    { id: '1', name: 'should login with valid credentials', status: 'pending', browser: 'chromium' },
    { id: '2', name: 'should not login with invalid credentials', status: 'pending', browser: 'chromium' },
    { id: '3', name: 'should show validation errors', status: 'pending', browser: 'chromium' },
  ]);
  
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const runTests = async () => {
    if (isRunning) return;
    
    setIsRunning(true);
    setProgress(0);
    toast.info('Running tests...');
    
    // Reset test statuses
    setTests(tests.map(test => ({ ...test, status: 'pending', duration: undefined, error: undefined })));
    
    // Simulate test execution
    const totalTests = tests.length;
    
    for (let i = 0; i < totalTests; i++) {
      // Update current test to running
      setTests(prev => {
        const updated = [...prev];
        updated[i].status = 'running';
        return updated;
      });
      
      // Simulate test execution time
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Random pass/fail based on test id for demo purposes
      const passed = Math.random() > 0.3;
      
      // Update test status
      setTests(prev => {
        const updated = [...prev];
        updated[i].status = passed ? 'passed' : 'failed';
        updated[i].duration = Math.floor(Math.random() * 1000) + 500;
        if (!passed) {
          updated[i].error = 'Element not found or assertion failed';
        }
        return updated;
      });
      
      // Update progress
      setProgress(Math.round(((i + 1) / totalTests) * 100));
    }
    
    setIsRunning(false);
    
    // Calculate results
    const passedCount = tests.filter(t => t.status === 'passed').length;
    const failedCount = tests.filter(t => t.status === 'failed').length;
    
    if (failedCount > 0) {
      toast.error(`Tests completed with ${failedCount} failure(s)`);
    } else {
      toast.success('All tests passed successfully!');
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'running':
        return <Clock className="h-5 w-5 text-blue-500 animate-spin" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };
  
  const passedCount = tests.filter(t => t.status === 'passed').length;
  const failedCount = tests.filter(t => t.status === 'failed').length;
  const pendingCount = tests.filter(t => t.status === 'pending' || t.status === 'running').length;
  
  return (
    <div className="p-6 h-[calc(100vh-64px)] overflow-y-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold text-green-500">{passedCount}</div>
              <div className="text-sm text-muted-foreground mt-1">Passed</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold text-red-500">{failedCount}</div>
              <div className="text-sm text-muted-foreground mt-1">Failed</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold">{pendingCount}</div>
              <div className="text-sm text-muted-foreground mt-1">Pending</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold">{tests.length}</div>
              <div className="text-sm text-muted-foreground mt-1">Total</div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {isRunning && (
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Running tests...</span>
            <span className="text-sm">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      )}
      
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Test Results</h2>
        <Button onClick={runTests} disabled={isRunning} className="flex items-center gap-2">
          <Play className="h-4 w-4" />
          {isRunning ? 'Running...' : 'Run Tests'}
        </Button>
      </div>
      
      <Tabs defaultValue="tests">
        <TabsList>
          <TabsTrigger value="tests">Tests</TabsTrigger>
          <TabsTrigger value="output">Output</TabsTrigger>
          <TabsTrigger value="screenshots">Screenshots</TabsTrigger>
        </TabsList>
        
        <TabsContent value="tests" className="mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">Status</TableHead>
                <TableHead>Test Name</TableHead>
                <TableHead>Browser</TableHead>
                <TableHead className="text-right">Duration</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tests.map((test) => (
                <TableRow key={test.id} className={test.status === 'failed' ? 'bg-red-50' : ''}>
                  <TableCell>{getStatusIcon(test.status)}</TableCell>
                  <TableCell>
                    <div className="font-medium">{test.name}</div>
                    {test.error && (
                      <div className="text-xs text-red-500 mt-1">{test.error}</div>
                    )}
                  </TableCell>
                  <TableCell>{test.browser}</TableCell>
                  <TableCell className="text-right">
                    {test.duration ? `${test.duration}ms` : '-'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
        
        <TabsContent value="output" className="mt-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <Terminal className="h-5 w-5" />
                <h3 className="font-semibold">Test Console Output</h3>
              </div>
              <div className="bg-black text-white p-4 rounded-md font-mono text-sm h-64 overflow-auto">
                <div className="text-green-400">$ npx playwright test</div>
                <div className="text-gray-400 mt-2">Running 3 tests using 1 worker</div>
                <div className="mt-1">
                  <span className="text-green-400">✓ </span>
                  <span className="text-white">login.spec.ts:10:19 › should login with valid credentials</span>
                  <span className="text-gray-400"> (818ms)</span>
                </div>
                <div className="mt-1">
                  <span className="text-green-400">✓ </span>
                  <span className="text-white">login.spec.ts:18:19 › should not login with invalid credentials</span>
                  <span className="text-gray-400"> (629ms)</span>
                </div>
                <div className="mt-1 text-red-400">
                  ✘ login.spec.ts:26:19 › should show validation errors (734ms)
                </div>
                <div className="mt-1 text-gray-400 ml-4">
                  Error: Timed out waiting for element to be visible
                  at LoginPage.verifyErrorMessage (/tests/pages/LoginPage.ts:38:12)
                </div>
                <div className="mt-4 text-gray-400">
                  2 passed, 1 failed (1.21s)
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="screenshots" className="mt-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <Image className="h-5 w-5" />
                <h3 className="font-semibold">Test Screenshots</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-md p-2">
                  <div className="text-sm font-medium mb-2">login.spec.ts - failed assertion</div>
                  <div className="bg-gray-100 h-48 flex items-center justify-center">
                    <AlertCircle className="h-12 w-12 text-gray-400" />
                  </div>
                </div>
                <div className="border rounded-md p-2">
                  <div className="text-sm font-medium mb-2">login.spec.ts - before state</div>
                  <div className="bg-gray-100 h-48 flex items-center justify-center">
                    <AlertCircle className="h-12 w-12 text-gray-400" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TestRunnerPanel;
