
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Test } from '@/types/test';

interface TestStatusCardsProps {
  tests: Test[];
}

const TestStatusCards: React.FC<TestStatusCardsProps> = ({ tests }) => {
  const passedCount = tests.filter(t => t.status === 'passed').length;
  const failedCount = tests.filter(t => t.status === 'failed').length;
  const pendingCount = tests.filter(t => t.status === 'pending' || t.status === 'running').length;

  return (
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
  );
};

export default TestStatusCards;
