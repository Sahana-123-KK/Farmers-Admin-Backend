const pool = require("../db")
const authorize = require("../middlewares/authorization")

const router = require("express").Router()

router.get("/",authorize,async(req,res)=>{
    try {
        const getUser = await pool.query("SELECT user_name FROM users WHERE user_id = $1",[req.user])

        res.json(getUser.rows[0])
        
    } catch (error) {
        console.log(error)
        return res.status(500).json("Internal Server Error")
    }
})

module.exports   = router