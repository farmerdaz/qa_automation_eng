// tests/swag-labs-pom.spec.ts
import { test, expect } from '@playwright/test';
import { PageFactory } from '../pages/PageFactory';
import { TestData } from '../data/testData';

// Stub tests for interview candidates to complete with Page Object Model

test.describe('Swag Labs E2E Tests with Page Object Model', () => {
  test('Login with valid credentials', async ({ page }) => {
    const pageFactory = new PageFactory(page);
    const loginPage = pageFactory.getLoginPage();
    
    await loginPage.navigate();
    await loginPage.loginWithValidCredentials();
    await loginPage.verifyRedirectToInventory();
  });

  test('Login with invalid credentials', async ({ page }) => {
    // TODO: Implement this test. This test should login with invalid credentials and verify the user is not logged in.
    // throw new Error('Test not implemented - please implement this test as part of the interview assessment');
  });

  test('Negative test - Verify cart is empty initially', async ({ page }) => {
    // TODO: Implement this test. This test should verify the cart is empty initially.
    // throw new Error('Test not implemented - please implement this test as part of the interview assessment');
  });

  test('Happy path - Purchase a single item', async ({ page }) => {
    // TODO: Implement this test. This test should:
    // 1. Login with valid credentials
    // 2. Add a single item to the cart (e.g. Sauce Labs Backpack)
    // 3. Navigate to the cart
    // 4. Proceed to checkout
    // 5. Fill in checkout information (first name, last name, postal code)
    // 6. Complete the purchase
    // 7. Verify the order confirmation message
    // throw new Error('Test not implemented - please implement this test as part of the interview assessment');
  });
});
