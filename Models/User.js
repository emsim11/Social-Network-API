// Import Modules
const { Schema, model } = require('mongoose');

// Create User Schema Model
const UserSchema = new Schema (
    {
        Username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        Email: {
            type: String,
            unique: true,
            required: true,
            match: [/.+@.+\..+/]
        },
        Thoughts: [
            {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
            }
        ],
        Friends: [
            {
            type: Schema.Types.ObjectId,
            ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

// Create Virtual to Retrieve Length of User's Friends Array Field on Query
UserSchema.virtual('FriendCount').get(function () {
    return this.Friends.length;
});

// Create User Model Variable
const User = model('User', UserSchema);

// Export User Variable
module.exports = User;