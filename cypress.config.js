const { defineConfig } = require("cypress");
const { beforeRunHook, afterRunHook } = require('cypress-mochawesome-reporter/lib');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    
    videoUploadOnPasses: true, // Ensure videos are generated for all tests
    charts: true,
    reportPageTitle: 'ToDoReports',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: true
  },
 
  env: {
    url: "https://todomvc.com/examples/react/dist/#/",
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('before:run', async (details) => {
        console.log('override before:run');
        await beforeRunHook(details);
      });

      on('after:run', async () => {
        console.log('override after:run');
        await afterRunHook();
      });
    },
  },
});
