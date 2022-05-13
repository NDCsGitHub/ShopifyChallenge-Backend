const asyncHandler = require('express-async-handler')
const Inventory = require('../Model/inventoryModel')

//@desc GET inventory items
//@route GET/api/inventory
//@access public
const getInventoryItem = asyncHandler (async (req, res) => {

    const inventory = await Inventory.find()

    res.status(200).json(inventory)

})


//@desc create a new inventory item
//@route POST /api/inventory
//@access public
const createInventoryItem = asyncHandler (async (req,res) => {
    if(!req.body.Item_Name){
        res.status(400)
        throw new Error('Please add a text field')
    }

    const inventory  = await Inventory.create({
        Item_Name:req.body.Item_Name
    })


    res.status(200).json(inventory)
})


//@desc update a inventory item
//@route PUT /api/inventory/:id
//@access public
const updateInventoryItem = asyncHandler (async (req, res) => {

    //find if item in inventroy exists
    const inventory = await Inventory.findById(req.params.id)
    if(!inventory){
        res.status(400)
        throw new Error('Item Not Found')
    }

    // if inventory Item exists then update inventory
    const updatedInventory = await Inventory.findByIdAndUpdate(
            req.params.id, 
            req.body,
            {
                new:true,
            }
        )
    res.status(200).json(updatedInventory)
})


//@desc delete a inventory item
//@route DELETE /api/inventory/:id
//@access public
const deleteInventoryItem = asyncHandler (async (req, res) => {

    const inventory = await Inventory.findById(req.params.id)
    if(!inventory){
        res.status(400)
        throw new Error('Item Not Found')
    }

    await inventory.remove()

    res.status(200).json({id:req.params.id})
})






module.exports = {
    getInventoryItem,
    createInventoryItem,
    updateInventoryItem,
    deleteInventoryItem,
}