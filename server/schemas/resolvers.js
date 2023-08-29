// const { Tech, Matchup } = require('../models');

const resolvers = {
  Query: {
    getUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id }).populate('savedBooks');
      }
      throw AuthenticationError;
    },
  },
  Mutation: {
  },
};

module.exports = resolvers;
