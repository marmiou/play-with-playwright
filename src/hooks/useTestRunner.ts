
import { useState, useEffect } from 'react';
import { Test } from '@/types/test';
import testSuites from '@/data/testSuites';
import { toast } from 'sonner';

export const useTestRunner = (selectedSpec: string | null) => {
  const [tests, setTests] = useState<Test[]>(
    selectedSpec && testSuites[selectedSpec] 
      ? testSuites[selectedSpec] 
      : testSuites.login
  );
  
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    if (selectedSpec && testSuites[selectedSpec]) {
      setTests(testSuites[selectedSpec]);
    } else if (!selectedSpec) {
      setTests(testSuites.login);
    }
  }, [selectedSpec]);
  
  const runTests = async () => {
    if (isRunning) return;
    
    setIsRunning(true);
    setProgress(0);
    toast.info('Running tests...');
    
    setTests(tests.map(test => ({ 
      ...test, 
      status: 'pending' as const, 
      duration: undefined, 
      error: undefined,
      steps: test.steps.map(step => ({ ...step, status: 'pending' as const, error: undefined }))
    })));
    
    const totalTests = tests.length;
    
    for (let i = 0; i < totalTests; i++) {
      setTests(prev => {
        const updated = [...prev];
        updated[i] = {
          ...updated[i],
          status: 'running'
        };
        return updated;
      });
      
      const currentTest = tests[i];
      for (let j = 0; j < currentTest.steps.length; j++) {
        setTests(prev => {
          const updated = [...prev];
          updated[i] = {
            ...updated[i],
            steps: [
              ...updated[i].steps
            ]
          };
          updated[i].steps[j] = {
            ...updated[i].steps[j],
            status: 'running'
          };
          return updated;
        });
        
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const stepPassed = Math.random() > 0.15;
        
        setTests(prev => {
          const updated = [...prev];
          updated[i] = {
            ...updated[i],
            steps: [
              ...updated[i].steps
            ]
          };
          
          updated[i].steps[j] = {
            ...updated[i].steps[j],
            status: stepPassed ? 'passed' : 'failed' 
          };
          
          if (!stepPassed) {
            updated[i].steps[j].error = 'Element not found or assertion failed';
            updated[i].status = 'failed';
            updated[i].error = `Step ${j+1} failed: ${updated[i].steps[j].error}`;
          } else if (j === currentTest.steps.length - 1) {
            updated[i].status = 'passed';
          }
          
          return updated;
        });
        
        if (!stepPassed) {
          break;
        }
      }
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setTests(prev => {
        const updated = [...prev];
        updated[i] = {
          ...updated[i],
          duration: Math.floor(Math.random() * 1000) + 500
        };
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

  return {
    tests,
    isRunning,
    progress,
    runTests
  };
};
