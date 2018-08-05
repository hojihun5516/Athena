const
  passport = require('passport'),
  KakaoStrategy = require('passport-kakao'),
  db_config = require('./modules/db_config'),
  sql = require('./modules/db_sql')(),
  secret = require('./modules/secret'),
  app = express();


app.use(express.static('dist'));

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


app.get('/', function(req, res) {
  res.send('<a href="/kakao">kakao Login</a>');
});

// login for kakao
app.get('/kakao', passport.authenticate('kakao-login'));

app.get('/oauth/kakao/callback', passport.authenticate('kakao-login', {
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
