// Import Dependencies
const { Reaction, Thought, User } = require('../Models');

const ThoughtController = {

    // Retrieve All Thoughts
    async GetThoughts(req, res) {
        try {
            const Thoughts = await Thought.find().sort({ CreatedAt: -1 });
            res.json(Thoughts);
        } catch(err) {
            console.log(err);
            res.status(500).json('An error occurred while executing the `GetThoughts` function:', err);
        }
    },

    // Retrieve Single Thought By Id
    async GetThought(req, res) {
        try {
            const Thoughts = await Thought.findOne({ _id: req.params.ThoughtId });

            if(!Thoughts) {
                return res.status(404).json('No Thought Found With This Id!');
            }

            res.json(Thoughts);

        } catch(err) {
            console.log(err);
            res.status(500).json('An error occurred while executing the `GetThought` function:', err);
        }
    },

    // Create New Thought (Push Created Thought's Id to Associated User's Thoughts Array Field)
    async CreateThought(req, res) {
        try {
            const Thoughts = await Thought.create(req.body);

            const Users = await User.findOneAndUpdate(
                { _id: req.body.UserId },
                { $push: { Thoughts: Thoughts._id } },
                { new: true }
            );

            if(!Users) {
                return res.status(404).json('No User Found With This Id! Thought Created Without Associated User.');
            }

            res.json('Thought Successfully Created!');

        } catch(err) {
            console.log(err);
            res.status(500).json('An error occurred while executing the `CreateThought` function:', err);
        }
    },

    // Update Thought By Id
    async UpdateThought(req, res) {
        try {
            const Thoughts = await Thought.findOneAndUpdate(
                { _id: req.params.ThoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if(!Thoughts) {
                return res.status(404).json('No Thought Found With This Id!');
            }

            res.json(Thoughts);

        } catch(err) {
            console.log(err);
            res.status(500).json('An error occurred while executing the `UpdateThought` function:', err);
        }
    },

    // Remove Thought By Id and the Thought Id From User's Thoughts Array Field
    async RemoveThought(req, res) {
        try {
            const Thoughts = await Thought.findOneAndDelete({ _id: req.params.ThoughtId })

            if(!Thoughts) {
                return res.status(404).json('No Thought Found With This Id!');
            }

            const Users = User.findOneAndUpdate(
                { Thoughts: req.params.ThoughtId },
                { $pull: { Thoughts: req.params.ThoughtId } },
                { new: true }
            );

            if(!Users) {
                return res.status(404).json('No User Found With This Id! Thought Removed Without Associated User.');
            }

            res.json('Thought Successfully Removed!');

        } catch(err) {
            console.log(err);
            res.status(500).json('An error occurred while executing the `RemoveThought` function:', err);
        }
    },

    // Create Reaction Stored in Single Thought's Reactions Array Field
    async CreateReaction(req, res) {
        try {
            const Thoughts = await Thought.findOneAndUpdate(
                { _id: req.params.ThoughtId },
                { $addToSet: { Reactions: req.body } },
                { runValidators: true, new: true }
            );

            if(!Thoughts) {
                return res.status(404).json('No Thought Found With This Id!');
            }

            res.json(Thoughts);

        } catch(err) {
            console.log(err);
            res.status(500).json('An error occurred while executing the `CreateReaction` function:', err);
        }
    },

    // Pull and Remove Reaction By Reaction's ReactionId Value
    async RemoveReaction(req, res) {
        try {
            const Thoughts = await Thought.findOneAndUpdate(
                { _id: req.params.ThoughtId },
                { $pull: { Reactions: { ReactionId: req.params.ReactionId } } },
                { runValidators: true, new: true }
            );

            if(!Thoughts) {
                return res.status(404).json('No Thought Found With This Id!');
            }

            res.json(Thoughts);

        } catch(err) {
            console.log(err);
            res.status(500).json('An error occurred while executing the `RemoveReaction` function:', err);
        }
    }
};

// Export Thought Controller Variable
module.exports = ThoughtController;