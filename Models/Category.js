const mongoose = require("mongoose")

const CategorySchema = new mongoose.Schema({
    name:
    {
        type:String,
        required:true
    },
    color:
    {
        type:String,
        required:true
    },
    icon:
    {
        type:String,
        required:true
    },
    image:
    {
        type:String,
        required:true
    },
})

CategorySchema.virtual("id").get(function(){
    return this._id.toHexString()
})

CategorySchema.set("toJSON",{
    virtuals:true
})

const Category = mongoose.model("Category",CategorySchema)

module.exports=Category

/*
"id":"1234",
"name":"abc",
"color":"red",
"icon":"icon1",
"image":"img1"
*/