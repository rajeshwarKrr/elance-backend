const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const {typeDefs, resolvers} = require('./graphql');
const dotenv = require("dotenv")

const cors = require("cors");
const { connectDB } = require("./db")

async function startApolloServer() {

  const app = express()
  dotenv.config()

  connectDB()

  app.use(cors());

  app.get("/", (req, res) => {
    res.json({ msg: "Welcome! Go to /graphql"})
  })

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true
  });
  await server.start();
  server.applyMiddleware({ app });

  await new Promise(resolve => app.listen({port: process.env.PORT || 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  return { server, app };
}

startApolloServer()
