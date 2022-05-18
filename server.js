const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const app = express()
const cors = require('cors')
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')


// connect to mongo
connectDB()

// add middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


// inventory routes
app.use('/api/inventory', require('./routes/inventoryRoutes.js'))

// deleted routes
app.use('/api/deleteditems', require('./routes/deletedItemsRoute.js'))


// overwrite default express error
app.use(errorHandler)



// define port and set listen
const port = process.env.PORT || 8000
app.listen(port, () => console.log(`server started on port ${port}`))