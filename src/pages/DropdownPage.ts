
import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class DropdownPage extends BasePage {
  // Locators
  private dropdown = this.page.locator('#dropdown');

  constructor(page: Page) {
    super(page);
  }

  async navigate() {
    await super.navigate('/dropdown');
  }

  async selectOption(optionText: string) {
    await this.dropdown.selectOption({ label: optionText });
  }

  async verifySelectedOption(expectedOption: string) {
    const selectedOption = await this.dropdown.evaluate((el) => {
      const select = el as HTMLSelectElement;
      return select.options[select.selectedIndex].text;
    });
    expect(selectedOption).toBe(expectedOption);
  }
}
