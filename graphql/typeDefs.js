const { gql } = require('apollo-server-express');
const { User } = require("../models")


const typeDefs = gql`
  type User {
    _id: ID
    f_name: String
    l_name: String
    user_name: String
    occupation: String
    intro: String
    profile_pic: String
    email: String
    phone: String

    website: String
    resume: String
  }

  type Query {
    users: [User]
  }

  type Mutation {
    register(
      f_name: String,
      l_name: String,
      user_name: String,
      occupation: String,
      intro: String,
      profile_pic: String,
      email: String,
      phone: String,

      website: String,
      resume: String,
    ):User

    login(
      email: String,
      password: String
    ): String

  }
`;

module.exports = { typeDefs }
