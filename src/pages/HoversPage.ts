
import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class HoversPage extends BasePage {
  // Locators
  private userAvatar = (index: number) => this.page.locator(`.figure:nth-child(${index})`);
  private userInfo = (index: number) => this.page.locator(`.figure:nth-child(${index}) .figcaption`);

  constructor(page: Page) {
    super(page);
  }

  async navigate() {
    await super.navigate('/hovers');
  }

  async hoverOverUser(index: number) {
    await this.userAvatar(index).hover();
  }

  async verifyUserInfoVisible(index: number, shouldBeVisible: boolean) {
    if (shouldBeVisible) {
      await expect(this.userInfo(index)).toBeVisible();
      await expect(this.userInfo(index)).toContainText(`name: user${index}`);
    } else {
      await expect(this.userInfo(index)).not.toBeVisible();
    }
  }
}
