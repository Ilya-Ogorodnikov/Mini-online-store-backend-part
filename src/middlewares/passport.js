const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const UserModel = require('../modules/models/user');
const { JWT_ACCESS_KEY } = require('../../config');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_ACCESS_KEY
};

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
  try {
    const user = await UserModel.findOne({ _id: jwt_payload.id, isAdmin: true });  
    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
}));