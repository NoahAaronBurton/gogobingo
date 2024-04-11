const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

// passport
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const logger = require('morgan');

//! In-memory user storage
let users = [];

//! no db connection
passport.use(new LocalStrategy(
    { usernameField: 'email' },
    function(email, password, done) {
        let user = users.find(user => user.email === email);
        if (!user) { return done(null, false); }
        if (user.password !== password) { return done(null, false); }
        return done(null, user);
    }
));
passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      cb(null, { id: user.id, username: user.username });
    });
  });
  
  passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
  });

app.use(express.json()); // for parsing application/json

// session
app.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.authenticate('session'));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

//! no db connection
app.post('/register', (req, res) => {
    const { email, password } = req.body;

    if (users.find(user => user.email === email)) {
        return res.status(400).send('Email already exists');
    }

    users.push({ email, password });

    console.log(users);
    res.status(201).send('User registered');
});

app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    console.log('\n Session ID:'+ req.sessionID);
    console.log('\n Session:'+ JSON.stringify(req.session)); // log the session data
    console.log('\n user:'+ JSON.stringify(req.user)); // log the user data
    res.status(200).send({ message: 'User logged in', user: req.user, sessionId: req.sessionID });
  });

app.post('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
});  


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});