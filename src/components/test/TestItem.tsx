
import React from 'react';
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Test, TestStep } from '@/types/test';
import { getStatusIcon } from '@/utils/testUtils';

interface TestItemProps {
  test: Test;
}

const TestItem: React.FC<TestItemProps> = ({ test }) => {
  return (
    <AccordionItem 
      value={test.id} 
      className={test.status === 'failed' ? 'bg-red-50 rounded-md mb-2' : 'mb-2 border rounded-md'}
    >
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
              <TestStepItem key={step.id} step={step} />
            ))}
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

interface TestStepItemProps {
  step: TestStep;
}

const TestStepItem: React.FC<TestStepItemProps> = ({ step }) => {
  return (
    <div 
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
  );
};

export default TestItem;
