const express = require('express')
const router = express.Router()
const { getDeletedItems, UndeleteDeletedItems } = require('../controller/deletedItemController')


router.route('/').get(getDeletedItems)
router.route('/:id').delete(UndeleteDeletedItems)


module.exports = router