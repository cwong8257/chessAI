const { Strategy, ExtractJwt } = require('passport-jwt');

const User = require('../models/User');

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_OR_PRIVATE_KEY;

module.exports = (passport) => {
  passport.use(new Strategy(opts, async (payload, done) => {
    try {
      const user = await User.findById(payload.id);

      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    } catch (err) {
      return console.log(err);
    }
  }));
};
