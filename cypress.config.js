const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  env: {
    baseUrl: "https://docs.google.com/forms/d/e/1FAIpQLSe-K-EdIVtFdhM-CoGB5XIJ7hy7DAc14V2SXzEig1HkzyeJgQ/viewform"
  }
  
});
