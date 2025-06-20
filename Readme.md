#  Book Review Platform

A full-stack web application where users can register, log in, view a list of books, and submit reviews or ratings.



##  Features

- User registration and login with JWT authentication
- View a list of all books
- Add new books
- View reviews for each book
- Add rating-based reviews (1 to 5)
- Protected routes for adding reviews
- MongoDB integration



##  Tech Stack

- **Frontend**: React.js, Axios, React Router
- **Backend**: Node.js, Express.js, JWT
- **Database**: MongoDB with Mongoose



##  Setup Instructions

###  Prerequisites

- Node.js and npm
- MongoDB (local or Atlas)
- Git



###  Folder Structure

book-review-platform/
├── server/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ ├── .env
│ └── server.js
└── client/
├── src/
│ ├── components/
│ ├── pages/
│ ├── services/
│ └── App.js
└── package.json




## Backend Setup

1. Navigate to `server` folder:
   ```bash
   cd server

2.Install dependencies:

npm install

3.Create a .env file:

PORT=5000
MONGO_URI=mongodb://localhost:27017/book_review_platform
JWT_SECRET=your_jwt_secret_key

4.Run the backend server:

npm run dev

Server should run at http://localhost:5000


## Frontend Setup

1.Navigate to client folder:

cd client

2.Install dependencies:

npm install

3.Start the frontend:

npm start

App should run at http://localhost:3000

## Notes
-Make sure MongoDB is running locally (localhost:27017) or update the URI if using Atlas.

-JWT token is stored in localStorage after login.

-Some routes (like Add Review) are protected and require a valid token.

## Authentication Flow
-After successful login, token is saved in localStorage.

-All protected routes use Authorization: Bearer <token> in headers.

-Backend middleware verifies the token and attaches user to req.user.

## Contact
For any issues, please raise them via the project repository or contact the developer.


