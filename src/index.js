const express = require('express')
const session = require('express-session')
const ConnectMongoDBSession = require('connect-mongodb-session')

const config = require('./config')
const app = express()

const MongoDBStore = ConnectMongoDBSession(session) 
const store = new MongoDBStore({
  uri: config.session.db.uri,
  collection: config.session.db.collection
})

store.on('error', (err) => console.log(err))

// Settings.
app.set('port', process.env.PORT || 4000)

// Middlewares.
app.use(session({
  name: 'app-session',
  secret: config.session.secret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60
  },
  store
}))

// Routes.
app.get('/', (req, res) => {
  res.redirect('/counter')
})

app.get('/counter', (req, res) => {
  let count = req.session.count
  req.session.count = count ? ++count : 1
  res.send(`count: ${req.session.count}`)
})

app.get('/destroy', (req, res) => {
  req.session.destroy()
  // res.redirect('/')
  res.send()
})

app.listen(app.get('port'), () => {
  console.log('Server on port: ', app.get('port'))
})