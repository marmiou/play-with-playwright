
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle, Play } from 'lucide-react';

interface TestStatus {
  name: string;
  status: 'idle' | 'running' | 'passed' | 'failed';
  duration?: number;
  error?: string;
}

const TestRunner = () => {
  const [tests, setTests] = useState<TestStatus[]>([
    { name: 'Login with valid credentials', status: 'idle' },
    { name: 'Login with invalid credentials', status: 'idle' },
    { name: 'Checkbox interactions', status: 'idle' },
    { name: 'Dropdown selections', status: 'idle' },
  ]);
  
  const [isRunning, setIsRunning] = useState(false);
  
  const runTests = async () => {
    setIsRunning(true);
    
    // Update all tests to running state
    setTests(tests.map(test => ({ ...test, status: 'running' })));
    
    // Simulate test execution
    for (let i = 0; i < tests.length; i++) {
      // Update current test to running
      setTests(prev => {
        const updated = [...prev];
        updated[i].status = 'running';
        return updated;
      });
      
      // Simulate test execution time
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Randomly pass or fail the test (for demo purposes)
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
    }
    
    setIsRunning(false);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Test Runner</h2>
        <Button 
          onClick={runTests} 
          disabled={isRunning}
          className="flex items-center gap-2"
        >
          <Play className="h-4 w-4" />
          Run Tests
        </Button>
      </div>
      
      <div className="space-y-2">
        {tests.map((test, index) => (
          <Card key={index} className="border-l-4 border-l-primary">
            <CardContent className="py-4 px-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {test.status === 'idle' && <div className="w-5 h-5 rounded-full border-2 border-gray-300" />}
                  {test.status === 'running' && (
                    <div className="w-5 h-5 rounded-full border-2 border-transparent border-t-blue-500 animate-spin" />
                  )}
                  {test.status === 'passed' && <CheckCircle className="w-5 h-5 text-green-500" />}
                  {test.status === 'failed' && <AlertCircle className="w-5 h-5 text-red-500" />}
                  <span>{test.name}</span>
                </div>
                {test.duration && <span className="text-sm text-gray-500">{test.duration}ms</span>}
              </div>
              {test.error && (
                <div className="mt-2 text-sm text-red-500 bg-red-50 p-2 rounded">
                  Error: {test.error}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TestRunner;
