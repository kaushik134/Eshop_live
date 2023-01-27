const express = require("express")
const mongoose = require("mongoose")
route = express.Router()

route.use(express.json())
route.use(express.urlencoded())

const product = require("../Models/products")
const category = require("../Models/Category")

/*
Product.post("/insert",(req,res)=>{
    const cat = category.findById(req.body.cat)
    if(!cat) return res.status(400).send("Invalid Category")

    product.insertMany(req.body,(err,result)=>{
        if(err) throw err
        else{
            console.log(result);
            res.send(result)
        }
    })
})
*/

route.post("/insert", async (req, res) => {
    const cat = category.findById(req.body.cat)
    if (!cat) return res.status(400).send("Invalid Category")

    else{
        let products = new product({
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: req.body.image,
            images: req.body.images,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countstock: req.body.countstock,
            ratting: req.body.ratting,
            isFeatured: req.body.isFeatured,
        })
        products = await products.save()
        if (!products) return res.status(500).send("The product cannot be created")
        else{
            res.send(products)
        }
    }
})

route.get("/find", (req, res) => {
    product.find({}, (err, result) => {
        if (err) throw err
        else {
            res.send(result)
        }
    })
})

module.exports = route