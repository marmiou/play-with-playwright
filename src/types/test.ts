
export interface TestStep {
  id: string;
  description: string;
  status: 'passed' | 'failed' | 'pending' | 'running';
  error?: string;
  screenshot?: string;
}

export interface Test {
  id: string;
  name: string;
  status: 'passed' | 'failed' | 'pending' | 'running';
  duration?: number;
  error?: string;
  browser: string;
  steps: TestStep[];
}
