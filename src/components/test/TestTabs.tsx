
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Test } from '@/types/test';
import TestsList from './TestsList';
import TestOutput from './TestOutput';
import TestScreenshots from './TestScreenshots';

interface TestTabsProps {
  tests: Test[];
  selectedSpec: string | null;
  isRunning: boolean;
}

const TestTabs: React.FC<TestTabsProps> = ({ tests, selectedSpec, isRunning }) => {
  return (
    <Tabs defaultValue="tests">
      <TabsList>
        <TabsTrigger value="tests">Tests</TabsTrigger>
        <TabsTrigger value="output">Output</TabsTrigger>
        <TabsTrigger value="screenshots">Screenshots</TabsTrigger>
      </TabsList>
      
      <TabsContent value="tests" className="mt-4">
        <TestsList tests={tests} />
      </TabsContent>
      
      <TabsContent value="output" className="mt-4">
        <TestOutput tests={tests} selectedSpec={selectedSpec} isRunning={isRunning} />
      </TabsContent>
      
      <TabsContent value="screenshots" className="mt-4">
        <TestScreenshots tests={tests} selectedSpec={selectedSpec} />
      </TabsContent>
    </Tabs>
  );
};

export default TestTabs;
