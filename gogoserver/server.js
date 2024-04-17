const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
app.use(
  cors({
      origin: process.env.CLIENT_URL,
      methods: 'GET,HEAD,PUT,POST,DELETE',
      credentials: true
  })
);
// app.use(cors());

// require('dotenv').config({ path: process.env.NODE_ENV === 'staging' ? '.env.staging' : '.env' });

// passport
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const logger = require('morgan');

//! In-memory user storage
let users = [];

function ensureAuthenticated(req, res, next) {
  console.log('ensureAuth User:\n', req.user);
  console.log('ensure Auth Session ID:', req.sessionID);

  if (req.isAuthenticated()) {
      return next();
  }
  res.status(401).json({ error: true, message: 'User is not authenticated' });
}

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
passport.serializeUser(function(user, done) {
  console.log('Serializing user:', user);
  done(null, user.email);
});

passport.deserializeUser(function(email, done) {
  let user = users.find(user => user.email === email);
  console.log('Deserializing user:', user);
  done(null, user);
});

app.use(express.json()); // for parsing application/json

// session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));
// app.use(passport.authenticate('session'));

app.use(passport.initialize());
app.use(passport.session());

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

//! no db connection
app.post('/register', async (req, res, next) => {
  const { email, password } = req.body;

  if (users.find(user => user.email === email)) {
    return res.status(400).send('Email already exists');
  }

  
  try {
    const user = { email, password };
    users.push(user);

    req.logIn(user, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                error: true,
                message: 'An error occurred during login.'
            });
        }
        console.log('\n Session ID:'+ req.sessionID);
        res.json({
            error: false,
            message: 'User has been created and logged in.',
            user: user,
            sessionID: req.sessionID
        });
    });
} catch (error) {
    console.log(error);
    res.status(500).json({
        error: true,
        message: 'Error creating user. Please try again or use different credentials.'
    });
}
});

app.post('/login', 
  passport.authenticate('local'),
  function(req, res) {
    console.log('\n Session ID:'+ req.sessionID);
    console.log('\n Session:'+ JSON.stringify(req.session)); // log the session data
    console.log('\n user:'+ JSON.stringify(req.user)); // log the user data
    res.status(200).send({ message: 'User logged in', user: req.user, sessionID: req.sessionID });
  });

  app.get('/logout', (req, res) => {
    req.logout(() => {
      req.session.destroy(err => {
        if (err) {
          return res.status(500).json({ error: true, message: 'Could not destroy session' });
        } else {
          res.clearCookie('connect.sid'); // replace 'connect.sid' with  cookie name if it's different
          res.json({ error: false, message: 'User has successfully logged out' });
          console.log('User has successfully logged out');
        }
      });
    });
  });

//* dev route to test user authentication
app.get('/test', ensureAuthenticated, (req, res) => {
  console.log('/test User:', req.user);
  console.log('/testSession ID:', req.sessionID);

  res.json({ user: req.user, sessionID: req.sessionID });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});