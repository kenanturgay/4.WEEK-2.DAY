(($) => {
  "use strict";

  const classes = {
    style: "custom-style",
    wrapper: "custom-wrapper",
    userCard: "user-card",
    errorBox: "error-box",
    deleteBtn: "delete-btn",
  };

  const selectors = {
    style: `.${classes.style}`,
    wrapper: `.${classes.wrapper}`,
    userCard: `.${classes.userCard}`,
    appendLocation: ".ins-api-users",
    errorBox: `.${classes.errorBox}`,
    deleteBtn: `.${classes.deleteBtn}`,
  };

  const self = {
    users: [],
    storageKey: "users",
    storageTimeKey: "usersTime",
  };

  self.init = () => {
    self.buildCSS();

    self.loadFromStorage();
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
            --button-color: #f63e1eff; /* Button color */
            --button-hover-color: #ff0000ff; /* Button hover color */
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
          flex-direction: row;
          flex-wrap: wrap;
          gap: 20px;
          width: clamp(200px, 100%, 900px);
          
          overflow-y: auto;
          padding: 20px ;
          border: 1px solid var(--border-color);
          border-radius: var(--border-radius);
          background: white;
        }
        .${classes.userCard} {
          background-color: #fff;
          border: 1px solid var(--border-color);
          border-radius: var(--border-radius);
          padding: 15px;
          width: 300px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          position: relative;
        }
        .${classes.userCard}:hover {
          transform: scale(1.02);
        }
        
        .${selectors.errorBox} {
          color: red;
          font-weight: bold;
          padding: 10px;
        }

        .${classes.deleteBtn} {
          position: absolute;
          top: 10px;
          right: 10px;
          background-color: var(--button-color);
          color: white;
          border: none;
          padding: 5px 10px;
          border-radius: var(--border-radius);
          cursor: pointer;
        }

        .${classes.deleteBtn}:hover {
          background-color: var(--button-hover-color);
          
          scale: 1.15;
        }
        

      </style>
    `;
    $("head").append(customStyle);
  };

  self.loadFromStorage = () => {
    const storedUsers = localStorage.getItem(self.storageKey);
    const storedTime = localStorage.getItem(self.storageTimeKey);
    const now = new Date().getTime();

    if (storedUsers && storedTime && now - storedTime < 86400000) {
      self.users = JSON.parse(storedUsers);
      self.buildHTML();
    } else {
      self.fetchData();
    }
  };

  self.fetchData = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      if (!response.ok) throw new Error("Sunucu hatası!");

      const data = await response.json();
      self.users = data;
      self.saveToStorage();
      self.buildHTML();
    } catch (err) {
      console.error("Fetch Hatası:", err);
      const errorBox = `<div class="${classes.errorBox}">Veri çekilirken bir hata oluştu!</div>`;
      $(selectors.appendLocation).html(errorBox);
    }
  };

  self.saveToStorage = () => {
    localStorage.setItem(self.storageKey, JSON.stringify(self.users));
    localStorage.setItem(self.storageTimeKey, new Date().getTime());
  };

  self.buildHTML = () => {
    const html = $(`<div class="${classes.wrapper}"></div>`);

    if (self.users.length === 0) {
      html.append(`<div class="${classes.errorBox}">Users not found</div>`);
    }

    self.users.forEach((user) => {
      const userHTML = `
        <div class="${classes.userCard}">
        <button class="${classes.deleteBtn}">Sil</button>
          <h2>${user.name}</h2>
          <p>Email: ${user.email}</p>
          <p>Phone: ${user.phone}</p>
          <p>Website: ${user.website}</p>
        </div>
      `;
      html.append(userHTML);
    });

    $(selectors.appendLocation).append(html);
    self.setEvents();
  };

  self.setEvents = () => {
    $(document).on("click", selectors.deleteBtn, function () {
      const id = $(this).closest(selectors.userCard).data("id");
      self.users = self.users.filter((user) => user.id !== id);
      self.saveToStorage();
      self.buildHTML();
    });
  };

  $(document).ready(self.init);
})(jQuery);
