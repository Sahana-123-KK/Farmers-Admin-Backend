const express = require("express")
const{register,login} = require("../controllers/authControllrer")
const authorize = require("../middlewares/authorization")
const router = express.Router()



router.get("/",(req,res)=>{
    res.send("hello,nice to meet you.")
})

router.post("/register",register)
router.post("/login",login)

router.get("/verify",authorize,(req,res)=>{
    try {
        res.json(true)
    } catch (error) {
     console.log(error)   
     return res.status(500).json("Internal Server Error")
    }
})

module.exports = router