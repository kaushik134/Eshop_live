const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name:
    {
        type:String,
        required:true
    },
    email:
    {
        type:String,
        required:true
    },
    password:
    {
        type:String,
        required:true
    },
    street:
    {
        type:String,
        required:true
    },
    apartment:
    {
        type:String,
        required:true
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
    isAdmin:
    {
        type:Boolean,
        required:true
    },
})

UserSchema.virtual("id").get(function(){
    return this._id.toHexString()
})

UserSchema.set("toJSON",{
    virtuals:true
})

const user = mongoose.model("Users",UserSchema)

module.exports=user

/* 
"id" : "1234",
"name" : "kaushik",
"email" : "kaushikvaghasiya12@gmail.com",
"password" : "kaushik12",
"street" : "605, surbhi the royal town",
"apartment" : "passodara patiya , kamrej road",
"city" : "surat",
"zip" : "394185",
"country" : "india",
"phone" : 635125194,
"isAdmin" : true
*/