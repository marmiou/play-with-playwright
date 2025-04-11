
import { test, expect } from '@playwright/test';
import { DropdownPage } from '../src/pages/DropdownPage';

test.describe('Dropdown functionality', () => {
  test('should select dropdown options', async ({ page }) => {
    const dropdownPage = new DropdownPage(page);
    await dropdownPage.navigate();
    
    // Select option 1
    await dropdownPage.selectOption('Option 1');
    await dropdownPage.verifySelectedOption('Option 1');
    
    // Select option 2
    await dropdownPage.selectOption('Option 2');
    await dropdownPage.verifySelectedOption('Option 2');
  });
});
