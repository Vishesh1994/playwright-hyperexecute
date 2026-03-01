require('dotenv').config();
const { test, expect } = require('@playwright/test');

test('Drag Slider TestMu AI', async ({ page }) => {

    const url = process.env.TEST_URL;

    // Open Selenium Playground
    await page.goto(url);

    // Click Drag & Drop Sliders
    await page.getByText('Drag & Drop Sliders').click();

    // Locate slider
    const slider = page.locator("input[value='15']");
    const rangeValue = page.locator('#rangeSuccess');

    await slider.waitFor();

    // Move slider to 95 
    for (let i = 0; i < 120; i++) {

        const value = await rangeValue.textContent();

        if (value === '95')
            break;

        await slider.press('ArrowRight');

    }

    // Validate value
    await expect(rangeValue).toHaveText('95');

});