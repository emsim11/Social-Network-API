// Create New Router Object
const Router = require('express').Router();

// Import Dependencies
const APIRoutes = require('./API');

// Create API Endpoint - /API
Router.use('/API', APIRoutes);

Router.use((req, res) => {
    return res.send('Wrong Route!');
});

// Export Router Object
module.exports = Router;