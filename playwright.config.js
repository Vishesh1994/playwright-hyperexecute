require('dotenv').config();
const { defineConfig } = require('@playwright/test');

// Map OS names to LambdaTest HyperExecute platforms
const osMap = {
  Windows: 'win10',
  Linux: 'ubuntu-20'
};

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: 3,
  timeout: 120 * 1000, 

  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]],

  use: {
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',   
    headless: true,
    viewport: { width: 1280, height: 720 },
  },

  projects: [
    // HyperExecute Windows Chrome
    {
      name: 'Chrome-Windows',
      use: {
        browserName: 'chromium',       // must be 'chromium' locally
        channel: 'chrome',              
        connectOptions: {
          wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify({
            browserName: 'chrome',
            browserVersion: 'latest',
            'LT:Options': {
              platform: osMap['Windows'],
              build: 'Playwright HyperExecute Build',
              name: 'Chrome Windows Test',
              user: process.env.LT_USERNAME,
              accessKey: process.env.LT_ACCESS_KEY,
              video: true,
              screenshot: true
            }
          }))}`
        }
      }
    },

    // HyperExecute Linux Chrome
    {
      name: 'Chrome-Linux',
      use: {
        browserName: 'chromium',       
        channel: 'chrome',              
        connectOptions: {
          wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify({
            browserName: 'chrome',
            browserVersion: 'latest',
            'LT:Options': {
              platform: osMap['Linux'],
              build: 'Playwright HyperExecute Build',
              name: 'Chrome Linux Test',
              user: process.env.LT_USERNAME,
              accessKey: process.env.LT_ACCESS_KEY,
              video: true,
              screenshot: true
            }
          }))}`
        }
      }
    }
  ]
});