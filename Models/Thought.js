// Import Modules
const { Schema, model } = require('mongoose');

// Import Dependencies
const DateFormat = require('../Utilities/DateFormat');
const ReactionSchema = require('./Reaction');

// Create Thought Schema Model
const ThoughtSchema = new Schema (
    {
        ThoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        CreatedAt: {
            type: Date,
            default: Date.now,
            get: (Timestamp) => DateFormat(Timestamp)
        },
        Username: {
            type: String,
            required: true
        },
        Reactions: [ ReactionSchema ]
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
);

// Create Virtual to Retrieve Length of Thought's Reactions Array Field on Query
ThoughtSchema.virtual('ReactionCount').get(function () {
    return this.Reactions.length;
});

// Create Thought Model Variable
const Thought = model('Thought', ThoughtSchema);

// Export Thought Variable
module.exports = Thought;