const { test, expect } = require('@playwright/test');

test('Input Form Submit Test', async ({ page }) => {

    // 1. Open Selenium Playground
    await page.goto(process.env.TEST_URL);

    // Wait for page to load properly
    await page.waitForLoadState('domcontentloaded');

    // Click "Input Form Submit"
    await page.getByRole('link', { name: 'Input Form Submit' }).click();

    // Click Submit without filling form
    await page.getByRole('button', { name: 'Submit' }).click();

    // Assert validation message (stable way)
    const validationMessage = await page.locator('#name')
        .evaluate(el => el.validationMessage);

    expect(validationMessage).toContain('Please fill out');

    // Fill the form fields
    await page.fill('#name', 'John Doe');
    await page.fill('#inputEmail4', 'john@test.com');
    await page.fill('#inputPassword4', 'Password123');
    await page.fill('#company', 'TestMu');
    await page.fill('#websitename', 'www.test.com');

    await page.selectOption('select[name="country"]', {
        label: 'United States'
    });

    await page.fill('#inputCity', 'New York');
    await page.fill('#inputAddress1', 'Street 1');
    await page.fill('#inputAddress2', 'Apartment 10');
    await page.fill('#inputState', 'NY');
    await page.fill('#inputZip', '10001');

    // Click Submit
    await page.getByRole('button', { name: 'Submit' }).click();

    // Wait for success message to appear and validate text
    const successText = 'Thanks for contacting us, we will get back to you shortly.';
    const successMessage = page.locator('xpath=//p[text()="Thanks for contacting us, we will get back to you shortly."]');

    await expect(successMessage).toHaveText(successText);
});