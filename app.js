(($) => {
  "use strict";

  const classes = {
    style: "custom-style",
    wrapper: "custom-wrapper",
    container: "custom-container",
  };

  const selectors = {
    style: `.${classes.style}`,
    wrapper: `.${classes.wrapper}`,
    container: `.${classes.container}`,
    appendLocation: ".ins-api-users",
  };

  const self = {
    users: [],
  };

  self.init = () => {
    self.buildCSS();
    self.buildHTML();
    self.fetchData();
  };

  self.buildCSS = () => {
    const customStyle = `
      <style class="${classes.style}">

        /* root variables for the app to use them globally in the app css */
        :root {
            --main-color: #4CAF50; /* Main color for the app */
            --text-color: #1ada2aff; /* Text color */
            --background-color1: #3708f3ff; /* Background color */
            --background-color2:rgba(23, 201, 35, 1);
            --button-color: #4CAF50; /* Button color */
            --button-hover-color: #45a049; /* Button hover color */
            --border-radius: 5px; /* Border radius for buttons */
            --border-color: #40fca4ff; /* Border color for elements */
        }

        /* * is a universal selector that targets all elements on the page */

        *{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        /* This is the body style */

        body {
            font-family: Arial, sans-serif;
            color: var(--text-color);
            background:linear-gradient(90deg,var(--background-color1), var(--background-color2));
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            box-sizing: border-box;

        }

        .ins-api-users {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            background: linear-gradient(90deg, var(--background-color1), var(--background-color2));
            padding: 20px;
            box-sizing: border-box;
        }


        /* This is the wrapper style */
        .${classes.wrapper} {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: clamp(200px, 100%, 900px);
            height: clamp(200px, 100%, 600px);
            border: 1px solid var(--border-color);
            border-radius: var(--border-radius);
            padding: 20px;
            box-sizing: border-box;
        }
        

      </style>
    `;
    $("head").append(customStyle);
  };

  self.fetchData = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );

      if (!response.ok) throw new Error("Sunucu hatası!");

      const data = await response.json();
      self.users = data; // Store the fetched users in the self.users array
      if (data) {
        console.log(self.users);
        return;
      }
    } catch (error) {
      console.error("Fetch Hatası:", error);
    }
  };

  self.saveToStorage = () => {
    localStorage.setItem("users", JSON.stringify(self.users));
  };

  self.buildHTML = () => {
    const html = `<div class="${classes.wrapper}"><div class="${classes.container}">Hello</div></div>`;

    $(selectors.appendLocation).append(html);
  };

  $(document).ready(self.init);
})(jQuery);
