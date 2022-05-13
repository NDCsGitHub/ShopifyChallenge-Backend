const asyncHandler = require('express-async-handler')


//@desc GET inventory item
//@route GET/api/inventory
//@access public
const getInventoryItem = asyncHandler (async (req, res) => {
    res.status(200).json({
        message:'Get Inventory'
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

    res.status(200).json({
        message: 'create inventory'
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