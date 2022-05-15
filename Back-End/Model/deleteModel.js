const mongoose = require('mongoose')

const deleteSchema = mongoose.Schema({
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
    Delete_Comments:{
        type:String,
        required:[true, 'please remember to add delete comments']
    },
},{
    timestamps:true
})

const DeletedItemsModel = mongoose.model('DeletedItems', deleteSchema)

module.exports = {
    DeletedItems: DeletedItemsModel,
}