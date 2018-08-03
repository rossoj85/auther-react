const router = require('express').Router();
const {User} = require('../../db/models');
const HttpError = require('../../utils/HttpError');
const passport = require('passport')
const facebookStrategy = require('passport-facebook').Strategy;


passport.use(
    new facebookStrategy({
    clientID: '674863049539685',
    clientSecret: 'bf471de83cac68df88ab9f9109bbda5a',
    callbackURL: "/api/auth/facebook/verify",
    profileFields: ['id', 'displayName','first_name','last_name', 'email','picture']
  },
  function(accessToken, refreshToken, profile, done) {
    console.log('---', 'in verification callback', profile, '---');
    var info ={
        //these are the fields on our user model
        name: profile.displayName,
        email: profile.emails[0].value,
        photo: profile.photos ? profile.photos[0].value : undefined
    }
    console.log('EMAILLLLLLLLLLLLDSFALLSADFLDSAFL', profile.emails[0].value)
    User.findOrCreate({
        where: {facebookId: profile.id},
        //if the persons id(which is the same as their gogle id) is not in db, we use 'defaults' to set up thier profile in our app
        defaults: info,
    })
    //all that spread does is flatten an array
    .spread(user=>{
        done(null, user)
    })
    .catch(done)

  }
));
router.get('/', passport.authenticate('facebook', { scope: 'email' }))

router.get('/verify',
  passport.authenticate('facebook', {
    successRedirect: '/', // or wherever
    failureRedirect: '/' // or wherever
  })
);
module.exports=router