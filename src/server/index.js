const
  express = require('express'),
  passport = require('passport'),
  KakaoStrategy = require('passport-kakao'),
  NaverStrategy = require('passport-naver'),
  FacebookStrategy = require('passport-facebook'),
  // GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
  sql = require('./db/db_sql')(),
  secret = require('./db/.secret'),
  os = require('os'),
  session = require('express-session'),

  app = express();


app.use(express.static('../../public'));
app.use(session({
  secret: 'athena01',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use('kakao-login', new KakaoStrategy({
    clientID: secret.kakao.client_id,
    clientSecret: secret.kakao.secret_id,
    callbackURL: secret.kakao.callback_url
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }));

passport.use('naver-login', new NaverStrategy({
    clientID: secret.naver.client_id,
    clientSecret: secret.naver.secret_id,
    callbackURL: secret.naver.callback_url
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }));

passport.use('facebook-login', new FacebookStrategy({
    clientID: secret.facebook.client_id,
    clientSecret: secret.facebook.secret_id,
    callbackURL: secret.facebook.callback_url
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
  successRedirect: '/profile',
  failureRedirect: '/'
}));
app.get('/oauth/naver/callback', passport.authenticate('naver-login', {
  successRedirect: '/profile',
  failureRedirect: '/'
}));
app.get('/oauth/facebook/callback', passport.authenticate('facebook-login', {
  successRedirect: '/profile',
  failureRedirect: '/'
}));
app.get('/oauth/google/callback', passport.authenticate('google-login', {
  successRedirect: '/profile',
  failureRedirect: '/'
}));

passport.serializeUser(function(user, done) {
  infoProvider = user.provider
  userInfo = user._json;

  console.log(userInfo.id);
  console.log(infoProvider);

  sql.checkSameUser(userInfo.id, function(err, data) {
    if (err) console.log(err);
    else console.log(data);
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

app.listen(8080, () => console.log('Listening on port 8080!'));
