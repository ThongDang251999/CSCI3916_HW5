# Movie App

A full-stack application that allows users to search for movies, display information about movies, see stored ratings, and allow users to enter ratings.

## Features

- User SignUp and Login
- JWT Authentication for API protection
- Display top rated movies
- Movie Detail screen with images, actors, and reviews
- Submit movie reviews
- Search movies by title or actor name

## Technology Stack

- **Frontend**: React, Redux, Bootstrap
- **Backend**: Node.js, Express
- **Database**: MongoDB

## Project Structure

```
project-root/
├── backend/            # API server
│   ├── server.js       # Express application
│   ├── Movies.js       # Movie schema
│   ├── Reviews.js      # Review schema
│   ├── Users.js        # User schema
│   └── ...
└── frontend/           # React application
    ├── public/         # Static files
    ├── src/            # React source code
    │   ├── actions/    # Redux actions
    │   ├── components/ # React components
    │   ├── reducers/   # Redux reducers
    │   └── ...
    └── ...
```

## Setup Instructions

### Prerequisites

- Node.js (v16.x or higher)
- MongoDB instance (local or cloud)

### Environment Variables

Create `.env` file in the backend directory with the following variables:

```
DB=mongodb://your-mongodb-connection-string
SECRET_KEY=your-jwt-secret-key
UNIQUE_KEY=another-secret-key
PORT=5000
```

Create `.env.development` and `.env.production` files in the frontend directory:

```
REACT_APP_API_URL=http://localhost:5000/api
```

### Installation

1. Clone the repository
   ```
   git clone https://github.com/your-username/movie-app.git
   cd movie-app
   ```

2. Install dependencies for backend, frontend, and root project
   ```
   npm run install-all
   ```

### Running the Application

#### Development mode
```
npm run dev
```

This will start both the backend server and the React development server concurrently.

- Backend: http://localhost:5000
- Frontend: http://localhost:3000

#### Production mode
```
npm start
```

This will run the backend server and serve the built React app.

## API Endpoints

- **POST /api/signup**: Register a new user
- **POST /api/signin**: Authenticate a user
- **GET /api/movies**: Get all movies (sorted by rating if reviews=true)
- **GET /api/movies/:id**: Get a specific movie
- **POST /api/movies/search**: Search for movies
- **POST /api/reviews**: Add a review for a movie

## Deployment

This application can be deployed on Heroku or any other platform that supports Node.js applications.

### Heroku Deployment

1. Create a new Heroku application
2. Set environment variables in Heroku dashboard
3. Connect your GitHub repository
4. Deploy the main branch

