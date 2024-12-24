# Todo Application

A simple Todo application built with Node.js, Express, and MongoDB. This application allows users to create, read, update, and delete tasks, providing a straightforward interface for task management.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication (login and signup)
- Create, read, update, and delete tasks
- Mark tasks as completed
- Responsive design

## Technologies Used

- Node.js
- Express.js
- MongoDB (with Mongoose)
- EJS (Embedded JavaScript) for templating
- bcrypt for password hashing
- JSON Web Tokens (JWT) for authentication
- CSS for styling

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/repousername/todo-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd todo-app
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and add your MongoDB connection string and JWT secret:

   ```plaintext
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

5. Start the application:

   ```bash
   npm start
   ```

   or if you are using `nodemon`:

   ```bash
   nodemon
   ```

## Usage

- Open your browser and navigate to `http://localhost:3000` to access the application.
- You can sign up for a new account or log in with an existing account.
- Once logged in, you can create new tasks, view your tasks, mark them as completed, and delete them.

## API Endpoints

### Authentication

- **POST /login**: Log in a user.
- **POST /signup**: Create a new user.

### Tasks

- **GET /tasks**: Retrieve all tasks for the logged-in user.
- **POST /tasks**: Create a new task.
- **PUT /tasks/:id**: Update the status of a task.
- **DELETE /tasks/:id**: Delete a task.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.