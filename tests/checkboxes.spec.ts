
import { test, expect } from '@playwright/test';
import { CheckboxesPage } from '../src/pages/CheckboxesPage';

test.describe('Checkbox functionality', () => {
  test('should check and uncheck checkboxes', async ({ page }) => {
    const checkboxesPage = new CheckboxesPage(page);
    await checkboxesPage.navigate();
    
    // Verify initial state
    await checkboxesPage.verifyCheckboxState(1, false);
    await checkboxesPage.verifyCheckboxState(2, true);
    
    // Toggle first checkbox
    await checkboxesPage.toggleCheckbox(1);
    await checkboxesPage.verifyCheckboxState(1, true);
    
    // Toggle second checkbox
    await checkboxesPage.toggleCheckbox(2);
    await checkboxesPage.verifyCheckboxState(2, false);
  });
});
