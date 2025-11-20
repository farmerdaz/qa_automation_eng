// pages/CheckoutPage.ts
import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export interface CheckoutInfo {
  firstName: string;
  lastName: string;
  postalCode: string;
}

export class CheckoutPage extends BasePage {
  // Locators - Step One (Information)
  private readonly firstNameInput = '[data-test="firstName"]';
  private readonly lastNameInput = '[data-test="lastName"]';
  private readonly postalCodeInput = '[data-test="postalCode"]';
  private readonly continueButton = '[data-test="continue"]';
  private readonly cancelButton = '[data-test="cancel"]';

  // Locators - Step Two (Overview)
  private readonly summarySubtotalLabel = '.summary_subtotal_label';
  private readonly summaryTaxLabel = '.summary_tax_label';
  private readonly summaryTotalLabel = '.summary_total_label';
  private readonly finishButton = '[data-test="finish"]';

  // Actions - Step One
  async fillCheckoutInformation(checkoutInfo: CheckoutInfo): Promise<void> {
    await this.fill(this.firstNameInput, checkoutInfo.firstName);
    await this.fill(this.lastNameInput, checkoutInfo.lastName);
    await this.fill(this.postalCodeInput, checkoutInfo.postalCode);
  }

  async continueToOverview(): Promise<void> {
    await this.click(this.continueButton);
  }

  async cancelCheckout(): Promise<void> {
    await this.click(this.cancelButton);
  }

  // Actions - Step Two
  async finishCheckout(): Promise<void> {
    await this.click(this.finishButton);
  }

  // Getters
  async getSubtotalAmount(): Promise<number> {
    const subtotalText = await this.getElementText(this.summarySubtotalLabel);
    if (!subtotalText) throw new Error('Subtotal not found');
    
    const match = subtotalText.match(/\$(\d+\.?\d*)/);
    if (!match) throw new Error('Could not parse subtotal amount');
    
    return parseFloat(match[1]);
  }

  async getTaxAmount(): Promise<number> {
    const taxText = await this.getElementText(this.summaryTaxLabel);
    if (!taxText) throw new Error('Tax amount not found');
    
    const match = taxText.match(/\$(\d+\.?\d*)/);
    if (!match) throw new Error('Could not parse tax amount');
    
    return parseFloat(match[1]);
  }

  async getTotalAmount(): Promise<number> {
    const totalText = await this.getElementText(this.summaryTotalLabel);
    if (!totalText) throw new Error('Total amount not found');
    
    const match = totalText.match(/\$(\d+\.?\d*)/);
    if (!match) throw new Error('Could not parse total amount');
    
    return parseFloat(match[1]);
  }

  // Assertions
  async verifySubtotalAmount(expectedAmount: number): Promise<void> {
    const actualAmount = await this.getSubtotalAmount();
    expect(actualAmount).toBeCloseTo(expectedAmount, 2);
  }

  async verifyTotalCalculation(): Promise<void> {
    const subtotal = await this.getSubtotalAmount();
    const tax = await this.getTaxAmount();
    const total = await this.getTotalAmount();
    
    expect(total).toBeCloseTo(subtotal + tax, 2);
  }
}

export class CheckoutCompletePage extends BasePage {
  // Locators
  private readonly completeHeader = '.complete-header';
  private readonly completeText = '.complete-text';
  private readonly backHomeButton = '[data-test="back-to-products"]';

  // Actions
  async backToProducts(): Promise<void> {
    await this.click(this.backHomeButton);
  }

  // Assertions
  async verifyOrderComplete(): Promise<void> {
    await expect(this.page.locator(this.completeHeader)).toHaveText('Thank you for your order!');
  }

  async verifyCompletionMessage(expectedMessage: string): Promise<void> {
    await expect(this.page.locator(this.completeText)).toHaveText(expectedMessage);
  }
}
