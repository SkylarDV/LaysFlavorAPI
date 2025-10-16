const express = require('express')
const mongoose = require('mongoose')
const config = require('./config')
const CORS = require('cors')

const app = express()
const port = config.port || 3000
const passport = require('passport')

const mongoURI = config.getMongoUri()

mongoose.connect(mongoURI)
    .then(() => console.log(`MongoDB connected successfully`))
    .catch(err => console.error('MongoDB connection error:', err))

app.use(express.json())
app.use(CORS())
app.use(passport.initialize());

const apiBag = require('./routers/api/bag')
const apiUser = require('./routers/api/user')
const apiVote = require('./routers/api/vote')

app.use('/api/bag', apiBag);
app.use('/api/user', apiUser);
app.use('/api/vote', apiVote);

app.listen(port, () => {console.log(`Server listening on port ${port} in ${process.env.NODE_ENV || 'development'} mode`)})
