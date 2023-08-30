// const { Tech, Matchup } = require('../models');

const { Group, User, Topic } = require("../models");

const resolvers = {
  Query: {
    getUsers: async (parent, args, context) => {
      return await User.find({}).populate('groups');
    },
    getUser: async (parent, args, context) => {
      return await User.findOne({ _id: context.user._id }).populate('groups');
    },
    getGroups: async (parent, args, context) => {
      return await Group.find({});
    },
    getGroup: async (parent, args, context) => {
      return await Group.findOne({ _id: args.group_id});
    },
    getTopics: async (parent, args, context) => {
      if (context.user) {
        return await Topic.find({});
      }
      throw AuthenticationError;
    },
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    addGroup: async (parent, { group_name, group_description, topic_id, skill_level, zoom_link, meet_time, created_by }) => {
      if (context.user) {
        const group = await Group.create({ group_name, group_description, topic_id, skill_level, zoom_link, meet_time, created_by });

        await User.findOneAndUpdate(
          { _id: created_by },
          { $addToSet: { groups: group._id } }
        );

        return group;
      }
      throw AuthenticationError;
    },
    removeGroup: async (parent, { group_id }) => {
      if (context.user) {
        const group = await Group.findOneAndDelete({ id_:group_id });

        await User.updateMany(
          { groups: group_id },
          { $pull: { groups: group_id } }
        );

        return group;
      }
      throw AuthenticationError;
    },
    enroll: async (parent, { user_id, group_id }) => {
      if (context.user) {
        const user = await User.findOneAndUpdate(
          { _id: group_id },
          { $addToSet: { groups: group_id } }
        );
        return user;
      }
      throw AuthenticationError;
    },
    unEnroll: async (parent, { user_id, group_id }) => {
      if (context.user) {
        const user = await User.findOneAndUpdate(
          { _id: group_id },
          { $pull: { groups: group_id } }
        );
        return user;
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
