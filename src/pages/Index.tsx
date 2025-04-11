
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, BarChart2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-6">Playwright Testing Framework</h1>
      <p className="text-xl text-gray-600 mb-10">
        A comprehensive testing solution for the-internet.herokuapp.com
      </p>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <Play className="h-6 w-6 text-primary mb-2" />
            <CardTitle>Basic Test Runner</CardTitle>
            <CardDescription>
              Run your tests with a simple interface
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              A straightforward interface to run your Playwright tests against the target application.
            </p>
          </CardContent>
          <CardFooter>
            <Link to="/test-framework">
              <Button variant="outline" className="gap-2">
                Go to Test Runner
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
        
        <Card className="bg-primary text-primary-foreground">
          <CardHeader>
            <BarChart2 className="h-6 w-6 mb-2" />
            <CardTitle>Advanced Dashboard</CardTitle>
            <CardDescription className="text-primary-foreground/80">
              Interactive test dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              A feature-rich dashboard with detailed reporting, screenshots, and more.
            </p>
          </CardContent>
          <CardFooter>
            <Link to="/dashboard">
              <Button variant="secondary" className="gap-2">
                Open Dashboard
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Documentation</CardTitle>
            <CardDescription>
              Learn how to use the testing framework
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Comprehensive documentation on how to create and run tests using this Playwright framework.
            </p>
          </CardContent>
          <CardFooter>
            <Link to="/documentation">
              <Button variant="outline" className="gap-2">
                View Documentation
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Index;
