# QA Automation Interview Project 🎯

This repository implements a framework for developing end to end tests for the example website https://www.saucedemo.com.

## 📋 Table of Contents


- [Prerequisites](#prerequisites)  
- [Installation & Setup](#installation--setup)
- [Project Structure](#project-structure)
- [Running Tests](#running-tests)


## 🛠️ Prerequisites

Before running this project, ensure you have:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** (for version control)

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd qa_automation_eng_practical
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Install Playwright Browsers
```bash
npx playwright install
```

### 4. Verify Installation
```bash
npx playwright --version
```

## 📁 Project Structure

```
qa-auto-interview/
├── pages/                    # Page Object Model classes
│   ├── BasePage.ts          # Base class with common functionality
│   ├── LoginPage.ts         # Login page actions & assertions
│   ├── InventoryPage.ts     # Product inventory management
│   ├── CartPage.ts          # Shopping cart functionality
│   ├── CheckoutPage.ts      # Checkout flow (steps 1-2 + completion)
│   └── PageFactory.ts       # Centralized page object creation
├── data/
│   └── testData.ts          # Test data constants & configurations
├── tests/
│   ├── swag-labs.spec.ts    # Original linear test implementation
│   └── swag-labs-pom.spec.ts # Page Object Model test implementation
├── playwright.config.ts     # Playwright configuration
├── package.json            # Project dependencies & scripts
└── README.md              # This file
```

## 🧪 Running Tests

### Run All Tests
```bash
npx playwright test
```

### Run Specific Test Files
```bash
# Run Page Object Model tests
npx playwright test tests/swag-labs-pom.spec.ts

# Run original implementation
npx playwright test tests/swag-labs.spec.ts
```

### Run Tests with UI (Visual Mode)
```bash
npx playwright test --ui
```

### Run Tests in Headed Mode (Visible Browser)
```bash
npx playwright test --headed
```

### Run Specific Test Case
```bash
npx playwright test -g "Login with valid credentials"
```

### Run Tests in Specific Browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox  
npx playwright test --project=webkit
```

### Generate Test Report
```bash
npx playwright show-report
```
