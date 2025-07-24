# User Cards Project

This project shows user cards on a web page. It uses JavaScript and jQuery.  
The code is written inside a **self-invoked function** to keep it clean and organized.

## How It Works

- When you open the page, it gets user data from an online source (API).
- It shows user cards inside a container with the class `.ins-api-users`.
- Each card has a **Delete** button to remove the user.
- You can click on a card to open a popup with user details.
- The popup has a blurred background and shows the selected user in a larger view.
- If you click outside the popup or click the Delete button inside it, the popup closes.
- The user data is saved in your browser (localStorage) for one day. This helps the page load faster next time.

## Features

- Clean design using CSS variables (`:root`) for easy color and style changes.
- Popup window with a smooth blurred background.
- You can delete users. The list updates right away.
- Saved user data in localStorage for 24 hours.
- User links (like website and email) are clickable inside the cards.

## Git Workflow Used

This project uses a Git-based workflow:

- Each feature (like popup, localStorage, etc.) is created in a separate branch.
- Changes are committed clearly and step by step.
- The main branch always has the clean and working version.
- It is easy to test, fix bugs, or remove any broken feature without hurting the project.

This makes the project more professional and safer to develop.

## How To Use

1. Open the `index.html` file in your web browser.
2. Wait for the user list to load from the API.
3. Click any user card to open the popup.
4. Click the **Delete** button to remove a user.
5. Click outside the popup to close it.

## Technologies

- JavaScript (ES6+)
- jQuery 3.x
- HTML & CSS
- LocalStorage API

## Notes

- You need an internet connection to load the user data from the online API.
- The saved users will be deleted automatically after 1 day.

