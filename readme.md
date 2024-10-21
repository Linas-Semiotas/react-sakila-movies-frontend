# Sakila Movies Frontend

## Description
The frontend for **Sakila Movies** is built using **React**, offering a user-friendly interface for managing movie data. The frontend interacts with a **RESTful backend API** to handle operations such as viewing rented movies, managing user profiles, and performing admin tasks like managing movie entries. The frontend handles both **USER** and **ADMIN** role-specific actions.

## Features
- **User Role Management**:
  - **USER**:
    - View rented movies.
    - Add fake balance.
    - Update personal information and change password (in separate pages).
  - **ADMIN**:
    - Add, update, and delete movies, actors, languages, and categories.
    - Modify user permissions and roles.
  
- **Public Access**: View available stores and movies without logging in.
  
- **Search & Filter**: Search movies and filter based on language, category, and more.
  
- **Form Validation**: Ensures valid data input when updating profiles or adding new movies.
  
- **Responsive Design**: Built to be mobile-friendly and accessible across devices.

- **Security Enhancements**:
  - Tokens are now stored in HTTP-only cookies instead of local storage for enhanced security.
  - Automatic inactivity logout based on token expiration.
  - Active users benefit from token refreshing, extending session longevity while they're active.

## Available Scripts
- In the project directory, you can run:

- `npm start`
- Runs the app in development mode.
- Open http://localhost:3000 to view it in your browser.
- The page will reload if you make edits.
- You will also see any lint errors in the console.

- `npm test`
- Launches the test runner in interactive watch mode.

- `npm run build`
- Builds the app for production to the build folder.
- It bundles React in production mode and optimizes the build for the best performance.

- `npm run eject`
- Note: This is a one-way operation. Once you eject, you can’t go back!

## Technologies Used
- **React**: Frontend framework.
- **Material-UI**: For component styling and layout.
- **Axios**: For making HTTP requests to the backend API.
- **React Router DOM**: For routing between pages.
- **FontAwesome**: For icons.
- **Secure Cookies**: For safe token storage and user session management.

## Key Components
- **PrivateRoute & PublicRoute**: Components to manage access based on authentication and user roles.
- **ConfirmationWindow**: A modal for confirming user actions, such as deletions.
- **ErrorPage**: A component to display error messages based on user navigation, such as 401 or 403 errors.

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/Linas-Semiotas/react-sakila-movies-frontend.git
   ```
2. Navigate to the project directory and install dependencies:
    ```bash
    npm install
    ```
3. Start the development server:
    ```bash
    npm start
    ```
## Contact
- Name: Linas Šemiotas
- Email: linas.semiotas@gmail.com
- GitHub: [Linas Šemiotas](https://github.com/Linas-Semiotas/react-sakila-movies-frontend)