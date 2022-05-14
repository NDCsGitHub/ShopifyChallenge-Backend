const mongoose = require('mongoose')

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

}, {
    timestamps:true,
})

module.exports = mongoose.model('Inventories', inventorySchema)