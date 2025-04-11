
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface TestProgressBarProps {
  isRunning: boolean;
  progress: number;
}

const TestProgressBar: React.FC<TestProgressBarProps> = ({ isRunning, progress }) => {
  if (!isRunning) return null;

  return (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium">Running tests...</span>
        <span className="text-sm">{progress}%</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
};

export default TestProgressBar;
