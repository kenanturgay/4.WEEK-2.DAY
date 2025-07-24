(($) => {
  "use strict";

  const classes = {
    style: "custom-style",
    wrapper: "custom-wrapper",
    userCard: "user-card",
    errorBox: "error-box",
  };

  const selectors = {
    style: `.${classes.style}`,
    wrapper: `.${classes.wrapper}`,
    userCard: `.${classes.userCard}`,
    appendLocation: ".ins-api-users",
    errorBox: `.${classes.errorBox}`,
  };

  const self = {
    users: [],
  };

  self.init = () => {
    self.buildCSS();
    // Check if users are already stored in localStorage after the page loads
    self.fetchData().then(self.buildHTML);
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
            flex-wrap: wrap;
            gap: 20px;
            width: clamp(200px, 100%, 900px);
            height: clamp(200px, 100%, 600px);
            border: 1px solid var(--border-color);
            border-radius: var(--border-radius);
            padding: 20px;
            box-sizing: border-box;
        }
        .${classes.userCard} {
          background-color: white;
          border: 1px solid var(--border-color);
          border-radius: var(--border-radius);
          padding: 15px;
          margin: 10px;
          width: 400px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s;
          cursor: pointer;
        }
        .${classes.userCard}:hover {
          transform: scale(1.02);
        }
        
        .${selectors.errorBox} {
          color: red;
          font-weight: bold;
          padding: 10px;
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
      self.saveToStorage(); // Save users to localStorage
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
    console.log("Users saved to localStorage");
  };

  self.buildHTML = () => {
    const html = $(`<div class="${classes.wrapper}"></div>`);

    if (self.users.length === 0) {
      html.append(`<div class="${classes.errorBox}">Users not found</div>`);
    }

    self.users.forEach((user) => {
      const userHTML = `
        <div class="${classes.userCard}">
          <h2>${user.name}</h2>
          <p>Email: ${user.email}</p>
          <p>Phone: ${user.phone}</p>
          <p>Website: ${user.website}</p>
        </div>
      `;
      html.append(userHTML);
    });

    $(selectors.appendLocation).append(html);
  };

  $(document).ready(self.init);
})(jQuery);
