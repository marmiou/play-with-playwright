import React, { useState, useEffect } from 'react';
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
  const testSuites = {
    login: [
      { 
        id: 'login-1', 
        name: 'should login with valid credentials', 
        status: 'pending', 
        browser: 'chromium',
        steps: [
          { id: 'login-1-1', description: 'Navigate to login page', status: 'pending' },
          { id: 'login-1-2', description: 'Enter username', status: 'pending' },
          { id: 'login-1-3', description: 'Enter password', status: 'pending' },
          { id: 'login-1-4', description: 'Click login button', status: 'pending' },
          { id: 'login-1-5', description: 'Verify successful login message', status: 'pending' },
        ]
      },
      { 
        id: 'login-2', 
        name: 'should not login with invalid credentials', 
        status: 'pending', 
        browser: 'chromium',
        steps: [
          { id: 'login-2-1', description: 'Navigate to login page', status: 'pending' },
          { id: 'login-2-2', description: 'Enter invalid username', status: 'pending' },
          { id: 'login-2-3', description: 'Enter invalid password', status: 'pending' },
          { id: 'login-2-4', description: 'Click login button', status: 'pending' },
          { id: 'login-2-5', description: 'Verify error message is displayed', status: 'pending' },
        ]
      },
    ],
    checkboxes: [
      { 
        id: 'checkbox-1', 
        name: 'should check and uncheck checkboxes', 
        status: 'pending', 
        browser: 'chromium',
        steps: [
          { id: 'checkbox-1-1', description: 'Navigate to checkboxes page', status: 'pending' },
          { id: 'checkbox-1-2', description: 'Verify initial checkbox states', status: 'pending' },
          { id: 'checkbox-1-3', description: 'Toggle first checkbox', status: 'pending' },
          { id: 'checkbox-1-4', description: 'Verify first checkbox is checked', status: 'pending' },
          { id: 'checkbox-1-5', description: 'Toggle second checkbox', status: 'pending' },
          { id: 'checkbox-1-6', description: 'Verify second checkbox is unchecked', status: 'pending' },
        ]
      }
    ],
    dropdown: [
      { 
        id: 'dropdown-1', 
        name: 'should select dropdown options', 
        status: 'pending', 
        browser: 'chromium',
        steps: [
          { id: 'dropdown-1-1', description: 'Navigate to dropdown page', status: 'pending' },
          { id: 'dropdown-1-2', description: 'Select Option 1', status: 'pending' },
          { id: 'dropdown-1-3', description: 'Verify Option 1 is selected', status: 'pending' },
          { id: 'dropdown-1-4', description: 'Select Option 2', status: 'pending' },
          { id: 'dropdown-1-5', description: 'Verify Option 2 is selected', status: 'pending' },
        ]
      }
    ],
    inputs: [
      { 
        id: 'inputs-1', 
        name: 'should enter numeric values', 
        status: 'pending', 
        browser: 'chromium',
        steps: [
          { id: 'inputs-1-1', description: 'Navigate to inputs page', status: 'pending' },
          { id: 'inputs-1-2', description: 'Enter number 42', status: 'pending' },
          { id: 'inputs-1-3', description: 'Verify input value is 42', status: 'pending' },
          { id: 'inputs-1-4', description: 'Enter number 0', status: 'pending' },
          { id: 'inputs-1-5', description: 'Verify input value is 0', status: 'pending' },
          { id: 'inputs-1-6', description: 'Enter number -10', status: 'pending' },
          { id: 'inputs-1-7', description: 'Verify input value is -10', status: 'pending' },
        ]
      }
    ],
    hovers: [
      { 
        id: 'hovers-1', 
        name: 'should display user information on hover', 
        status: 'pending', 
        browser: 'chromium',
        steps: [
          { id: 'hovers-1-1', description: 'Navigate to hovers page', status: 'pending' },
          { id: 'hovers-1-2', description: 'Hover over first user', status: 'pending' },
          { id: 'hovers-1-3', description: 'Verify user info is visible', status: 'pending' },
          { id: 'hovers-1-4', description: 'Move mouse away', status: 'pending' },
          { id: 'hovers-1-5', description: 'Verify user info is hidden', status: 'pending' },
          { id: 'hovers-1-6', description: 'Test hover on second user', status: 'pending' },
          { id: 'hovers-1-7', description: 'Test hover on third user', status: 'pending' },
        ]
      }
    ],
    'dynamic-loading': [
      { 
        id: 'dynamic-1', 
        name: 'should wait for hidden element', 
        status: 'pending', 
        browser: 'chromium',
        steps: [
          { id: 'dynamic-1-1', description: 'Navigate to dynamic loading example 1', status: 'pending' },
          { id: 'dynamic-1-2', description: 'Click start button', status: 'pending' },
          { id: 'dynamic-1-3', description: 'Wait for loading indicator', status: 'pending' },
          { id: 'dynamic-1-4', description: 'Verify element is present', status: 'pending' },
        ]
      },
      { 
        id: 'dynamic-2', 
        name: 'should wait for element rendered after loading', 
        status: 'pending', 
        browser: 'chromium',
        steps: [
          { id: 'dynamic-2-1', description: 'Navigate to dynamic loading example 2', status: 'pending' },
          { id: 'dynamic-2-2', description: 'Click start button', status: 'pending' },
          { id: 'dynamic-2-3', description: 'Wait for loading indicator', status: 'pending' },
          { id: 'dynamic-2-4', description: 'Verify element is present', status: 'pending' },
        ]
      }
    ]
  };
  
  const [tests, setTests] = useState<Test[]>(
    selectedSpec && testSuites[selectedSpec as keyof typeof testSuites] 
      ? testSuites[selectedSpec as keyof typeof testSuites] 
      : testSuites.login
  );
  
  useEffect(() => {
    if (selectedSpec && testSuites[selectedSpec as keyof typeof testSuites]) {
      setTests(testSuites[selectedSpec as keyof typeof testSuites]);
    } else if (!selectedSpec) {
      setTests(testSuites.login);
    }
  }, [selectedSpec]);
  
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const runTests = async () => {
    if (isRunning) return;
    
    setIsRunning(true);
    setProgress(0);
    toast.info('Running tests...');
    
    setTests(tests.map(test => ({ 
      ...test, 
      status: 'pending', 
      duration: undefined, 
      error: undefined,
      steps: test.steps.map(step => ({ ...step, status: 'pending', error: undefined }))
    })));
    
    const totalTests = tests.length;
    
    for (let i = 0; i < totalTests; i++) {
      setTests(prev => {
        const updated = [...prev];
        updated[i].status = 'running';
        return updated;
      });
      
      const currentTest = tests[i];
      for (let j = 0; j < currentTest.steps.length; j++) {
        setTests(prev => {
          const updated = [...prev];
          updated[i].steps[j].status = 'running';
          return updated;
        });
        
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const stepPassed = Math.random() > 0.15;
        
        setTests(prev => {
          const updated = [...prev];
          updated[i].steps[j].status = stepPassed ? 'passed' : 'failed';
          
          if (!stepPassed) {
            updated[i].steps[j].error = 'Element not found or assertion failed';
            updated[i].status = 'failed';
            updated[i].error = `Step ${j+1} failed: ${updated[i].steps[j].error}`;
            return updated;
          }
          
          if (j === currentTest.steps.length - 1) {
            updated[i].status = 'passed';
          }
          
          return updated;
        });
        
        if (tests[i].steps[j].status === 'failed') {
          break;
        }
      }
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setTests(prev => {
        const updated = [...prev];
        updated[i].duration = Math.floor(Math.random() * 1000) + 500;
        return updated;
      });
      
      setProgress(Math.round(((i + 1) / totalTests) * 100));
    }
    
    setIsRunning(false);
    
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
                <div className="text-gray-400 mt-2">Running {tests.length} tests using 1 worker</div>
                {tests.map((test, index) => (
                  <div key={index} className="mt-1">
                    {test.status === 'passed' ? (
                      <>
                        <span className="text-green-400">✓ </span>
                        <span className="text-white">{selectedSpec}.spec.ts › {test.name}</span>
                        <span className="text-gray-400"> ({test.duration || '0'}ms)</span>
                      </>
                    ) : test.status === 'failed' ? (
                      <div className="text-red-400">
                        ✘ {selectedSpec}.spec.ts › {test.name} ({test.duration || '0'}ms)
                      </div>
                    ) : (
                      <>
                        <span className="text-gray-400">- </span>
                        <span className="text-white">{selectedSpec}.spec.ts › {test.name}</span>
                        <span className="text-gray-400"> (pending)</span>
                      </>
                    )}
                  </div>
                ))}
                {!isRunning && (
                  <div className="mt-4 text-gray-400">
                    {passedCount} passed, {failedCount} failed ({(tests.reduce((sum, test) => sum + (test.duration || 0), 0) / 1000).toFixed(2)}s)
                  </div>
                )}
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
                {failedCount > 0 ? (
                  <div className="border rounded-md p-2">
                    <div className="text-sm font-medium mb-2">{selectedSpec}.spec.ts - failed assertion</div>
                    <div className="bg-gray-100 h-48 flex items-center justify-center">
                      <AlertCircle className="h-12 w-12 text-gray-400" />
                    </div>
                  </div>
                ) : (
                  <div className="border rounded-md p-2 col-span-2 text-center py-12">
                    <AlertCircle className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <div className="text-sm text-gray-500">No screenshots available - all tests passed or not yet run</div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TestRunnerPanel;
