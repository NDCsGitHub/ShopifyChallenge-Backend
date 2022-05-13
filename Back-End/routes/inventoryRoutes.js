const express = require('express')
const router = express.Router()
const { getInventoryItem, createInventoryItem, updateInventoryItem, deleteInventoryItem } = require('../controller/inventoryController')



router.route('/').get(getInventoryItem).post(createInventoryItem)

router.route('/:id').put(updateInventoryItem).delete(deleteInventoryItem)




module.exports = router