// Import Modules
const Mongoose = require('mongoose');

// Specify Connection URL
Mongoose.connect('mongodb://127.0.0.1:27017/SocialMedia');

// Export Mongoose Connection
module.exports = Mongoose.connection;