const express = require("express")
const app = express()

const morgan = require("morgan")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv/config")
const authJwt = require("./helpers/jwt")

app.use(cors())
app.options("*",cors())

mongoose.set("strictQuery",true)
app.use(express.json())
app.use(express.urlencoded())
app.use(morgan("tiny"))
// app.use(authJwt)

mongoose.pluralize(null)

mongoose.connect(process.env.CONNECTION_STRING,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(()=>console.log("connect"))
.catch((err)=>{
    console.log(err);
})

app.get("/",(req,res)=>{
    console.log("inside server");
})

const userroute = require("./Routes/UserRoute")
app.use("/UserRoute",userroute)

const categoryroute = require("./Routes/CategoryRoute")
app.use("/Category",categoryroute)

const productroute = require("./Routes/ProductRoute")
app.use("/Product",productroute)

const orderroute = require("./Routes/OrdersRoute")
app.use("/Order",orderroute)

const orderitemroute = require("./Routes/OrderItemsRoute")
app.use("/OrderItem",orderitemroute)

const PORT = 3300
app.listen(PORT,()=>{
    console.log(`server ${PORT}`);
})