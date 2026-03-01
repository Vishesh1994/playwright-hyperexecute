require('dotenv').config();
const { test, expect } = require('@playwright/test');

test('TestMu AI Simple Form Demo Test', async ({ page }) => {

    // Environment variables
    const messageText = process.env.MESSAGE;
    const url = process.env.TEST_URL;

    // Open Selenium Playground
    await page.goto(url);

    // Click Simple Form Demo
    await page.getByText('Simple Form Demo').click();

    // Validate URL
    await expect(page).toHaveURL(/simple-form-demo/);

    // Enter some message
    const inputBox = page.locator('input#user-message');

    await inputBox.fill(process.env.MESSAGE);

    // Click on Get checked value button
    await page.locator('#showInput').click();

    // Validate output message
    await expect(inputBox).toHaveValue(messageText);

});