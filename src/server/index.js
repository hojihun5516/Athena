const express = require('express');
const os = require('os');
const
  passport = require('passport'),
  KakaoStrategy = require('passport-kakao'),
  db_config = require('./modules/db_config'),
  sql = require('./modules/db_sql')(),
  app = express();

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('dist'));

passport.use('kakao-login', new KakaoStrategy({
    clientID: '836c89b8e516affc7eed3300b54bb438',
    clientSecret: 'N3m98beL3tQFt7vlcUp9A4gydkuOFWIC',
    callbackURL: 'http://localhost:3000/oauth/kakao/callback'
},
function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
}));

app.get('/', function (req, res) {
  res.send('<a href="/kakao">kakao Login</a>');
});
//카카오로 로그인 하기
app.get('/kakao', passport.authenticate('kakao-login'));

app.get('/oauth/kakao/callback', passport.authenticate('kakao-login',{
    successRedirect : '/profile',
    failureRedirect : '/'
}));

passport.serializeUser(function(user, done) {
  infoProvider = user.provider
  userInfo = user._json;

  console.log(userInfo.id);
  console.log(infoProvider);

  sql.checkSameUser(userInfo.id, function(err, data){
    if (err) console.log(err);
    else console.log(data);
  });
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.get('/profile', function(req, res){
  res.send('success');
});

app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

app.listen(3000, () => console.log('Listening on port 3000!'));
