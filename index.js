const express = require("express")
const app = express()
const cors = require("cors")
const pool = require("./db")


app.use(cors())
app.use(express.json())
app.use("/farmers",require("./routes/farmerRoutes"))
app.use("/auth",require("./routes/auth"))
app.use("/dashboard",require("./routes/dashboard"))
app.use("/varieties",require("./routes/varieties"))
app.get("/",async(req,res)=>{
    res.send("hello")
})
app.listen(7000,()=>{
    console.log("Connected To Backend Server of Farmers' App")
})