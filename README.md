# LinkedIn Clone

A full-stack LinkedIn clone application built with React, Express, and MongoDB featuring user authentication, post creation, social interactions, and user profiles.

## 🚀 How to Run the Project

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas account)
- npm or pnpm package manager

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/kartikeya-kash/linkedInClone.git
cd linkedInClone
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory and add your MongoDB connection string:

```
MONGO_URL=your_mongodb_connection_string
```

Example for local MongoDB:

```
MONGO_URL=mongodb://localhost:27017/lnclonedb
```

Example for MongoDB Atlas:

```
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/lnclonedb
```

### Running the Application

The application has two parts that need to run simultaneously:

1. **Start the Backend Server** (Terminal 1)

```bash
npm start
```

The server will run on `http://localhost:5004`

2. **Start the Frontend Development Server** (Terminal 2)

```bash
npm run dev
```

The frontend will run on `http://localhost:5173` (default Vite port)

3. **Access the application**
   Open your browser and navigate to `http://localhost:5173`

### Additional Scripts

- `npm run build` - Build the frontend for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint for code quality checks

## 🛠️ Tech Stack

### Frontend

- **React 19.1.1** - JavaScript library for building user interfaces
- **Vite 7.1.7** - Next-generation frontend build tool
- **React Router DOM 7.9.5** - Declarative routing for React applications
- **CSS** - Custom styling

### Backend

- **Node.js** - JavaScript runtime environment
- **Express 5.1.0** - Fast, unopinionated web framework for Node.js
- **MongoDB** - NoSQL database for data storage
- **Mongoose 8.19.3** - MongoDB object modeling for Node.js
- **CORS** - Cross-Origin Resource Sharing middleware
- **dotenv** - Environment variable management

### Development Tools

- **ESLint** - Code linting and quality assurance
- **Vite Plugin React** - Official Vite plugin for React

## ✨ Features

### Authentication

- ✅ **User Signup** - Create new user accounts with full name, email, and password
- ✅ **User Login** - Secure authentication system
- ✅ **Session Management** - Maintain user sessions across the application

### Post Management

- ✅ **Create Posts** - Share content and thoughts with the network
- ✅ **View Feed** - Browse all posts from users in chronological order
- ✅ **Edit Posts** - Modify your own posts after creation
- ✅ **Delete Posts** - Remove posts you've created

### Social Interactions

- ✅ **Like Posts** - Show appreciation for content with a like button
- ✅ **Comment on Posts** - Engage with posts through comments
- ✅ **Real-time Updates** - See likes and comments update dynamically

### User Profile

- ✅ **Profile Page** - View user information and their posts
- ✅ **User-specific Posts** - Filter posts by author email
- ✅ **User Information Display** - Show full name and email

### Navigation

- ✅ **Landing Page** - Welcome page for new visitors
- ✅ **Responsive Navbar** - Easy navigation between different sections
- ✅ **Protected Routes** - Route management with React Router

### API Endpoints

#### User Routes

- `POST /login` - Authenticate user
- `POST /signup` - Register new user
- `GET /user/:email` - Get user information by email

#### Post Routes

- `GET /posts` - Retrieve all posts (sorted by newest)
- `GET /posts/user/:email` - Get posts by specific user
- `POST /posts` - Create a new post
- `PUT /posts/:id` - Update a post
- `DELETE /posts/:id` - Delete a post
- `PUT /posts/:id/like` - Like a post
- `POST /posts/:id/comment` - Add comment to a post

### Data Models

#### User Schema

- Full Name
- Email (unique)
- Password

#### Post Schema

- Author Email
- Content
- Likes Count
- Comments Array
- Timestamps

## 📁 Project Structure

```
linkedInClone/
├── public/              # Static assets
├── src/
│   ├── assets/         # Images and media files
│   ├── pages/          # React page components
│   │   ├── components/ # Reusable components (Navbar, Loader)
│   │   ├── Landing.jsx
│   │   ├── Signup.jsx
│   │   ├── Login.jsx
│   │   ├── Home.jsx
│   │   ├── Profile.jsx
│   │   └── Newpost.jsx
│   ├── App.jsx         # Main application component
│   ├── App.css         # Application styles
│   ├── main.jsx        # Application entry point
│   └── index.css       # Global styles
├── server.js           # Express backend server
├── User.js             # User MongoDB schema
├── Post.js             # Post MongoDB schema
├── .env                # Environment variables (not in repo)
├── package.json        # Project dependencies
└── vite.config.js      # Vite configuration
```

## 🔐 Security Note

⚠️ **Important**: This project stores passwords in plain text for demonstration purposes. In a production environment, always use proper password hashing (e.g., bcrypt) to secure user credentials.

## 📝 License

ISC

## 👤 Author

Kartikeya Sharma

## 🔗 Repository

[GitHub Repository](https://github.com/kartikeya-kash/linkedInClone)
