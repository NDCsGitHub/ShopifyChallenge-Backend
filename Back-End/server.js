const express = require('express')
const dotenv = require('dotenv').config()
const app = express()
const { errorHandler } = require('./middleware/errorMiddleware')


// add middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))




app.use('/api/inventory', require('./routes/inventoryRoutes.js'))



app.use(errorHandler)




// define port and set listen
const port = process.env.PORT  || 8000
app.listen(port, () => console.log(`server started on port ${port}`))