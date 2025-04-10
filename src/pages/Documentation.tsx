
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, Code, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Documentation = () => {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex items-center mb-8">
        <Link to="/">
          <Button variant="outline" size="sm" className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Documentation</h1>
      </div>

      <Tabs defaultValue="getting-started">
        <TabsList className="mb-6">
          <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
          <TabsTrigger value="test-writing">Writing Tests</TabsTrigger>
          <TabsTrigger value="api-reference">API Reference</TabsTrigger>
        </TabsList>
        
        <TabsContent value="getting-started">
          <Card>
            <CardHeader>
              <CardTitle>Getting Started with Playwright Testing</CardTitle>
              <CardDescription>Learn the basics of the framework</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <h2 className="text-xl font-semibold">Introduction</h2>
              <p>
                This testing framework is built on top of Playwright, a powerful automation library for browser testing.
                It provides a simple way to test web applications across multiple browsers.
              </p>
              
              <h2 className="text-xl font-semibold">Installation</h2>
              <div className="bg-muted p-4 rounded-md">
                <code>npm install @playwright/test</code>
              </div>
              
              <h2 className="text-xl font-semibold">Running Your First Test</h2>
              <p>
                To run your first test, use the dashboard or test runner interface. You can select specific tests
                to run or run the entire test suite.
              </p>
              
              <div className="flex items-center mt-4">
                <FileText className="h-5 w-5 mr-2 text-primary" />
                <Link to="/test-framework" className="text-primary hover:underline">
                  Try the Basic Test Runner
                </Link>
              </div>
              
              <div className="flex items-center mt-2">
                <Terminal className="h-5 w-5 mr-2 text-primary" />
                <Link to="/dashboard" className="text-primary hover:underline">
                  Use the Advanced Dashboard
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="test-writing">
          <Card>
            <CardHeader>
              <CardTitle>Writing Effective Tests</CardTitle>
              <CardDescription>Best practices and examples</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <h2 className="text-xl font-semibold">Test Structure</h2>
              <p>
                Playwright tests are organized into test files. Each test file can contain multiple test cases.
                Here's an example of a basic test structure:
              </p>
              
              <div className="bg-muted p-4 rounded-md font-mono text-sm">
                <pre>{`import { test, expect } from '@playwright/test';

test('basic test', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/');
  await expect(page).toHaveTitle(/The Internet/);
});`}</pre>
              </div>
              
              <h2 className="text-xl font-semibold">Page Objects</h2>
              <p>
                We recommend using the Page Object Model to organize your tests. This pattern helps keep
                your tests maintainable and reduces code duplication.
              </p>
              
              <h2 className="text-xl font-semibold">Assertions</h2>
              <p>
                Playwright provides a rich set of assertions to verify the state of your application:
              </p>
              
              <ul className="list-disc pl-6 space-y-2">
                <li><code>expect(page).toHaveTitle()</code> - Check page title</li>
                <li><code>expect(locator).toBeVisible()</code> - Check element visibility</li>
                <li><code>expect(locator).toHaveText()</code> - Check element text content</li>
                <li><code>expect(locator).toHaveValue()</code> - Check input value</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="api-reference">
          <Card>
            <CardHeader>
              <CardTitle>API Reference</CardTitle>
              <CardDescription>Detailed documentation of available methods</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <h2 className="text-xl font-semibold">Core Concepts</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">Browser</h3>
                  <p>Represents a browser instance which can have multiple contexts</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium">BrowserContext</h3>
                  <p>An isolated browser session with its own cookies, localStorage, etc.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium">Page</h3>
                  <p>Represents a single tab or page in a browser</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium">Locator</h3>
                  <p>The primary way to find and interact with elements on a page</p>
                </div>
              </div>
              
              <h2 className="text-xl font-semibold">Common Methods</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><code>page.goto(url)</code> - Navigate to a URL</li>
                <li><code>page.click(selector)</code> - Click on an element</li>
                <li><code>page.fill(selector, text)</code> - Fill an input field</li>
                <li><code>page.locator(selector)</code> - Create a locator for an element</li>
                <li><code>page.screenshot()</code> - Take a screenshot</li>
              </ul>
              
              <div className="bg-muted p-4 rounded-md mt-4">
                <p className="text-sm">
                  For complete API documentation, refer to the 
                  <a href="https://playwright.dev/docs/api/class-playwright" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline ml-1">
                    official Playwright documentation
                  </a>.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Documentation;
