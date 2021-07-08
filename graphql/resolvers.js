const { gql } = require('apollo-server-express');
const { User } = require("../models")


const resolvers = {
  Query: {
    users: () => User.find(),
  },

  Mutation: {

    register: async (parent, args, context, info) => {
      const user = new User({ ...args })
      await user.save()
      return user;
    },

    login: async (parent, {email, password}, context, info) => {
      const user = await User.findOne({ email: email }).select("+password")
      if (!user || password !== user.password) {
        throw new Error("Invalid credentials")
      }
      return "Success Login"
    }
  }
};

module.exports = { resolvers }
