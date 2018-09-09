const express = require('express')
const passport = require('passport')
const KakaoStrategy = require('passport-kakao')
const NaverStrategy = require('passport-naver')
const FacebookStrategy = require('passport-facebook')
// GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
const sql = require('./db/db_sql')()
const board = require('./db/board')()
const os = require('os')
const secret = require('./db/secret')
const session = require('express-session')
const bodyParser = require('body-parser')

const app = express();

app.use(express.static('../../public'));
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'athena01'
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());

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

// passport.use('google-login', new GoogleStrategy({
//     clientID: secret.google.client_id,
//     clientSecret: secret.google.secret_id,
//     callbackURL: secret.google.callback_url
//   },
//   function(accessToken, refreshToken, profile, done) {
//       User.findOrCreate({ googleId: profile.id }, function (err, user) {
//         return done(err, user);
//       });
//   }
// ));

// login for social community
app.get('/kakao', passport.authenticate('kakao-login'));
app.get('/naver', passport.authenticate('naver-login'));
app.get('/facebook', passport.authenticate('facebook-login'));
app.get('/google', passport.authenticate('google-login'));

app.get('/oauth/kakao/callback', passport.authenticate('kakao-login', {
  failureRedirect: '/',
  successRedirect: '/profile'
}));
app.get('/oauth/naver/callback', passport.authenticate('naver-login', {
  failureRedirect: '/',
  successRedirect: '/profile'
}));
app.get('/oauth/facebook/callback', passport.authenticate('facebook-login', {
  failureRedirect: '/',
  successRedirect: '/profile'
}));
app.get('/oauth/google/callback', passport.authenticate('google-login', {
  failureRedirect: '/',
  successRedirect: '/profile'
}));

passport.serializeUser(function(user, done) {
  infoProvider = user.provider
  userInfo = user._json;

  console.log(userInfo.id);
  console.log(infoProvider);
  console.log(userInfo);

  sql.checkSameUser(userInfo.id, function(err, data) {
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

app.get('/profile', function(req, res) {
  res.send('success');
});

app.get('/api/getUsername', (req, res) => res.send({
  username: os.userInfo().username
}));

//board를 db에 등록하고 저장된 정보를 json으로 response
app.post('/board', function(req, res) {
  console.log(req.body);
  board.write(req.body, function(err, result) {
    board.show(result.insertId, function(showErr, data) {
      res.json(data[0]);
    })
  });
})

app.listen(8080, () => console.log('Listening on port 8080!'));
