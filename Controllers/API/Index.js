// Create New Router Object
const Router = require('express').Router();

// Import Dependencies
const ThoughtRoutes = require('./ThoughtRoutes');
const UserRoutes = require('./UserRoutes');

// Create API Endpoints - /API/Thoughts and /API/Users
Router.use('/Thoughts', ThoughtRoutes);
Router.use('/Users', UserRoutes);

// Export Router Object
module.exports = Router;