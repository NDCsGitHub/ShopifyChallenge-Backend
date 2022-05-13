const express = require('express')
const dotenv = require('dotenv').config()
const app = express()







app.get('/api/inventory', (req,res) => {
    res.send('get inventory')
})





// define port and set listen
const port = process.env.PORT  || 8000
app.listen(port, () => console.log(`server started on port ${port}`))