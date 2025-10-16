const express = require('express')
const mongoose = require('mongoose')
const config = require('./config')

const app = express()
const port = config.port

// MongoDB connection
const mongoURI = config.getMongoUri()

mongoose.connect(mongoURI)
    .then(() => console.log(`MongoDB connected successfully`))
    .catch(err => console.error('MongoDB connection error:', err))

app.use(express.json())

const apiBag = require('./routers/api/bag')

app.use('/api/bag', apiBag);

app.listen(port, () => {console.log(`Server listening on port ${port} in ${process.env.NODE_ENV || 'development'} mode`)})
