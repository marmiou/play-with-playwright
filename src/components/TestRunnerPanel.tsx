
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, Clock, Play, AlertCircle, FileText, Terminal, Image, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface TestStep {
  id: string;
  description: string;
  status: 'passed' | 'failed' | 'pending' | 'running';
  error?: string;
  screenshot?: string;
}

interface Test {
  id: string;
  name: string;
  status: 'passed' | 'failed' | 'pending' | 'running';
  duration?: number;
  error?: string;
  browser: string;
  steps: TestStep[];
}

interface TestRunnerPanelProps {
  selectedSpec: string | null;
}

const TestRunnerPanel: React.FC<TestRunnerPanelProps> = ({ selectedSpec }) => {
  const [tests, setTests] = useState<Test[]>([
    { 
      id: '1', 
      name: 'should login with valid credentials', 
      status: 'pending', 
      browser: 'chromium',
      steps: [
        { id: '1-1', description: 'Navigate to login page', status: 'pending' },
        { id: '1-2', description: 'Enter username', status: 'pending' },
        { id: '1-3', description: 'Enter password', status: 'pending' },
        { id: '1-4', description: 'Click login button', status: 'pending' },
        { id: '1-5', description: 'Verify dashboard is displayed', status: 'pending' },
      ]
    },
    { 
      id: '2', 
      name: 'should not login with invalid credentials', 
      status: 'pending', 
      browser: 'chromium',
      steps: [
        { id: '2-1', description: 'Navigate to login page', status: 'pending' },
        { id: '2-2', description: 'Enter invalid username', status: 'pending' },
        { id: '2-3', description: 'Enter invalid password', status: 'pending' },
        { id: '2-4', description: 'Click login button', status: 'pending' },
        { id: '2-5', description: 'Verify error message is displayed', status: 'pending' },
      ]
    },
    { 
      id: '3', 
      name: 'should show validation errors', 
      status: 'pending', 
      browser: 'chromium',
      steps: [
        { id: '3-1', description: 'Navigate to login page', status: 'pending' },
        { id: '3-2', description: 'Leave username empty', status: 'pending' },
        { id: '3-3', description: 'Leave password empty', status: 'pending' },
        { id: '3-4', description: 'Click login button', status: 'pending' },
        { id: '3-5', description: 'Verify validation errors are displayed', status: 'pending' },
      ]
    },
  ]);
  
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const runTests = async () => {
    if (isRunning) return;
    
    setIsRunning(true);
    setProgress(0);
    toast.info('Running tests...');
    
    // Reset test statuses
    setTests(tests.map(test => ({ 
      ...test, 
      status: 'pending', 
      duration: undefined, 
      error: undefined,
      steps: test.steps.map(step => ({ ...step, status: 'pending', error: undefined }))
    })));
    
    // Simulate test execution
    const totalTests = tests.length;
    
    for (let i = 0; i < totalTests; i++) {
      // Update current test to running
      setTests(prev => {
        const updated = [...prev];
        updated[i].status = 'running';
        return updated;
      });
      
      // Run each step in the test
      const currentTest = tests[i];
      for (let j = 0; j < currentTest.steps.length; j++) {
        // Update current step to running
        setTests(prev => {
          const updated = [...prev];
          updated[i].steps[j].status = 'running';
          return updated;
        });
        
        // Simulate step execution time
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Random pass/fail based on step id for demo purposes
        const stepPassed = Math.random() > 0.15;
        
        // Update step status
        setTests(prev => {
          const updated = [...prev];
          updated[i].steps[j].status = stepPassed ? 'passed' : 'failed';
          
          if (!stepPassed) {
            updated[i].steps[j].error = 'Element not found or assertion failed';
            // If a step fails, fail the test and break the step loop
            updated[i].status = 'failed';
            updated[i].error = `Step ${j+1} failed: ${updated[i].steps[j].error}`;
            return updated;
          }
          
          // If this is the last step and all steps passed, mark test as passed
          if (j === currentTest.steps.length - 1) {
            updated[i].status = 'passed';
          }
          
          return updated;
        });
        
        // If the step failed, break the step loop
        if (tests[i].steps[j].status === 'failed') {
          break;
        }
      }
      
      // Simulate test completion time
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update test duration
      setTests(prev => {
        const updated = [...prev];
        updated[i].duration = Math.floor(Math.random() * 1000) + 500;
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
          <Accordion type="multiple" className="w-full">
            {tests.map((test) => (
              <AccordionItem key={test.id} value={test.id} className={test.status === 'failed' ? 'bg-red-50 rounded-md mb-2' : 'mb-2 border rounded-md'}>
                <AccordionTrigger className="px-4 py-2 hover:no-underline">
                  <div className="flex items-center gap-3 w-full">
                    <div className="w-6">{getStatusIcon(test.status)}</div>
                    <div className="flex-1 font-medium text-left">{test.name}</div>
                    <div className="text-sm text-muted-foreground text-right">
                      {test.duration ? `${test.duration}ms` : '-'}
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="px-4 pb-2">
                    <div className="text-sm text-muted-foreground mb-2">Browser: {test.browser}</div>
                    {test.error && (
                      <div className="text-sm text-red-500 mb-4 p-2 bg-red-50 rounded-md">
                        Error: {test.error}
                      </div>
                    )}
                    <div className="text-sm font-medium mb-2">Test Steps:</div>
                    <div className="space-y-2 ml-4">
                      {test.steps.map((step) => (
                        <div 
                          key={step.id} 
                          className={`p-2 rounded-md flex items-start gap-2 ${
                            step.status === 'failed' ? 'bg-red-50' : 
                            step.status === 'passed' ? 'bg-green-50' : 
                            'bg-gray-50'
                          }`}
                        >
                          <div className="mt-0.5">{getStatusIcon(step.status)}</div>
                          <div className="flex-1">
                            <div className="text-sm">{step.description}</div>
                            {step.error && (
                              <div className="text-xs text-red-500 mt-1 p-1 bg-red-50 rounded">
                                {step.error}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
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
