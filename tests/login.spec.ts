
import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';

test.describe('Login functionality', () => {
  test('should login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    
    await loginPage.login('tomsmith', 'SuperSecretPassword!');
    await loginPage.verifySuccessfulLogin();
  });

  test('should not login with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    
    await loginPage.login('invaliduser', 'invalidpassword');
    await loginPage.verifyFailedLogin();
  });
});
