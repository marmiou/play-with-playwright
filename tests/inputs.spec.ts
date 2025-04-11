
import { test, expect } from '@playwright/test';
import { InputsPage } from '../src/pages/InputsPage';

test.describe('Inputs functionality', () => {
  test('should enter numeric values', async ({ page }) => {
    const inputsPage = new InputsPage(page);
    await inputsPage.navigate();
    
    await inputsPage.enterNumber(42);
    await inputsPage.verifyInputValue('42');
    
    await inputsPage.enterNumber(0);
    await inputsPage.verifyInputValue('0');
    
    await inputsPage.enterNumber(-10);
    await inputsPage.verifyInputValue('-10');
  });
});
