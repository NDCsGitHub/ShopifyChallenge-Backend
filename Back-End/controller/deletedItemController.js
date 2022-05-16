const asyncHandler = require('express-async-handler')
const {DeletedItems} = require('../Model/deleteModel')
const {Inventory} = require('../Model/inventoryModel')




//@desc GET Deleted items
//@route GET/api/deleteditems
//@access public
const getDeletedItems = asyncHandler (async (req, res) => {

    //Get all items in deleted collection
    const deletedItems = await DeletedItems.find()
    res.status(200).json(deletedItems)

})


//@desc Undelete deleted items (back to active inventory)
//@route GET/api/deleteditems
//@access public
const UndeleteDeletedItems = asyncHandler (async (req, res) => {



})


module.exports = {
    getDeletedItems,
    UndeleteDeletedItems,
}