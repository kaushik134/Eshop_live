const mongoose = require("mongoose")

const OrdersSchema = new mongoose.Schema({
    orderitems:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Orderitems",
            required:true
        },
    ],
    shippingAddress1:
    {
        type:String,
        required:true
    },
    shippingAddress2:
    {
        type:String
    },
    city:
    {
        type:String,
        required:true
    },
    zip:
    {
        type:String,
        required:true
    },
    country:
    {
        type:String,
        required:true
    },
    phone:
    {
        type:Number,
        required:true
    },
    status:
    {
        type:String,
        required:true,
        default:"pending"
    },
    totalprice:
    {
        type:Number,
        required:true
    },
    user:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref : "Users",
        required:true
    },
    dateOrdered:
    {
        type:Date,
        default:Date.now()
    },
})

OrdersSchema.virtual("id").get(function (){
    return this._id.toHexString()
})

OrdersSchema.set("toJSON",{
    virtuals:true
})

const order = mongoose.model("Orders",OrdersSchema)

module.exports=order

/*
{
    "orderitems" :[
        {
            "quantity":3,
            "product":"63ca87c8ee97daa1460bf442"
        },
        {
            "quantity":2,
            "product":"63ca8b80a877b8dbfe56dcd5"
        },
    ], 
    "shippingAddress1" :"surat", 
    "shippingAddress2" :"surat", 
    "city" :"surat", 
    "zip" :"395001", 
    "country" :"india", 
    "phone" :6353125194,
    "user" :"63ca856b9b2a7c198c7ab1c6", 
}
*/