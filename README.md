# User Cards Project

This project shows user cards on a web page. It uses JavaScript and jQuery.  
The project uses a **self-invoked function** to keep the code clean and organized.  

## How It Works

- When you open the page, it gets user data from an online source (API).  
- It shows user cards inside a box with the class `.ins-api-users`.  
- Each card has a **Delete** button to remove the user.  
- You can click on a card to open a popup with user details.  
- The popup has a blurred background and shows the selected user card bigger.  
- If you click outside the popup or the Delete button inside the popup, the popup closes.  
- The data is saved in your browser storage (localStorage) for faster loading next time.

## Features

- Clean design with CSS variables for easy color and style changes.  
- Popup with blurred background effect.  
- Delete users with a button, and the list updates immediately.  
- Saves users in localStorage for one day.  

## How To Use

1. Open the `index.html` file in a web browser.  
2. See the list of users loaded from the internet.  
3. Click a user card to see details in a popup.  
4. Click the **Delete** button to remove a user.  
5. Click outside the popup to close it.

## Code Structure

- Uses a **self-invoked function** with jQuery:  
  ```js
  (($) => {
    // Your code here
  })(jQuery);
