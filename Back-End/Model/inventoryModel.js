const mongoose = require('mongoose')

const inventorySchema = mongoose.Schema({
    Item_Name:{
        type:String,
        required:[true, 'please add Item Name'],
    }
}, {
    timestamps:true,
})

module.exports = mongoose.model('Inventory', inventorySchema)