
import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckboxesPage extends BasePage {
  // Locators
  private checkboxes = this.page.locator('input[type="checkbox"]');

  constructor(page: Page) {
    super(page);
  }

  async navigate() {
    await super.navigate('/checkboxes');
  }

  async toggleCheckbox(index: number) {
    await this.checkboxes.nth(index - 1).click();
  }

  async verifyCheckboxState(index: number, expectedState: boolean) {
    const isChecked = await this.checkboxes.nth(index - 1).isChecked();
    expect(isChecked).toBe(expectedState);
  }
}
