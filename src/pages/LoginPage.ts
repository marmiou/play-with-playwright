
import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  // Locators
  private usernameInput = this.page.locator('#username');
  private passwordInput = this.page.locator('#password');
  private loginButton = this.page.locator('button[type="submit"]');
  private flashMessage = this.page.locator('#flash');

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

  async getFlashMessage() {
    return this.flashMessage.textContent();
  }

  async verifySuccessfulLogin() {
    await expect(this.flashMessage).toContainText('You logged into a secure area');
  }

  async verifyFailedLogin() {
    await expect(this.flashMessage).toContainText('Your username is invalid');
  }
}
