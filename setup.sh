#! /bin/bash

# Install dependencies
npm install

# Run tests
npx playwright install

# Install playwright-deps (only in GitHub Codespaces)
# This is a workaround to install playwright-deps on GitHub Codespaces
if [ "$CODESPACES" = "true" ]; then
    sudo mkdir -p /usr/share/keyrings
    curl -fsSL https://dl.yarnpkg.com/debian/pubkey.gpg | gpg --dearmor | sudo tee /usr/share/keyrings/yarn-archive-keyring.gpg >/dev/null
    echo "deb [signed-by=/usr/share/keyrings/yarn-archive-keyring.gpg] https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
    sudo apt update
    npx playwright install-deps
fi

# Run tests
npx playwright test

