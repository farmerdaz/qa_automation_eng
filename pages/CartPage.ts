// pages/CartPage.ts
import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  // Locators
  private readonly cartItems = '.cart_item';
  private readonly checkoutButton = '[data-test="checkout"]';
  private readonly continueShoppingButton = '[data-test="continue-shopping"]';
  private readonly removeButtons = '.cart_button';

  // Actions
  async proceedToCheckout(): Promise<void> {
    await this.click(this.checkoutButton);
  }

  async continueShopping(): Promise<void> {
    await this.click(this.continueShoppingButton);
  }

  async removeItem(itemIndex: number): Promise<void> {
    const removeButtons = this.page.locator(this.removeButtons);
    await removeButtons.nth(itemIndex).click();
  }

  // Getters
  async getCartItemCount(): Promise<number> {
    return await this.getElementCount(this.cartItems);
  }

  async getCartItemNames(): Promise<string[]> {
    const items = this.page.locator('.inventory_item_name');
    const count = await items.count();
    const names: string[] = [];
    
    for (let i = 0; i < count; i++) {
      const name = await items.nth(i).textContent();
      if (name) names.push(name);
    }
    
    return names;
  }

  // Assertions
  async verifyOnCartPage(): Promise<void> {
    await expect(this.page).toHaveURL(/cart/);
  }

  async verifyCartItemCount(expectedCount: number): Promise<void> {
    const actualCount = await this.getCartItemCount();
    expect(actualCount).toBe(expectedCount);
  }

  async verifyCartContainsItems(expectedItems: string[]): Promise<void> {
    const actualItems = await this.getCartItemNames();
    for (const expectedItem of expectedItems) {
      expect(actualItems).toContain(expectedItem);
    }
  }
}
