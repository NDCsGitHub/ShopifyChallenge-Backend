const mongoose = require('mongoose')



const deleteSchema = mongoose.Schema({
    Delete_Comments:{
        type:String,
        required:[true, 'please remember to add delete comments']
    },
},{
    timestamps:true
})


const inventorySchema = mongoose.Schema({
    Item_Name:{
        type:String,
        required:[true, 'please add Item Name'],
    },
    Quantity:{
        type:String,
        required:[true, 'please add Quantity']
    },
    Item_Description:{
        type:String,
        required:[true, 'please add Item Description']
    },
    Delete:[deleteSchema]
}, {
    timestamps:true,
})



const InventoriesModel = mongoose.model('Inventories', inventorySchema)
const DeletedItemsModel = mongoose.model('DeletedItems', inventorySchema)

module.exports = {
    Inventory: InventoriesModel,
    DeletedItems: DeletedItemsModel,
}