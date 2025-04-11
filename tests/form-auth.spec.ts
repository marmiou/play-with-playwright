
import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';

test.describe('Form Authentication', () => {
  test('should login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    
    await loginPage.login('tomsmith', 'SuperSecretPassword!');
    await loginPage.verifySuccessfulLogin();
  });

  test('should not login with invalid username', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    
    await loginPage.login('invaliduser', 'SuperSecretPassword!');
    await loginPage.verifyFailedLogin('Your username is invalid!');
  });
  
  test('should not login with invalid password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    
    await loginPage.login('tomsmith', 'InvalidPassword!');
    await loginPage.verifyFailedLogin('Your password is invalid!');
  });
});
