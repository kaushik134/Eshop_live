const express = require("express")
const mongoose = require("mongoose")
route = express.Router()

route.use(express.json())
route.use(express.urlencoded())

const orders = require("../Models/Orders")
const orderitems = require("../Models/orderitems")

route.post("/insert", async (req, res) => {
    const orderItemId = await Promise.all(
        req.body.orderitems.map(async (orderitem) => {
            let newOrderItem = new orderitems({
                quantity: orderitem.quantity,
                product: orderitem.product,
            })
            newOrderItem = await newOrderItem.save()
            console.log(newOrderItem);
            return newOrderItem._id
        })
    )

    const orderItemsIdsResolved = await orderItemId
    const totalPrices = await Promise.all(
        orderItemsIdsResolved.map(async (orderItemIds) => {
            const orderItem = await orderitems.findById(orderItemIds).populate(
                "product",
                "price"
            )
            console.log(orderItem);
            const totalPrice = orderItem.product.price * orderItem.quantity
            console.log(totalPrice);
            return totalPrice
        })
    )
    console.log(totalPrices);

    const totalPrice = totalPrices.reduce((a, b) => a + b, 0)
    let order = new orders({
        orderitems: orderItemsIdsResolved,
        shippingAddress1: req.body.shippingAddress1,
        shippingAddress2: req.body.shippingAddress2,
        city: req.body.city,
        zip: req.body.zip,
        country: req.body.country,
        phone: req.body.phone,
        status: req.body.status,
        totalprice: totalPrice,
        user: req.body.user,
    })
    if (!order) return res.status(500).send("order cannot be created")
    else {
        order = await order.save()
        res.send(order)
    }
})

route.get("/find",async(req,res)=>{
    const orderList = await orders.find().populate("user","name").sort({dateOrdered : -1})
    if(!orderList){
        res.status(500).send("failed")
    }
    else{
        res.send(orderList)
    }
})

route.get("/:id",async(req,res)=>{
    const orderList = await orders.findById(req.params.id).populate("user","name").populate({
        path:"orderitems",
        populate:{
            path:"product",
            populate:"category"
        }
    })
    if(!orderList){
        res.status(500).send("failed")
    }
    else{
        res.send(orderList)
    }
})

module.exports = route