const { User, Thought } = require("../models");

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId }).select(
        "-__v"
      );

      if (!user) {
        res.status(404).json({ message: "No user found with that ID" });
      }
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.status(200).json(user);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!user) {
        res.status(404).json({ message: "No user with that ID" });
      }
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      await Thought.deleteMany({ _id: { $in: user.thoughts } });
      res
        .status(200)
        .json({ message: "User and associated thoughts deleted!" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async addFriend(req, res) {
    try {
      const { userId, friendId } = req.params;

      const user = await User.findById(userId);
      const friend = await User.findById(friendId);

      if (!user || !friend) {
        return res.status(404).json({ message: "User or friend not found." });
      }

      if (!user.friends.includes(friendId)) {
        user.friends.push(friendId);
        await user.save();

        friend.friends.push(userId);
        await friend.save();

        res.json(user);
      } else {
        res.status(400).json({ message: "Friend already added." });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  async deleteFriend(req, res) {
    try {
      const { userId, friendId } = req.params;

      const user = await User.findById(userId);
      const friend = await User.findById(friendId);
      if (!user || !friend) {
        return res.status(404).json({ message: "User or friend not found." });
      }
      if (user.friends.includes(friendId)) {
        user.friends = user.friends.filter(
          (friend) => friend.toString() !== friendId
        );
        await user.save();

        friend.friends = friend.friends.filter(
          (user) => user.toString() !== userId
        );
        await friend.save();

        res.json(user);
      } else {
        res.status(400).json({ message: "Friend not found." });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
};
