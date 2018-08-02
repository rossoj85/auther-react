const router = require('express').Router();
const {User} = require('../../db/models');
const HttpError = require('../../utils/HttpError');
const passport = require('passport')
const googleStrategy = require('passport-google-oauth').OAuth2Strategy


passport.use(
    new googleStrategy({
        clientID: '660220876490-srsc8gpprc0kfcg919m0fp4lt84otl4u.apps.googleusercontent.com',
        clientSecret: 'wrEnZHp8_widvyyY45SiGhR2',
        callbackURL: '/api/auth/google/verify'
        //REMBER THAT THE CALLBACK URL MUST BE DEFINED ON THE GOOGLE CLOUD PLATFORM!!!!
    },
        function(token, refreshToken,profile,done){
            //verificatino callback:
            //recieve normalized profile data from provider(e.g. Google)
            //use it for our own purposes
                //find or create a user in our own database
            //call done to tell passport here is the user to log in as'
            // console.log('---------------USER IN GOOGLE', User)
            // console.log('---', 'in verification callback', profile, '---');
            var info ={
                //these are the fields on our user model
                name: profile.displayName,
                email: profile.emails[0].value,
                photo: profile.photos ? profile.photos[0].value : undefined
            }
            User.findOrCreate({
                where: {googleId: profile.id},
                //if the persons id(which is the same as their gogle id) is not in db, we use 'defaults' to set up thier profile in our app
                defaults: info,
            })
            .spread(user=>{
                done(null, user)
            })
            .catch(done)
        })
)


//Google authenticationa nd login
router.get('/', passport.authenticate('google', { scope: 'email' }))

//handle the callback after Google has authenticated the user
router.get('/verify',
  passport.authenticate('google', {
    successRedirect: '/', // or wherever
    failureRedirect: '/' // or wherever
  })
);

module.exports= router