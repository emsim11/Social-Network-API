// Create New Router Object
const Router = require('express').Router();

// Import Dependencies (7)
const { GetUsers, GetUser, CreateUser, UpdateUser, RemoveUser, AddFriend, RemoveFriend } = require('../UserController');

// Specify `/API/Users` Routes
Router.route('/').get(GetUsers).post(CreateUser);

// Specify `/API/Users/:UserId` Routes
Router.route('/:UserId').get(GetUser).put(UpdateUser).delete(RemoveUser);

// Specify `/API/Users/:UserId/Friends/:FriendId` Routes
Router.route('/:UserId/Friends/:FriendId').post(AddFriend).delete(RemoveFriend);

// Export User Router Object
module.exports = Router;