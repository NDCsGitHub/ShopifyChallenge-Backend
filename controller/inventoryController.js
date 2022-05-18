const asyncHandler = require('express-async-handler')
const {Inventory} = require('../Model/inventoryModel')
const {DeletedItems} = require('../Model/deleteModel')

//@desc GET inventory items
//@route GET/api/inventory
//@access public
const getInventoryItem = asyncHandler (async (req, res) => {

    //Get all items in inventory collection
    const inventory = await Inventory.find()
    res.status(200).json(inventory)

})


//@desc create a new inventory item
//@route POST /api/inventory
//@access public
const createInventoryItem = asyncHandler (async (req,res) => {

    // Condition: IF ANY OF THE FIELDS ARE EMPTY
    // 1. send status code 400
    // 2. throw error message
    if(!req.body.Item_Name || !req.body.Quantity || !req.body.Item_Description){
        res.status(400)
        throw new Error('Please Make Sure All Fields Are Complete')
    }

    
    // Condition: Default
    // 1. Creat new item in Invetory collection
    // 2. return the newly added item
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


    // Condition: IF ID IS NOT FOUND
    // 1. send status code 400
    // 2. throw error message
    const inventory = await Inventory.findById(req.params.id)
    if(!inventory){
        res.status(400)
        throw new Error('Item Not Found')
    }

    // Condition: IF DELETE COMMENT IS MISSING
    // 1. send status code 400
    // 2. throw error message
    if(!req.body.Delete_Comments){
        res.status(400)
        throw new Error('Please make sure Deleted Comments are filled out')
    }



    // Condition: IF ID IS FOUND
    // 1. add deleted item in the DeletedItems Collection in the database
    // 2. remove the item from the Inventory Collection in the database
    // 3. return the new list so front end can rerender
    const itemDeleted =  await DeletedItems.create({
        Item_Name:req.body.Item_Name,
        Quantity:req.body.Quantity,
        Item_Description:req.body.Item_Description,
        Delete_Comments:req.body.Delete_Comments,
    })

    await inventory.remove()

    const newInventory = await Inventory.find()

    res.status(200).json({
        id:req.params.id,
        newList:newInventory,
        itemDeleted: itemDeleted,
    })
})





module.exports = {
    getInventoryItem,
    createInventoryItem,
    updateInventoryItem,
    deleteInventoryItem,
}