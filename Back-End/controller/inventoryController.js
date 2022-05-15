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

    // if any of the fields are empty, return error message
    if(!req.body.Item_Name || !req.body.Quantity || !req.body.Item_Description){
        res.status(400)
        throw new Error('Please Make Sure All Fields Are Complete')
    }

    
    const inventory  = await Inventory.create({
        Item_Name:req.body.Item_Name,
        Quantity:req.body.Quantity,
        Item_Description:req.body.Item_Description,
    })

    res.status(200).json({
        message:'Item Added!',
        inventory: inventory
    })
})


//@desc update a inventory item
//@route PUT /api/inventory/:id
//@access public
const updateInventoryItem = asyncHandler (async (req, res) => {

    //find if item in inventroy doesnt exist
    const inventory = await Inventory.findById(req.params.id)
    if(!inventory){
        res.status(400)
        throw new Error('Item Not Found')
    }

    // if inventory Item exists then update inventory, and also return new list to update frontend render
    const updatedInventory = await Inventory.findByIdAndUpdate(
            req.params.id, 
            req.body,
            {
                new:true,
            }
        )

    const newInventory = await Inventory.find()    
    res.status(200).json({
        newList:newInventory,
        updatedItem:updatedInventory
    })
})


//@desc delete a inventory item
//@route DELETE /api/inventory/:id
//@access public
const deleteInventoryItem = asyncHandler (async (req, res) => {

    // if id is not found, throw error
    const inventory = await Inventory.findById(req.params.id)
    if(!inventory){
        res.status(400)
        throw new Error('Item Not Found')
    }

    // if if is found, remove the item, and also return the new list so front end can rerender
    await inventory.remove()
    const newInventory = await Inventory.find()

    res.status(200).json({
        id:req.params.id,
        newList:newInventory
    })
})





module.exports = {
    getInventoryItem,
    createInventoryItem,
    updateInventoryItem,
    deleteInventoryItem,
}