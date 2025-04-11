
import { Test } from "@/types/test";

const testSuites: Record<string, Test[]> = {
  login: [
    { 
      id: 'login-1', 
      name: 'should login with valid credentials', 
      status: 'pending', 
      browser: 'chromium',
      steps: [
        { id: 'login-1-1', description: 'Navigate to login page', status: 'pending' },
        { id: 'login-1-2', description: 'Enter username', status: 'pending' },
        { id: 'login-1-3', description: 'Enter password', status: 'pending' },
        { id: 'login-1-4', description: 'Click login button', status: 'pending' },
        { id: 'login-1-5', description: 'Verify successful login message', status: 'pending' },
      ]
    },
    { 
      id: 'login-2', 
      name: 'should not login with invalid credentials', 
      status: 'pending', 
      browser: 'chromium',
      steps: [
        { id: 'login-2-1', description: 'Navigate to login page', status: 'pending' },
        { id: 'login-2-2', description: 'Enter invalid username', status: 'pending' },
        { id: 'login-2-3', description: 'Enter invalid password', status: 'pending' },
        { id: 'login-2-4', description: 'Click login button', status: 'pending' },
        { id: 'login-2-5', description: 'Verify error message is displayed', status: 'pending' },
      ]
    },
  ],
  checkboxes: [
    { 
      id: 'checkbox-1', 
      name: 'should check and uncheck checkboxes', 
      status: 'pending', 
      browser: 'chromium',
      steps: [
        { id: 'checkbox-1-1', description: 'Navigate to checkboxes page', status: 'pending' },
        { id: 'checkbox-1-2', description: 'Verify initial checkbox states', status: 'pending' },
        { id: 'checkbox-1-3', description: 'Toggle first checkbox', status: 'pending' },
        { id: 'checkbox-1-4', description: 'Verify first checkbox is checked', status: 'pending' },
        { id: 'checkbox-1-5', description: 'Toggle second checkbox', status: 'pending' },
        { id: 'checkbox-1-6', description: 'Verify second checkbox is unchecked', status: 'pending' },
      ]
    }
  ],
  dropdown: [
    { 
      id: 'dropdown-1', 
      name: 'should select dropdown options', 
      status: 'pending', 
      browser: 'chromium',
      steps: [
        { id: 'dropdown-1-1', description: 'Navigate to dropdown page', status: 'pending' },
        { id: 'dropdown-1-2', description: 'Select Option 1', status: 'pending' },
        { id: 'dropdown-1-3', description: 'Verify Option 1 is selected', status: 'pending' },
        { id: 'dropdown-1-4', description: 'Select Option 2', status: 'pending' },
        { id: 'dropdown-1-5', description: 'Verify Option 2 is selected', status: 'pending' },
      ]
    }
  ],
  inputs: [
    { 
      id: 'inputs-1', 
      name: 'should enter numeric values', 
      status: 'pending', 
      browser: 'chromium',
      steps: [
        { id: 'inputs-1-1', description: 'Navigate to inputs page', status: 'pending' },
        { id: 'inputs-1-2', description: 'Enter number 42', status: 'pending' },
        { id: 'inputs-1-3', description: 'Verify input value is 42', status: 'pending' },
        { id: 'inputs-1-4', description: 'Enter number 0', status: 'pending' },
        { id: 'inputs-1-5', description: 'Verify input value is 0', status: 'pending' },
        { id: 'inputs-1-6', description: 'Enter number -10', status: 'pending' },
        { id: 'inputs-1-7', description: 'Verify input value is -10', status: 'pending' },
      ]
    }
  ],
  hovers: [
    { 
      id: 'hovers-1', 
      name: 'should display user information on hover', 
      status: 'pending', 
      browser: 'chromium',
      steps: [
        { id: 'hovers-1-1', description: 'Navigate to hovers page', status: 'pending' },
        { id: 'hovers-1-2', description: 'Hover over first user', status: 'pending' },
        { id: 'hovers-1-3', description: 'Verify user info is visible', status: 'pending' },
        { id: 'hovers-1-4', description: 'Move mouse away', status: 'pending' },
        { id: 'hovers-1-5', description: 'Verify user info is hidden', status: 'pending' },
        { id: 'hovers-1-6', description: 'Test hover on second user', status: 'pending' },
        { id: 'hovers-1-7', description: 'Test hover on third user', status: 'pending' },
      ]
    }
  ],
  'dynamic-loading': [
    { 
      id: 'dynamic-1', 
      name: 'should wait for hidden element', 
      status: 'pending', 
      browser: 'chromium',
      steps: [
        { id: 'dynamic-1-1', description: 'Navigate to dynamic loading example 1', status: 'pending' },
        { id: 'dynamic-1-2', description: 'Click start button', status: 'pending' },
        { id: 'dynamic-1-3', description: 'Wait for loading indicator', status: 'pending' },
        { id: 'dynamic-1-4', description: 'Verify element is present', status: 'pending' },
      ]
    },
    { 
      id: 'dynamic-2', 
      name: 'should wait for element rendered after loading', 
      status: 'pending', 
      browser: 'chromium',
      steps: [
        { id: 'dynamic-2-1', description: 'Navigate to dynamic loading example 2', status: 'pending' },
        { id: 'dynamic-2-2', description: 'Click start button', status: 'pending' },
        { id: 'dynamic-2-3', description: 'Wait for loading indicator', status: 'pending' },
        { id: 'dynamic-2-4', description: 'Verify element is present', status: 'pending' },
      ]
    }
  ]
};

export default testSuites;
