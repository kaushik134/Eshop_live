const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    name:
    {
        type: String,
        required: true
    },
    description:
    {
        type: String,
        required: true
    },
    richDescription:
    {
        type: String,
        required: true
    },
    image:
    {
        type: String,
        required: true
    },
    images:
    {
        type: String,
        required: true
    },
    brand:
    {
        type: String,
        required: true
    },
    price:
    {
        type: Number,
        required: true
    },
    category:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    countstock:
    {
        type: Number,
        required: true
    },
    ratting:
    {
        type: Number,
        required: true
    },
    isFeatured:
    {
        type: Boolean,
        required: true
    },
    dateOrdered:
    {
        type: Date,
        default: Date.now()
    },
})

ProductSchema.virtual("id").get(function () {
    return this._id.toHexString()
})

ProductSchema.set("toJSON", {
    virtuals: true
})

const products = mongoose.model("Products", ProductSchema)

module.exports = products

/*
"name" : "kaushik",
"description" : "bcakcbadjkcbadkcv akcbaicba ccuabcadls",
"richDescription" : "sbiaschoasc iobgaiuas ojasdcauocbna ajocghauocna clasjchas9c lchasocn",
"image" : "imgsa",
"images" : "imasc",
"brand" : "suds",
"price" : 12314,
"category" : "63ca85bf9b2a7c198c7ab1c9",
"countstock" : 123,
"ratting" : 32,
"isFeatured" : true
*/