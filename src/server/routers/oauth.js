const express = require('express')
const passport = require('passport')
const KakaoStrategy = require('passport-kakao')
const NaverStrategy = require('passport-naver')
const FacebookStrategy = require('passport-facebook')

const sql = require('../db/db_sql')()
const secret = require('../db/secret')

const router = express.Router();

passport.use('kakao-login', new KakaoStrategy({
    callbackURL: secret.kakao.callback_url,
    clientID: secret.kakao.client_id,
    clientSecret: secret.kakao.secret_id
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }));

passport.use('naver-login', new NaverStrategy({
    callbackURL: secret.naver.callback_url,
    clientID: secret.naver.client_id,
    clientSecret: secret.naver.secret_id
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }));

passport.use('facebook-login', new FacebookStrategy({
    callbackURL: secret.facebook.callback_url,
    clientID: secret.facebook.client_id,
    clientSecret: secret.facebook.secret_id
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }));

// login for social community
router.get('/kakao', passport.authenticate('kakao-login'));
router.get('/naver', passport.authenticate('naver-login'));
router.get('/facebook', passport.authenticate('facebook-login'));
router.get('/google', passport.authenticate('google-login'));

router.get('/kakao/callback', passport.authenticate('kakao-login', {
  failureRedirect: '/',
  successRedirect: '/profile'
}));
router.get('/naver/callback', passport.authenticate('naver-login', {
  failureRedirect: '/',
  successRedirect: '/profile'
}));
router.get('/facebook/callback', passport.authenticate('facebook-login', {
  failureRedirect: '/',
  successRedirect: '/profile'
}));
router.get('/oauth/google/callback', passport.authenticate('google-login', {
  failureRedirect: '/',
  successRedirect: '/profile'
}));

passport.serializeUser(function(user, done) {
  // userInfo = user._json;
  // console.log(userInfo);

  sql.signIn(user, function(err, data) {
    if (err) {
      console.log(err);
      return done(null, false);
    };
    console.log(data.length);
  });
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = router;
