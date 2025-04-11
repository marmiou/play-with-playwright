
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Terminal } from 'lucide-react';
import { Test } from '@/types/test';

interface TestOutputProps {
  tests: Test[];
  selectedSpec: string | null;
  isRunning: boolean;
}

const TestOutput: React.FC<TestOutputProps> = ({ tests, selectedSpec, isRunning }) => {
  const passedCount = tests.filter(t => t.status === 'passed').length;
  const failedCount = tests.filter(t => t.status === 'failed').length;
  
  return (
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
  );
};

export default TestOutput;
