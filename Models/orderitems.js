const mongoose = require("mongoose")

const OrdersItemsSchema = new mongoose.Schema({
    product:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref : "Products",
        required:true
    },
    quantity:
    {
        type:Number,
        required:true
    },
})

OrdersItemsSchema.virtual("id").get(function(){
    return this._id.toHexString()
})

OrdersItemsSchema.set("toJSON",{
    virtuals:true
})

const orderitems = mongoose.model("Orderitems",OrdersItemsSchema)

module.exports=orderitems