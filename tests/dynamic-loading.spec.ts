
import { test, expect } from '@playwright/test';
import { DynamicLoadingPage } from '../src/pages/DynamicLoadingPage';

test.describe('Dynamic Loading functionality', () => {
  test('should wait for hidden element', async ({ page }) => {
    const dynamicLoadingPage = new DynamicLoadingPage(page);
    await dynamicLoadingPage.navigateToExample(1);
    
    await dynamicLoadingPage.clickStart();
    await dynamicLoadingPage.waitForLoading();
    await dynamicLoadingPage.verifyElementPresent();
  });
  
  test('should wait for element rendered after loading', async ({ page }) => {
    const dynamicLoadingPage = new DynamicLoadingPage(page);
    await dynamicLoadingPage.navigateToExample(2);
    
    await dynamicLoadingPage.clickStart();
    await dynamicLoadingPage.waitForLoading();
    await dynamicLoadingPage.verifyElementPresent();
  });
});
