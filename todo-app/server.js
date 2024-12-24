const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const methodOverride = require('method-override');
const path = require('path');
const connectDB = require('./config/database');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/task');
const indexRoutes = require('./routes/index');
const Task = require('./models/Task'); // Import the Task model

require('dotenv').config({ path: path.join(__dirname, 'todo-app', '.env') });

const app = express();
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(methodOverride('_method'));
app.use(session({ 
    secret: process.env.SESSION_SECRET || 'your_session_secret_key', 
    resave: false, 
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Existing routes
app.use('/', indexRoutes);
app.use('/', authRoutes);
app.use('/', taskRoutes);

// New route for adding tasks
app.post('/tasks', async (req, res) => {
    const { title, description, userId } = req.body; // Include userId if needed

    try {
        // Create a new task
        const newTask = new Task({ title, description, userId });
        await newTask.save();
        res.redirect('/tasks'); // Redirect on success
    } catch (error) {
        // Fetch existing tasks to display on the tasks page
        const existingTasks = await Task.find(); // Fetch all tasks
        res.render('tasks', { error: error.message, tasks: existingTasks });
    }
});

// Route to display tasks
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find(); // Fetch all tasks
        res.render('tasks', { tasks }); // Render tasks page with tasks
    } catch (error) {
        res.render('tasks', { error: 'Failed to load tasks', tasks: [] });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));

