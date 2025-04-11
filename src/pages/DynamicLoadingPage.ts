
import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class DynamicLoadingPage extends BasePage {
  // Locators
  private startButton = this.page.locator('button:has-text("Start")');
  private loadingIndicator = this.page.locator('#loading');
  private hiddenElement = this.page.locator('#finish h4');

  constructor(page: Page) {
    super(page);
  }

  async navigateToExample(exampleNumber: number) {
    await super.navigate(`/dynamic_loading/${exampleNumber}`);
  }

  async clickStart() {
    await this.startButton.click();
  }

  async waitForLoading() {
    await this.loadingIndicator.waitFor({ state: 'visible' });
    await this.loadingIndicator.waitFor({ state: 'hidden' });
  }

  async verifyElementPresent() {
    await expect(this.hiddenElement).toBeVisible();
    await expect(this.hiddenElement).toHaveText('Hello World!');
  }
}
