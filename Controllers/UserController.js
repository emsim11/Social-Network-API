// Import Dependencies
const { Thought, User } = require('../Models');

const UserController = {

    // Retrieve All Users
    async GetUsers(req, res) {
        try {
            const Users = await User.find().select('-__v')
            res.json(Users);
        } catch(err) {
            console.log(err);
            res.status(500).json('An error occurred while executing the `GetUsers` function:', err);
        }
    },

    // Retrieve Single User By Id and Populated Thought & Friend Data
    async GetUser(req, res) {
        try {
            const Users = await User.findOne({ _id: req.params.UserId })
            .select('-__v')
            .populate('Friends')
            .populate('Thoughts');
        
        if(!Users) {
            return res.status(404).json('No User Found With This Id!');
        }

        res.json(Users);

        } catch(err) {
            console.log(err);
            res.status(500).json('An error occurred while executing the `GetUser` function:', err);
        }
    },

    // Create New User
    async CreateUser(req, res) {
        try {
            const Users = await User.create(req.body);
            res.json(Users);
        } catch(err) {
            console.log(err);
            res.status(500).json('An error occurred while executing the `CreateUser` function:', err);
        }
    },

    // Update User By Id
    async UpdateUser(req, res) {
        try {
            const Users = await User.findOneAndUpdate(
                { _id: req.params.UserId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if(!Users) {
                return res.status(404).json('No User Found With This Id!');
            }

            res.json(Users);

        } catch(err) {
            console.log(err);
            res.status(500).json('An error occurred while executing the `UpdateUser` function:', err);
        }
    },

    // Remove User By Id (BONUS: Remove User's Associated Thoughts When Deleted)
    async RemoveUser(req, res) {
        try {
            const Users = await User.findOneAndDelete({ _id: req.params.UserId })
            
            if(!Users) {
                return res.status(404).json('No User Found With This Id!');
            }

            await Thought.deleteMany({ _id: { $in: Users.Thoughts } });

            res.json('User and Associated Thoughts Have Been Deleted!');

        } catch(err) {
            console.log(err);
            res.status(500).json('An error occurred while executing the `RemoveUser` function:', err);
        }
    },
    // Add New Friend to User's Friends List
    async AddFriend(req, res) {
        try {
            const Users = await User.findOneAndUpdate(
                { _id: req.params.UserId },
                { $addToSet: { Friends: req.params.FriendId } },
                { new: true }
            );

            if(!Users) {
                return res.status(404).json('No User Found With This Id!');
            }

            res.json(Users);

        } catch(err) {
            console.log(err);
            res.status(500).json('An error occurred while executing the `AddFriend` function:', err);
        }
    },

    // Remove Friend From User's Friends List
    async RemoveFriend(req, res) {
        try {
            const Users = await User.findOneAndUpdate(
                { _id: req.params.UserId },
                { $pull: { Friends: req.params.FriendId } },
                { new: true }
            );

            if(!Users) {
                return res.status(404).json('No User Found With This Id!');
            }

            res.json(Users);

        } catch(err) {
            console.log(err);
            res.status(500).json('An error occurred while executing the `RemoveFriend` function:', err);
        }
    }
};

// Export User Controller Variable
module.exports = UserController;