// pages/PageFactory.ts
import { Page } from '@playwright/test';
import { LoginPage } from './LoginPage';
import { InventoryPage } from './InventoryPage';
import { CartPage } from './CartPage';
import { CheckoutPage, CheckoutCompletePage } from './CheckoutPage';
import { ProductDetailsPage } from './ProductDetailsPage';

export class PageFactory {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  getLoginPage(): LoginPage {
    return new LoginPage(this.page);
  }

  getInventoryPage(): InventoryPage {
    return new InventoryPage(this.page);
  }

  getCartPage(): CartPage {
    return new CartPage(this.page);
  }

  getCheckoutPage(): CheckoutPage {
    return new CheckoutPage(this.page);
  }

  getCheckoutCompletePage(): CheckoutCompletePage {
    return new CheckoutCompletePage(this.page);
  }

  getProductDetailsPage(): ProductDetailsPage {
    return new ProductDetailsPage(this.page);
  }

}
