
import React from 'react';
import { Accordion } from '@/components/ui/accordion';
import { Test } from '@/types/test';
import TestItem from './TestItem';

interface TestsListProps {
  tests: Test[];
}

const TestsList: React.FC<TestsListProps> = ({ tests }) => {
  return (
    <Accordion type="multiple" className="w-full">
      {tests.map((test) => (
        <TestItem key={test.id} test={test} />
      ))}
    </Accordion>
  );
};

export default TestsList;
