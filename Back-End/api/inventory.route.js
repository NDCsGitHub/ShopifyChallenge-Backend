// route file, this is where we create different routes people can have access

import express from 'express'

const router = express.Router()

router.route('/').get((req,res) => res.send('default inventroy route is working'))

export default router