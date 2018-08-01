const router = require('express').Router();
const {User} = require('../../db/models');
const HttpError = require('../../utils/HttpError');
const passport = require('passport')

router.get('/auth/google', passport.authenticate('google', { scope: 'email' }))

router.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/', // or wherever
    failureRedirect: '/' // or wherever
  })
);

module.exports= router