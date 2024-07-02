// Import Modules
const { Schema, Types } = require('mongoose');

// Import Dependencies
const DateFormat = require('../Utilities/DateFormat');

// Create Reaction Schema Model
const ReactionSchema = new Schema(
    {
        ReactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        ReactionBody: {
            type: String,
            required: true,
            maxLength: 280
        },
        Username: {
            type: String,
            required: true
        },
        CreatedAt: {
            type: Date,
            default: Date.now,
            get: (Timestamp) => DateFormat(Timestamp)
        }
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
);

// Export Reaction Schema Model
module.exports = ReactionSchema;