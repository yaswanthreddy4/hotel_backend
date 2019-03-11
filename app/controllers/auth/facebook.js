var passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../../models/user.model');

passport.use(new FacebookStrategy({
        clientID: "296470027660842",
        clientSecret: "77e5167cc27ae412b8dda6c5fe5de549",
        callbackURL: "http://127.0.0.1:3030/hotels"
    },
    function(accessToken, refreshToken, profile, done) {
        User.findOrCreate({
            name: profile.displayName
        }, {
            name: profile.displayName,
            userid: profile.id
        }, function(err, user) {
            if (err) {
                return done(err);
            }
            done(null, user);
        });
    }
));

module.exports = passport;