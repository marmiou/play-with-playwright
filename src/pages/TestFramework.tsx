
import React from 'react';
import TestRunner from '@/components/TestRunner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const TestFramework = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Playwright Testing Framework</h1>
      <p className="text-gray-600 mb-8">
        A framework for testing the-internet.herokuapp.com using Playwright
      </p>
      
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Tests</CardTitle>
            <CardDescription>
              Run automated tests against the application
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TestRunner />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Test Info</CardTitle>
            <CardDescription>
              Information about the test suite
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <p className="text-sm font-medium">Target URL</p>
                <p className="text-sm text-gray-500">https://the-internet.herokuapp.com</p>
              </div>
              <div>
                <p className="text-sm font-medium">Browser</p>
                <p className="text-sm text-gray-500">Chromium</p>
              </div>
              <div>
                <p className="text-sm font-medium">Environment</p>
                <p className="text-sm text-gray-500">Development</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TestFramework;
