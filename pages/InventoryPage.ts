// pages/InventoryPage.ts
import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  // Locators
  private readonly cartIcon = '.shopping_cart_link';
  private readonly cartBadge = '.shopping_cart_badge';
  
  // Product-specific locators
  private readonly backpackAddButton = '[data-test="add-to-cart-sauce-labs-backpack"]';
  private readonly bikeLightAddButton = '[data-test="add-to-cart-sauce-labs-bike-light"]';
  private readonly backpackRemoveButton = '[data-test="remove-sauce-labs-backpack"]';
  private readonly bikeLightRemoveButton = '[data-test="remove-sauce-labs-bike-light"]';

  // Dynamic locator methods
  private getAddToCartButton(productName: string): string {
    return `[data-test="add-to-cart-${productName}"]`;
  }

  private getRemoveButton(productName: string): string {
    return `[data-test="remove-${productName}"]`;
  }

  // Actions
  async addProductToCart(productName: string): Promise<void> {
    await this.click(this.getAddToCartButton(productName));
  }

  async addBackpackToCart(): Promise<void> {
    await this.click(this.backpackAddButton);
  }

  async addBikeLightToCart(): Promise<void> {
    await this.click(this.bikeLightAddButton);
  }

  async addMultipleProductsToCart(productNames: string[]): Promise<void> {
    for (const productName of productNames) {
      await this.addProductToCart(productName);
    }
  }

  async removeProductFromCart(productName: string): Promise<void> {
    await this.click(this.getRemoveButton(productName));
  }

  async goToCart(): Promise<void> {
    await this.click(this.cartIcon);
  }

  // Getters
  async getCartItemCount(): Promise<number> {
    // Check if cart badge exists (only appears when there are items)
    const cartBadgeExists = await this.page.locator(this.cartBadge).count() > 0;
    
    if (!cartBadgeExists) {
      return 0; // No badge means empty cart
    }
    
    const cartBadgeText = await this.getElementText(this.cartBadge);
    return cartBadgeText ? parseInt(cartBadgeText) : 0;
  }

  // A flawed implementation of the getCartItemCount method that crashes when the cart is empty.
  // async getCartItemCount(): Promise<number> {
  //   const cartBadgeText = await this.getElementText(this.cartBadge);
  //   return parseInt(cartBadgeText); // Bug: crashes when cart is empty
  // }

  // Assertions
  async verifyCartItemCount(expectedCount: number): Promise<void> {
    const actualCount = await this.getCartItemCount();
    expect(actualCount).toBe(expectedCount);
  }

  async verifyOnInventoryPage(): Promise<void> {
    await expect(this.page).toHaveURL(/inventory/);
  }

  // Interview question: Implement flexible product selection
  async addProductToCartByName(productName: string): Promise<void> {
    // TODO: Implement flexible product selection
    // Consider: case sensitivity, partial matches, error states
  }
}
