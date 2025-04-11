
import React from 'react';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import { useTestRunner } from '@/hooks/useTestRunner';
import TestStatusCards from '@/components/test/TestStatusCards';
import TestProgressBar from '@/components/test/TestProgressBar';
import TestTabs from '@/components/test/TestTabs';

interface TestRunnerPanelProps {
  selectedSpec: string | null;
}

const TestRunnerPanel: React.FC<TestRunnerPanelProps> = ({ selectedSpec }) => {
  const { tests, isRunning, progress, runTests } = useTestRunner(selectedSpec);
  
  return (
    <div className="p-6 h-[calc(100vh-64px)] overflow-y-auto">
      <TestStatusCards tests={tests} />
      
      <TestProgressBar isRunning={isRunning} progress={progress} />
      
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Test Results</h2>
        <Button onClick={runTests} disabled={isRunning} className="flex items-center gap-2">
          <Play className="h-4 w-4" />
          {isRunning ? 'Running...' : 'Run Tests'}
        </Button>
      </div>
      
      <TestTabs 
        tests={tests} 
        selectedSpec={selectedSpec} 
        isRunning={isRunning} 
      />
    </div>
  );
};

export default TestRunnerPanel;
