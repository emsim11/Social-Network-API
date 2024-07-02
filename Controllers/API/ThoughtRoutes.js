// Create New Router Object
const Router = require('express').Router();

// Import Dependencies (7)
const { GetThoughts, GetThought, CreateThought, UpdateThought, RemoveThought, CreateReaction, RemoveReaction } = require('../ThoughtController');

// Specify `/API/Thoughts` Route
Router.route('/').get(GetThoughts).post(CreateThought);

// Specify `/API/Thoughts/:ThoughtId` Route
Router.route('/:ThoughtId').get(GetThought).put(UpdateThought).delete(RemoveThought);

// Specify `/API/Thoughts/:ThoughtId/Reactions` Route
Router.route('/:ThoughtId/Reactions').post(CreateReaction);

// Specify `/API/Thoughts/:ThoughtId/Reactions/:ReactionId` Route
Router.route('/:ThoughtId/Reactions/:ReactionId').delete(RemoveReaction);

// Export Thought Router Object
module.exports = Router;