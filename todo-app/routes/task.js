const express = require('express');
const Task = require('../models/Task');
const authenticate = require('../middleware/auth');

const router = express.Router();

// Get all tasks for the authenticated user
router.get('/tasks', authenticate, async (req, res) => {
  const tasks = await Task.find({ userId: req.user._id });
  res.render('tasks', { tasks, error: null });
});

// Create a new task
router.post('/tasks', authenticate, async (req, res) => {
  const { title, description } = req.body;

  try {
    const task = new Task({ title, description, userId: req.user._id });
    await task.save();
    res.redirect('/tasks');
  } catch (err) {
    const tasks = await Task.find({ userId: req.user._id });
    res.render('tasks', { tasks, error: 'Could not create task' });
  }
});

// Update a task's status
router.put('/tasks/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    await Task.findByIdAndUpdate(id, { status, updatedAt: Date.now() });
    res.redirect('/tasks');
  } catch (err) {
    const tasks = await Task.find({ userId: req.user._id });
    res.render('tasks', { tasks, error: 'Could not update task' });
  }
});

// Delete a task
router.delete('/tasks/:id', authenticate, async (req, res) => {
  const { id } = req.params;

  try {
    await Task.findByIdAndDelete(id);
    res.redirect('/tasks');
  } catch (err) {
    const tasks = await Task.find({ userId: req.user._id });
    res.render('tasks', { tasks, error: 'Could not delete task' });
  }
});

module.exports = router;