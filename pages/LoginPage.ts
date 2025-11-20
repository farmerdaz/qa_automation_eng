// pages/LoginPage.ts
import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  // Locators
  private readonly usernameInput = '[data-test="username"]';
  private readonly passwordInput = '[data-test="password"]';
  private readonly loginButton = '[data-test="login-button"]';
  private readonly errorMessage = '[data-test="error"]';

  // Actions
  async navigate(): Promise<void> {
    await this.navigateTo('https://www.saucedemo.com/');
  }

  async login(username: string, password: string): Promise<void> {
    await this.fill(this.usernameInput, username);
    await this.fill(this.passwordInput, password);
    await this.click(this.loginButton);
  }

  async loginWithValidCredentials(): Promise<void> {
    await this.login('standard_user', 'secret_sauce');
  }

  // Assertions
  async verifyLoginError(expectedError: string): Promise<void> {
    const errorText = await this.getElementText(this.errorMessage);
    expect(errorText).toContain(expectedError);
  }

  async verifyRedirectToInventory(): Promise<void> {
    await expect(this.page).toHaveURL(/inventory/);
  }
}
