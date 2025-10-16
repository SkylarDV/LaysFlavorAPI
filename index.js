const express = require('express')

const app = express()
const port = 3000

app.use(express.json())

const apiBag = require('./routers/api/bag')

app.use('/api/bag', apiBag);
app.listen(port, () => {console.log(`Example app listening on port ${port}`)})
