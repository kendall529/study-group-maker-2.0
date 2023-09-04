const { Group, User, Topic } = require("../models");
const { signToken, AuthenticationError } = require('../utils/auth');


const resolvers = {
  Query: {   
    getUsers: async (parent, args, context) => {
      return await User.find({}).populate('groups').populate({
        path: 'groups',
        populate: ['topic_id', 'created_by']
      });
    },
    getUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id }).populate('groups').populate({
          path: 'groups',
          populate: ['topic_id', 'created_by']
        });
      }
      throw AuthenticationError;
    },
    getGroups: async (parent, args, context) => {
      return await Group.find({}).populate('created_by').populate('topic_id');
    },
    getGroup: async (parent, args, context) => {
      return await Group.findOne({ _id: args.group_id}).populate('created_by').populate('topic_id');
    },
    getTopics: async (parent, args, context) => {
        return await Topic.find({});
    },
  },
  Mutation: {
    login: async (parent, { user_name, password }) => {
      const user = await User.findOne({ user_name });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      if(!token) {
        throw new Error('Could not sign token');
      }

      return { token, user };
    },

    addUser: async (_, { user_name, email, password }) => {
      try {
        // Check if the email is already in use
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          throw new Error('Email is already in use');
        }

        // Create a new user document
        const user = new User({
          user_name: user_name,
          email,
          password: password,
          groups: []
        });

        // Save the user to the database
        await user.save();

        const token = signToken(user);
        return { token, user };

      } catch (error) {
        throw error;
      }

    },
    addGroup: async (parent, { group_name, group_description, topic_id, skill_level, zoom_link, meet_time }, context) => {
        console.log()
        const group = await Group.create({ group_name, group_description, topic_id, skill_level, zoom_link, meet_time, created_by: context.user._id });

        await User.findOneAndUpdate(
          { _id: context.user._id},
          { $addToSet: { groups: group._id } }
        );

        return group;
    },
    removeGroup: async (parent, { group_id }, context) => {
      if (context.user) {
        const group = await Group.findOneAndDelete({ _id:group_id });

        await User.updateMany(
          { groups: group_id },
          { $pull: { groups: group_id } }
        );

        return group;
      }
      throw AuthenticationError;
    },
    enroll: async (parent, { group_id }, context) => {
      if (context.user) {
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { groups: group_id } }
        );
        return user;
      }
      throw AuthenticationError;
    },
    unEnroll: async (parent, { group_id }, context) => {
      if (context.user) {
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { groups: group_id } }
        );
        return user;
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
