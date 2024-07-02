// Import Modules
const Express = require('express');

// Import Dependencies
const Database = require('./Configuration/Connection');
const Routes = require('./Controllers/Index');

// Initialize App and Establish PORT
const PORT = process.env.PORT || 3001;
const App = Express();

App.use(Express.urlencoded({ extended: true }));
App.use(Express.json());
App.use(Routes);

// Start Listening On PORT
Database.once('open', () => {
    App.listen(PORT, () => {
        console.log(`Server is running on PORT: ${PORT}`);
    });
});