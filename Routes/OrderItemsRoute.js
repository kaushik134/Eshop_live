const express = require("express")
const mongoose = require("mongoose")
route=express.Router()

route.use(express.json())
route.use(express.urlencoded())

const OrderItem = require("../Models/orderitems")

route.post("/insert",async(req,res)=>{
    let orderitems = new OrderItem({
    product : req.body.product,
    quantity : req.body.quantity,
    })
    res.send(orderitems)
    orderitems=await orderitems.save()
    if(!orderitems) return res.status(500).send("orderitem connot be create")
})

module.exports=route