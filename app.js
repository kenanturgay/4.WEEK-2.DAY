(($) => {
  "use strict";

  const classes = {
    style: "custom-style",
    wrapper: "custom-wrapper",
    userCard: "user-card",
    deleteBtn: "delete-btn",
    errorBox: "error-box",
  };

  const selectors = {
    style: `.${classes.style}`,
    wrapper: `.${classes.wrapper}`,
    userCard: `.${classes.userCard}`,
    deleteBtn: `.${classes.deleteBtn}`,
    errorBox: `.${classes.errorBox}`,
    appendLocation: ".ins-api-users",
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
    const styleHTML = `
      <style class="${classes.style}">
        :root {
          --main-color: #4CAF50;
          --text-color: #1ada2aff;
          --background-color1: #3708f3ff;
          --background-color2: rgba(23, 201, 35, 1);
          --button-color: #f805056f;
          --button-hover-color: #ff0000ff;
          --border-radius: 6px;
          --border-color: #40fca4ff;
          --font-size: 16px;
          --font-family: Arial, sans-serif;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: var(--font-family);
          font-size: var(--font-size);
          color: var(--text-color);
          background: linear-gradient(90deg, var(--background-color1), var(--background-color2));
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }

        .ins-api-users {
          width: 100%;
          padding: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .${classes.wrapper} {
          display: flex;
          flex-direction: row;
          justify-content: center;
          flex-wrap: wrap;
          gap: 20px;
          width: clamp(200px, 100%, 900px);
          max-height: 600px;
          overflow-y: auto;
          padding: 20px;

          background: linear-gradient(130deg, var(--background-color2), var(--background-color1));
          border: 1px solid var(--border-color);
          border-radius: var(--border-radius);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

        .${classes.userCard} {
            background: linear-gradient(135deg, #89c8ffff, #56fce0ff); /* Hafif mavi geçişli arka plan */
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            color: #333;
            border: 1px solid var(--border-color);
            border-radius: var(--border-radius);
            padding: 15px;
            width: 300px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            position: relative;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
}

        .${classes.userCard}:hover {
            transform: scale(1.02);
            box-shadow: 0 0px 16px rgba(255, 0, 0, 1);
          }

          .${classes.userCard} h3 {
            font-size: 20px;
            margin-bottom: 8px;
            color: #2c3e50;
          }

          .${classes.userCard} p {
            font-size: 15px;
            line-height: 1.5;
            color: #444;
            margin-bottom: 5px;
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
        }

        .${classes.errorBox} {
          color: red;
          font-weight: bold;
          padding: 10px;
        }
      </style>
    `;
    $("head").append(styleHTML);
  };

  self.loadFromStorage = () => {
    const storedUsers = localStorage.getItem(self.storageKey);
    const storedTime = localStorage.getItem(self.storageTimeKey);
    const now = new Date().getTime();

    if (storedUsers && storedTime && now - storedTime < 86) {
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
      console.error("Fetch Error:", err);
      const errorBox = `<div class="${classes.errorBox}">When fetching data: ${err.message}</div>`;
      $(selectors.appendLocation).html(errorBox);
    }
  };

  self.saveToStorage = () => {
    localStorage.setItem(self.storageKey, JSON.stringify(self.users));
    localStorage.setItem(self.storageTimeKey, new Date().getTime());
  };

  self.buildHTML = () => {

    
    const container = $(`<div class="${classes.wrapper}"></div>`);

    if (self.users.length === 0) {
      container.append(
        `<div class="${classes.errorBox}">Users not found</div>`
      );
    }

    self.users.forEach((user) => {
      const userHTML = $(`
        <div class="${classes.userCard}" data-id="${user.id}">
          <button class="${classes.deleteBtn}">Delete</button>
          <h3>${user.name}</h3>
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>Adress:</strong> ${user.address.street}, ${user.address.city}</p>
          <p><strong>Phone:</strong> ${user.phone}</p>
          <p><strong>Website:</strong> ${user.website}</p>
        </div>
      `);
      container.append(userHTML);
    });

    $(selectors.appendLocation).html(container);
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
