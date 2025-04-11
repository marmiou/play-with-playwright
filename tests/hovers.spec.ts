
import { test, expect } from '@playwright/test';
import { HoversPage } from '../src/pages/HoversPage';

test.describe('Hover functionality', () => {
  test('should display user information on hover', async ({ page }) => {
    const hoversPage = new HoversPage(page);
    await hoversPage.navigate();
    
    // Test hover on first user
    await hoversPage.hoverOverUser(1);
    await hoversPage.verifyUserInfoVisible(1, true);
    
    // Move away and verify info is hidden
    await page.mouse.move(0, 0);
    await hoversPage.verifyUserInfoVisible(1, false);
    
    // Test hover on second user
    await hoversPage.hoverOverUser(2);
    await hoversPage.verifyUserInfoVisible(2, true);
    
    // Test hover on third user
    await hoversPage.hoverOverUser(3);
    await hoversPage.verifyUserInfoVisible(3, true);
  });
});
