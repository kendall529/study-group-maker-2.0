// const { Tech, Matchup } = require('../models');

const resolvers = {
  Query: {
    getUsers: async (parent, args, context) => {
      if (context.user) {
        return await User.find({}).populate('groups');
      }
      throw AuthenticationError;
    },
    getUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id }).populate('groups');
      }
      throw AuthenticationError;
    },
  },
  Mutation: {
  },
};

module.exports = resolvers;
