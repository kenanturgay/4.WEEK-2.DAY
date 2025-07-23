/* eslint-disable */ // Turn off code checking rules (for ESLint tool)

(($) => { // Start a function that runs itself (self-invoked)

  "use strict"; // Use strict mode (show errors for bad code)

  const classes = { 
    // Here you can write class names for CSS (for example: button: "my-btn")
    
  };

  const selectors = {
    // Here you can write jQuery selectors (for example: button: ".my-btn")
    
  };

  const self = {
    // This object holds all your functions
  };

  self.init = () => {
    // This function runs when the page is ready
    // You can call other functions from here
  };

  self.reset = () => {
    // This function can reset or clean the screen
  };

  self.buildCSS = () => {
    // This function can add CSS styles to the page
    
  };

  self.buildHTML = () => {
    // This function can add HTML elements to the page
  };

  self.setEvents = () => {
    // This function adds click or change events (like button clicks)
  };

  self.fetchData = async () => {
    // This function can get data from the internet (API)
    // It is async, so it works with 'await'
  };

  self.saveToStorage = () => {
    // This function can save something to the browser (localStorage)
  };

  $(document).ready(self.init); 
  // When the page is ready, run self.init()

})(jQuery); 
// End the self-invoked function and give jQuery as '$'