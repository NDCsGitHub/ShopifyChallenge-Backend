const express = require('express')
const router = express.Router()






router.get('/', (req,res) => {
    res.status(200).json({
        message: 'get inventory'
    })
})

router.post('/', (req,res) => {
    res.status(200).json({
        message: 'create inventory'
    })
})

router.get('/', (req,res) => {
    res.status(200).json({
        message: 'get inventory'
    })
})

router.get('/', (req,res) => {
    res.status(200).json({
        message: 'get inventory'
    })
})




module.exports = router