
import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  // Locators
  private usernameInput = this.page.locator('#username');
  private passwordInput = this.page.locator('#password');
  private loginButton = this.page.locator('button[type="submit"]');
  private flashMessage = this.page.locator('#flash');
  private logoutButton = this.page.locator('a.button:has-text("Logout")');

  constructor(page: Page) {
    super(page);
  }

  async navigate() {
    await super.navigate('/login');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async verifySuccessfulLogin() {
    await expect(this.flashMessage).toContainText('You logged into a secure area');
    await expect(this.logoutButton).toBeVisible();
  }

  async verifyFailedLogin(expectedError?: string) {
    if (expectedError) {
      await expect(this.flashMessage).toContainText(expectedError);
    } else {
      await expect(this.flashMessage).toContainText('Your username is invalid');
    }
  }

  async logout() {
    await this.logoutButton.click();
    await expect(this.flashMessage).toContainText('You logged out of the secure area');
  }
}
