const express = require('express')
const passport = require('passport')
const session = require('express-session')
const bodyParser = require('body-parser')

//라우터들
const oauth = require('./routers/oauth')
const group = require('./routers/group')

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

//라우터 사용 - 앞의 url로 시작하는 요청이 들어오면 뒤의 라우터 사용
app.use('/oauth', oauth);
app.use('/groups', group);

app.get('/profile', function(req, res) {
  console.log("session - " + req.user.id);
  res.send('success');
});

app.use(function(err, req, res, next) {
  console.log(`error occurrence : ${err}`);
  res.status(500).json({
    errorMassage: err,
    success: false
  });
})

app.listen(8080, () => console.log('Listening on port 8080!'));
