require('dotenv').config()
require('sqreen')
const express = require('express')
const helmet = require('helmet')
const path = require('path')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const LocalStrategy = require('passport-local').Strategy
const passportLocalMongoose = require('passport-local-mongoose')
const app = express()

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.use(helmet())

app.use(
  session({
    name: 'session-id',
    secret: process.env.SECRET,
    saveUninitialized: false,
    resave: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  }),
)

app.use(passport.initialize())
app.use(passport.session())

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
})
UserSchema.plugin(passportLocalMongoose)
const User = mongoose.model('User', UserSchema)

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
app.use(express.static(path.join(__dirname, '/../build')))
app.use(bodyParser.urlencoded({ extended: true }))

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  } else {
    res.json({
      err: 'Not authenticated',
    })
  }
}

app.get('/api/getList', ensureAuthenticated, (req, res) => {
  var list = ['item1', 'item2', 'item3', 'item4']
  res.json(list)
})

app.post('/api/signup', (req, res, next) => {
  User.register(
    new User({
      username: req.body.username,
    }),
    req.body.password,
    (err, user) => {
      if (err) {
        res.statusCode = 500
        res.setHeader('Content-Type', 'application/json')
        res.json({
          err: err,
        })
      } else {
        passport.authenticate('local')(req, res, () => {
          User.findOne(
            {
              username: req.body.username,
            },
            (err, person) => {
              res.statusCode = 200
              res.setHeader('Content-Type', 'application/json')
              res.json({
                success: true,
                status: 'Registration Successful!',
              })
            },
          )
        })
      }
    },
  )
})

app.post('/api/signin', passport.authenticate('local'), (req, res) => {
  User.findOne(
    {
      username: req.body.username,
    },
    (err, person) => {
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.json({
        success: true,
        status: 'You are successfully logged in!',
      })
    },
  )
})

app.get('/api/logout', (req, res, next) => {
  if (req.session) {
    req.logout()
    req.session.destroy(err => {
      if (err) {
        console.log(err)
      } else {
        res.clearCookie('session-id')
        res.json({
          message: 'You are successfully logged out!',
        })
      }
    })
  } else {
    var err = new Error('You are not logged in!')
    err.status = 403
    next(err)
  }
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../build/index.html'))
})

const port = process.env.PORT || 5000
app.listen(port)

console.log('App is listening on port ' + port)
// console.log(process.env.MONGODB_URI)
