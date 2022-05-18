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
//@route DELETE /api/deleteditems
//@access public
const UndeleteDeletedItems = asyncHandler (async (req, res) => {

    //Condition: IF ID IS NOT FOUND
    //1. send status code 400
    //2. throw error message
    const deletedItem = await DeletedItems.findById(req.params.id)
    if(!deletedItem){
        res.status(400)
        throw new Error('Item Not Found In Database for Deletion')
    }

    // Condition: Default
    // 1. move undeleted item to inventroy collection
    // 2. remove the item from the deleted collection in the database
    // 3. return new list of deleted items so front end can rerender
    const itemUndeleted = await Inventory.create({
        Item_Name: req.body.Item_Name,
        Quantity:req.body.Quantity,
        Item_Description:req.body.Item_Description,
    })

    await deletedItem.remove()

    const deletedItems = await DeletedItems.find()

    res.status(200).json({
        id: req.params.id,
        newList:deletedItems,
        itemUndeleted: itemUndeleted
    })

})


module.exports = {
    getDeletedItems,
    UndeleteDeletedItems,
}