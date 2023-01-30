const express = require("express")
const app = express()

const morgan = require("morgan")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv/config")

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


app.use("/UserRoute",require("./Routes/UserRoute"))
app.use("/Category",require("./Routes/CategoryRoute"))
app.use("/Product",require("./Routes/ProductRoute"))
app.use("/Order",require("./Routes/OrdersRoute"))
app.use("/OrderItem",require("./Routes/OrderItemsRoute"))


const PORT = 3300
app.listen(PORT,()=>{
    console.log(`server ${PORT}`);
})