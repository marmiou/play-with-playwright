
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Image, AlertCircle } from 'lucide-react';
import { Test } from '@/types/test';

interface TestScreenshotsProps {
  tests: Test[];
  selectedSpec: string | null;
}

const TestScreenshots: React.FC<TestScreenshotsProps> = ({ tests, selectedSpec }) => {
  const failedCount = tests.filter(t => t.status === 'failed').length;
  
  return (
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
  );
};

export default TestScreenshots;
