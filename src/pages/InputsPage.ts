
import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class InputsPage extends BasePage {
  // Locators
  private numberInput = this.page.locator('input[type="number"]');

  constructor(page: Page) {
    super(page);
  }

  async navigate() {
    await super.navigate('/inputs');
  }

  async enterNumber(value: number) {
    await this.numberInput.fill(value.toString());
  }

  async verifyInputValue(expectedValue: string) {
    await expect(this.numberInput).toHaveValue(expectedValue);
  }
}
