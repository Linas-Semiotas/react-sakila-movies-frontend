# Sakila Movies Frontend

## Overview
This project is the frontend for the Sakila Movies application, built with React. It provides a user-friendly interface for managing movie rentals, customer profiles, and role-based actions. The frontend communicates with a Spring Boot backend to perform CRUD operations and offers role-specific functionalities, allowing users to view and manage personal data, while admins oversee movie entries, customer accounts, and rentals.

## Description
The **Sakila Movies** frontend is developed using **React**, designed for a seamless user experience. It communicates with a **RESTful API** backend to retrieve and manage movie-related data. Key functionalities include viewing available movies, editing customer profiles, and role-based features—users can access personal rental data, while admins perform tasks like adding or removing movies and handling customer transactions. The frontend employs modern **React hooks** for state management, responsive design techniques, and secure API communication via JWT-based authentication.

## Getting Started
1. Clone this repository:
    ```bash
    git clone https://github.com/Linas-Semiotas/react-sakila-movies-frontend.git
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the development server:
    ```bash
    npm start
    ```
Make sure the backend server is running and reachable at `http://localhost:8080` for full functionality.

## Features
- **User Role Management**:
  - **USER**:
    - View rented movies.
    - Add (fake) balance.
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
- **ErrorPage**: A component to display error messages based on user navigation, such as 401, 403 or 404 errors.

## Contact
- Name: Linas Šemiotas
- Email: linas.semiotas@gmail.com
- GitHub: [Linas Šemiotas](https://github.com/Linas-Semiotas/react-sakila-movies-frontend)