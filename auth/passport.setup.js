const GoogleStrategy = require('passport-google-oauth20').Strategy;

const { User } = require("../models")
const jwt = require("jsonwebtoken")

module.exports = (passport) => {
  passport.serializeUser(function (user, done) {
    /*
    From the user take just the id (to minimize the cookie size) and just pass the id of the user
    to the done callback
    PS: You dont have to do it like this its just usually done like this
    */
    console.log("serializer ", user)
    done(null, user._id);
  });

  passport.deserializeUser(function (id, done) {
    /*
    Instead of user this function usually recives the id 
    then you use the id to select the user from the db and pass the user obj to the done callback
    PS: You can later access this data in any routes in: req.user
    */
    console.log("user id", id)
    done(err, id)
  });

  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },
    async function (accessToken, refreshToken, profile, done) {
      const {
        id,
        displayName,
        _json: { email, family_name, given_name, picture },
        provider,
      } = profile

      const jwtToken = jwt.sign({ data: { email, accessToken } }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24 * 7
      })

      try {
        const existingGoogleAccount = await User.findOne(
          { "provider.googleId": id },
        );

        if (!existingGoogleAccount) {
          const existingEmailAccount = await User.findOneAndUpdate(
            { email },
            {
              "provider.googleId": id, 
              verificationToken: jwtToken
            },
            {
              new: true,
              runValidators: true,
            }
          );

          if (!existingEmailAccount) {
            const newAccount = new User({
              fullName: displayName,
              firstName: given_name,
              lastName: family_name,
              email,
              userName: email,
              occupation: "occupation",
              phoneNumber: 121,
              profilePic: picture,
              "provider.googleId": id,
              verificationToken: jwtToken

            })
            if (!newAccount.validateSync()) {
              await newAccount.save();
              return done(null, newAccount);
            } else {
              throw new Error()
            }
          } else {
            throw new Error()
          }
          return done(null, existingEmailAccount);
        }
        return done(null, existingGoogleAccount);
      } catch (error) {
        throw new Error(error);
      }
    }
  ));
}
