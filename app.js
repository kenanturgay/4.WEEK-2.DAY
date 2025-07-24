(($) => {
  "use strict";

  const classes = {
    style: "custom-style",
    wrapper: "custom-wrapper",
    userCard: "user-card",
    deleteBtn: "delete-btn",
    errorBox: "error-box",
    popup: "popup-overlay",
    popupBox: "popup-box",
    usersTitle: "users-title",
  };

  const selectors = {
    style: `.${classes.style}`,
    wrapper: `.${classes.wrapper}`,
    userCard: `.${classes.userCard}`,
    deleteBtn: `.${classes.deleteBtn}`,
    errorBox: `.${classes.errorBox}`,
    popup: `.${classes.popup}`,
    popupBox: `.${classes.popupBox}`,
    usersTitle: `.${classes.usersTitle}`,
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
        /* Colors */
        --color-primary: #4CAF50;
        --color-text: #1ada2a;
        --color-bg-start: #3708f3;
        --color-bg-end: #17c923;
        --color-btn: #f80505af;
        --color-btn-hover: #ff0000;
        --color-border: #40fca4;
        --color-card-start: #89c8ff;
        --color-card-end: #56fce0;
        --color-heading: #2c3e50;
        --color-paragraph: #444;
        --color-error: red;
        --color-shadow: rgba(0, 0, 0, 0.05);
        --color-card-hover-shadow: rgba(255, 0, 0, 1);

        /* Typography */
        --font-size-base: 16px;
        --font-size-heading: 20px;
        --font-size-paragraph: 15px;
        --font-family-base: Arial, sans-serif;
        --font-family-cards: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

        /* Layout & Radius */
        --radius: 6px;

        /* Effects */
        --transition-default: 0.2s ease;
        --box-shadow-light: 0 4px 12px var(--color-shadow);
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: var(--font-family-base);
          font-size: var(--font-size-base);
          color: var(--color-text);
          background: linear-gradient(90deg, var(--color-bg-start), var(--color-bg-end));
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
          flex-direction: column;
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

          background: linear-gradient(130deg, var(--color-bg-end), var(--color-bg-start));
          border: 1px solid var(--color-border);
          border-radius: var(--radius);
          box-shadow: var(--box-shadow-light);
        }

        .${classes.userCard} {
          background: linear-gradient(135deg, var(--color-card-start), var(--color-card-end));
          font-family: var(--font-family-cards);
          color: #333;
          border: 1px solid var(--color-border);
          border-radius: var(--radius);
          padding: 15px;
          width: 300px;
          box-shadow: var(--box-shadow-light);
          position: relative;
          transition: transform var(--transition-default), box-shadow var(--transition-default);
        }

        .${classes.userCard}:hover {
          transform: scale(1.02);
          box-shadow: 0 0 16px var(--color-card-hover-shadow);
        }

        .${classes.userCard} h3 {
          font-size: var(--font-size-heading);
          margin-bottom: 8px;
          color: var(--color-heading);
        }

        .${classes.userCard} p {
          font-size: var(--font-size-paragraph);
          line-height: 1.5;
          color: var(--color-paragraph);
          margin-bottom: 5px;
        }

        .${classes.deleteBtn} {
          position: absolute;
          top: 10px;
          right: 10px;
          background-color: var(--color-btn);
          color: white;
          border: none;
          padding: 5px 10px;
          border-radius: var(--radius);
          cursor: pointer;
        }

        .${classes.deleteBtn}:hover {
          background-color: var(--color-btn-hover);
        }

        .${classes.errorBox} {
          color: var(--color-error);
          font-weight: bold;
          padding: 10px;
        }

        .${classes.popup} {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(8px);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 999;
      }

      .${classes.popupBox} {
        background: white;
        padding: 25px;
        border-radius: var(--radius);
        box-shadow: 0 0 20px rgba(0,0,0,0.2);
        transform: scale(1.05);
        transition: transform var(--transition-default);
        position: relative;
      }

      .${classes.usersTitle}{
      
        width: 100%;
        text-align: center;
        margin-bottom: 20px;
        color: var(--color-text);
        font-family: var(--font-family-base);
      }
      </style>

    `;
    $("head").append(styleHTML);
    document.title = "Users";

    // Add favicon
    if (!$("link[rel='icon']").length) {
      const favicon = document.createElement("link");
      favicon.rel = "icon";
      favicon.href = "https://cdn-icons-png.flaticon.com/512/747/747376.png";
      favicon.type = "image/png";
      document.head.appendChild(favicon);
    }
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

    const title = $(`<h1 class="${classes.usersTitle}">Users</h1>`);

    $(selectors.appendLocation).html("");
    $(selectors.appendLocation).append(title, container);

    self.setEvents();
  };

  self.setEvents = () => {
    // 1. Sil butonu olayı
    $(document).on("click", selectors.deleteBtn, function () {
      const id = $(this).closest(selectors.userCard).data("id");
      self.users = self.users.filter((user) => user.id !== id);
      self.saveToStorage();
      self.buildHTML();

      // Popup varsa kapat
      $(`.${classes.popup}`).remove();
    });

    // 2. Kart tıklanınca popup oluştur
    $(selectors.userCard).on("click", function (e) {
      if ($(e.target).is(selectors.deleteBtn)) return; // Sil butonuna tıklanmışsa popup açma

      const clone = $(this).clone();
      const overlay = $(`
      <div class="${classes.popup}">
        <div class="${classes.popupBox}"></div>
      </div>
    `);

      overlay.find(`.${classes.popupBox}`).append(clone);
      $("body").append(overlay);
    });

    // 3. Popup arka plana tıklanınca kapanır
    $(document).on("click", `.${classes.popup}`, function (e) {
      if ($(e.target).hasClass(classes.popup)) {
        $(this).remove();
      }
    });
  };

  $(document).ready(self.init);
})(jQuery);
