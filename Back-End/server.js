import express from 'express'
import cors from 'cors'
import inventory from './api/inventory.route.js'

// start express with app
const app = express()

// middleware
app.use(cors())
app.use(express.json)


// access all inventory
app.use('/api/v1/inventory', inventory)


// wild card route
app.use('*', (req,res) => res.status(404).json({error:'Link Not Fount'}))



export default app