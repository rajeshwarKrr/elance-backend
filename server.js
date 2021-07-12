const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const {typeDefs, resolvers} = require('./graphql');
const dotenv = require("dotenv")
const passport = require("passport");
var GoogleStrategy = require('passport-google-oauth20').Strategy;

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

  // app.get("/graphql", (req,res,next) => {
  //   console.log("req.profile", req.profile)
  //   next()
  // })

  // =======================================================================================

  app.use(passport.initialize());
  app.use(passport.session());

  let reqProfile = null
  passport.use(new GoogleStrategy({
      clientID: "164318546079-poqsjmneqb8remj0rn62pkr0kqt7belh.apps.googleusercontent.com",
      clientSecret: "1RYvceE3WNsL8qXQ_EfkqIvh",
      callbackURL: "http://localhost:4000/auth/google/callback",
      // profileFields: ['id', "displayName", "emails"],
      // passReqToCallback   : true
    },
    function(accessToken, refreshToken, profile, cb) {
      console.log("accessToken, refreshToken, profile, cb")
      console.log(accessToken, refreshToken, profile, cb);
      console.log("================================================================================================================");
      console.log("profile", profile)
      console.log("================================================================================================================");

      // reqProfile = profile
      cb(null, "profile")
    }
  ));

  passport.serializeUser((user, done) => {
    console.log("user, done");
    console.log(user, done);
    done(null, "user1");
  });

  passport.deserializeUser((user, done) => {
    console.log("id, done")
    console.log(user, done);
    done(null, "user2");
  });

  app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile','email'] }));

  app.get('/auth/google/callback',
    passport.authenticate('google', {
      successRedirect: 'http://localhost:4000/graphql',
      failureRedirect: 'http://localhost:4000/graphql',
    }),
    function(req, res) {
      // Successful authentication, redirect home.
      console.log("passport authenticate redirect")
    });

// =======================================================================================

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
    context: ({req, res}) => {
        // console.log("req,res")
        // // req.profile = reqProfile;
        console.log("req.user", req)
        // console.log("res", res.headers)
        return ({req,res})}
  });

  await server.start();
  server.applyMiddleware({ app });

  await new Promise(resolve => app.listen({port: process.env.PORT }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  return { server, app };
}

startApolloServer()
