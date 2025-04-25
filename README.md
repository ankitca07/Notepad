# Authenticated Notes Dashboard

A full-stack web application built with the MERN stack (MongoDB, Express.js, React, Node.js) allowing users to securely create, manage, and view their personal notes after authenticating. Features an interactive and responsive user interface with smooth animations and dark mode support. 

## Screenshots

(Add screenshots of your application here)

*   Login Page: `![Login Page Screenshot](link/to/login_screenshot.png)`
*   Signup Page: `![Signup Page Screenshot](link/to/signup_screenshot.png)`
*   Dashboard (Notes View): `![Dashboard Screenshot](link/to/dashboard_screenshot.png)`
*   Dashboard (Dark Mode): `![Dashboard Dark Mode Screenshot](link/to/dashboard_dark_mode_screenshot.png)`

## Core Features

*   **Secure User Authentication:**
    *   User Signup with hashed passwords (bcrypt).
    *   User Login with JWT (JSON Web Token) authentication.
    *   Secure Logout functionality.
*   **Protected Dashboard:** Access restricted to logged-in users via JWT verification middleware.
*   **Notes Management (CRUD):**
    *   Create new notes.
    *   View all personal notes.
    *   Edit existing notes.
    *   Delete notes.
*   **Session Persistence:** Users remain logged in across browser sessions using JWT stored in local storage.
*   **Interactive UI:** Designed with a focus on user experience using animations and responsive layouts.
*   **Dark Mode:** Theme toggle for switching between light and dark modes.

## Tech Stack

*   **Backend:**
    *   Node.js
    *   Express.js
    *   MongoDB (with Mongoose ODM)
    *   JSON Web Token (jsonwebtoken)
    *   bcryptjs (for password hashing)
    *   dotenv (for environment variables)
    *   cors (for Cross-Origin Resource Sharing)
*   **Frontend:**
    *   React (with Vite)
    *   React Router DOM (for routing)
    *   Axios (for API requests)
    *   React Context API (for state management - Auth & Theme)
    *   Framer Motion (for animations)
    *   **[Choose ONE and delete the other styling option below]**
        *   Tailwind CSS (for utility-first styling)
        *   CSS Modules (for component-scoped styling with CSS variables)
    *   Heroicons (for icons - optional)
*   **Database:**
    *   MongoDB (NoSQL Database)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   Node.js (v14 or later recommended)
    *   Check with: `node -v`
*   npm (Node Package Manager) or yarn
    *   Comes with Node.js. Check with: `npm -v` or `yarn -v`
*   MongoDB Instance
    *   A running MongoDB server (local installation or a cloud service like MongoDB Atlas). Get the connection URI.

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/authenticated-notes-dashboard.git
    cd authenticated-notes-dashboard
    ```

2.  **Backend Setup:**
    ```bash
    cd server
    npm install
    ```
    *   Create a `.env` file in the `server` directory.
    *   Copy the contents of `.env.example` (create this file if it doesn't exist) into `.env`.
    *   Fill in your environment variables in the `.env` file:
        ```env
        # .env (in server directory)
        PORT=5000
        MONGODB_URI=your_mongodb_connection_string
        JWT_SECRET=your_super_strong_jwt_secret
        JWT_EXPIRES_IN=30d
        ```

3.  **Frontend Setup:**
    ```bash
    cd ../client
    npm install
    ```
    *   (Optional) If your API URL differs from the default (`http://localhost:5000/api`), create a `.env` file in the `client` directory:
        ```env
        # .env (in client directory)
        VITE_API_URL=http://your-backend-api-url/api
        ```

### Running the Application

You need to run both the backend and frontend servers concurrently.

1.  **Run the Backend Server:**
    ```bash
    cd server
    npm run dev
    ```
    The backend API will typically be running on `http://localhost:5000` (or the `PORT` specified in your `.env`).

2.  **Run the Frontend Development Server:**
    ```bash
    # Open a new terminal window/tab
    cd client
    npm run dev
    ```
    The React application will typically be running on `http://localhost:5173` (for Vite) or `http://localhost:3000` (for Create React App).

Open your browser and navigate to the frontend development server URL.

## Environment Variables

Ensure you have the following environment variables set up in the respective `.env` files. **Do not commit your `.env` files to version control!** Use `.env.example` files to list required variables.

### Server (`server/.env`)

*   `PORT`: The port the backend server will run on (e.g., 5000).
*   `MONGODB_URI`: Your MongoDB connection string.
*   `JWT_SECRET`: A strong, secret key used for signing JSON Web Tokens.
*   `JWT_EXPIRES_IN`: How long the JWT token should be valid (e.g., `30d`, `1h`).

### Client (`client/.env`) - Optional

*   `VITE_API_URL`: The base URL for your backend API (e.g., `http://localhost:5000/api`). Only needed if it differs from the default in `src/services/api.js`.

## API Endpoints (Brief)

All `/api/notes` routes require a valid JWT Bearer token in the Authorization header.

*   `POST /api/auth/signup`: Register a new user.
*   `POST /api/auth/login`: Authenticate a user and get a token.
*   `GET /api/auth/profile`: Get logged-in user's profile (protected).
*   `GET /api/notes`: Get all notes for the logged-in user.
*   `POST /api/notes`: Create a new note.
*   `GET /api/notes/:id`: Get a specific note by ID.
*   `PUT /api/notes/:id`: Update a specific note by ID.
*   `DELETE /api/notes/:id`: Delete a specific note by ID.
