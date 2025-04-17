// const { defineConfig } = require("cypress");

// module.exports = defineConfig({
//   e2e: {
//     setupNodeEvents(on, config) {
//       // implement node event listeners here
//     },
//   },
// });
import { defineConfig } from 'cypress'
export default defineConfig({
  e2e: {
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
    },
    supportFile: 'cypress/support/e2e.js',
    specPattern: ['test/**/*.cy.{js,jsx,ts,tsx}'],
    pageLoadTimeout: 60000,
    env: {
      testURL: 'http://44.204.239.34:5000'
    }
  }
})