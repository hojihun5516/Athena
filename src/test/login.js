const
  express = require('express'),
  passport = require('passport'),
  mysql = require('mysql'),
  KakaoStrategy = require('passport-kakao'),
  db_config = require('./db_config'),
  sql = require('./db_sql')(),

  app = express();

app.use(passport.initialize());
app.use(passport.session());
passport.use('kakao-login', new KakaoStrategy({
    clientID: '836c89b8e516affc7eed3300b54bb438',
    clientSecret: 'N3m98beL3tQFt7vlcUp9A4gydkuOFWIC',
    callbackURL: 'http://localhost:3000/oauth/kakao/callback'
},
function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
}));

passport.serializeUser(function(user, done) {
  infoProvider = user.provider
  userInfo = user._json;

  console.log(userInfo.id);
  console.log(infoProvider);

  sql.checkSameUser(userInfo.id, function(err, data){
    if (err) console.log(err);
    else console.log(data);

    sql.pool.end(function(err){
      if (err) console.log(err);
      else {
        console.log('Connection pool has closed');
      }
    });
  });

  done(null, user);
});


passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.get('/', function (req, res) {
  res.send('<a href="/kakao">kakap</a> <br/> <a href="/facebook">face</a> <br/> <a href="/naver">nav</a> <br/>');
});
app.get('/kakao', passport.authenticate('kakao-login'));
app.get('/oauth/kakao/callback', passport.authenticate('kakao-login',{
    successRedirect : '/profile',
    failureRedirect : '/'
}));

app.get('/profile', function(req, res){
  res.send('success');
});

app.listen(3000, function() {
  console.log("run Server...");
});
