const express = require("express")
const mongoose = require("mongoose")
const category = require("../Models/Category")
route=express.Router()

route.use(express.json())
route.use(express.urlencoded())


/*
Category.post("/insert",(req,res)=>{
    category.insertMany(req.body,(err,result)=>{
        if(err) throw err
        else{
            console.log(result);
            res.send(result)
        }
    })
})
*/

route.post("/insert",async(req,res)=>{

    let categoryData = new category({
        name : req.body.name,
        color : req.body.color,
        icon : req.body.icon,
        image : req.body.image,
    })

    categoryData = await categoryData.save()
    if(!categoryData) return res.status(500).send("The category cannot be created")
    else{
        res.send(categoryData)
    }
})

route.get("/find",(req,res)=>{
    category.find({},(err,result)=>{
        if(err) throw err
        else{
            res.send(result)
        }
    })
})

route.get("/:id",async(req,res)=>{
    const Category = await category.findById(req.params.id)

    if(!Category) return res.status(500).send("The category with the given ID was not found")
    else{
        res.send(Category)
    }
})

route.put("/:id",async(req,res)=>{
    const Category = await category.findByIdAndUpdate(
        req.params.id,
        {
            name : req.body.name,
            color : req.body.color,
            icon : req.body.icon,
        },
        {
            new:true
        })
        if(!Category) return res.status(500).send("The category with the given ID was not found")
        else{
            res.send(Category)
        }
})

route.delete("/:id",async(req,res)=>{
    const Category = await category.findByIdAndDelete(
        req.params.id
    )
    if(!category) return res.status(500).send("the category with the given ID was not found")
    else{
        res.send(Category)
    }
})

module.exports=route