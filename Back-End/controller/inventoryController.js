const asyncHandler = require('express-async-handler')
const Inventory = require('../Model/inventoryModel')

//@desc GET inventory item
//@route GET/api/inventory
//@access public
const getInventoryItem = asyncHandler (async (req, res) => {

    const inventory = await Inventory.find()

    res.status(200).json({
        inventory
    })
})


//@desc create a new inventory item
//@route POST /api/inventory
//@access public
const createInventoryItem = asyncHandler (async (req,res) => {
    if(!req.body.itemName){
        res.status(400)
        throw new Error('Please add a text field')
    }

    const inventory  = await Inventory.create({
        Item_Name:req.body.itemName
    })


    res.status(200).json({
        inventory
    })
})


//@desc update a inventory item
//@route PUT /api/inventory/:id
//@access public
const updateInventoryItem = asyncHandler (async (req, res) => {
    res.status(200).json({
        message: `update inventory ${req.params.id}`
    })
})


//@desc delete a inventory item
//@route DELETE /api/inventory/:id
//@access public
const deleteInventoryItem = asyncHandler (async (req, res) => {
    res.status(200).json({
        message: `delete inventory ${req.params.id}`
    })
})






module.exports = {
    getInventoryItem,
    createInventoryItem,
    updateInventoryItem,
    deleteInventoryItem,
}