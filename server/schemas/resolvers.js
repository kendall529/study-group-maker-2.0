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
      return await User.findOne({ _id: context.user._id }).populate('groups').populate({
        path: 'groups',
        populate: ['topic_id', 'created_by']
      });
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

      return { token, user };
    },
    addUser: async (parent, { user_name, first_name, last_name, email, password }) => {
      const user = await User.create({ user_name, first_name, last_name, email, password, groups: []});
      const token = signToken(user);
      return { token, user };
    },
    addGroup: async (parent, { group_name, group_description, topic_id, skill_level, zoom_link, meet_time, created_by }, context) => {
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
    removeGroup: async (parent, { group_id }, context) => {
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
    enroll: async (parent, { user_id, group_id }, context) => {
      if (context.user) {
        const user = await User.findOneAndUpdate(
          { _id: group_id },
          { $addToSet: { groups: group_id } }
        );
        return user;
      }
      throw AuthenticationError;
    },
    unEnroll: async (parent, { user_id, group_id }, context) => {
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
