const express = require("express")
const router = express.Router()
const pool = require('../db')
const authorize = require("../middlewares/authorization")

router.get("/", (req, res) => {
    res.send("Hello welcome to farmers routes...")
})

router.post("/create",authorize,  async (req, res) => {
    try {
        let { vno, address, name, variety, datetime ,others} = req.body
        if(variety=="others"){
            if(!others){
                return res.status(402).json("Fill the Other Field")
            }
            const addvariety = await pool.query("INSERT INTO varieties (name) VALUES ($1) RETURNING *",[others])
            variety = others
        }

        const newFarmer = await pool.query("INSERT INTO farmersdata (address,vno,name,variety,datetime) VALUES ($1,$2,$3,$4,$5) RETURNING *", [address, vno, name, variety, datetime])

        res.json(newFarmer.rows[0])

    } catch (error) {
        console.log(error)
        return res.status(500).json("Internal Server Error")
    }
})

router.get("/farmer/:id",authorize, async(req,res)=>{
    try {
        const {id } = req.params
        const farmer = await pool.query("SELECT * FROM farmersdata WHERE f_id = $1",[id])
        res.json(farmer.rows[0])
    } catch (error) {
        console.log(error)
        return res.status(500).json("Internal Server Error")
    }
})
router.get("/getfarmers",authorize,  async (req, res) => {
    try {
        const farmers = await pool.query("SELECT * FROM farmersdata")
        res.json(farmers.rows)
    } catch (error) {
        console.log(error)
        return res.status(500).json("Internal Server Error")
    }
})

router.put("/update/:id",authorize,  async (req, res) => {
    try {
        const { id } = req.params
        const { vno, address, name, variety, datetime } = req.body

        const updateFarmer = await pool.query("UPDATE farmersdata SET name = $1, vno = $2, address = $3, variety=$4, datetime = $5 WHERE f_id = $6 ", [name, vno, address, variety, datetime, id])

        res.json("Farmer's Profile Updated Successfully")

    } catch (error) {
        console.log(error)
        return res.status(500).json("Internal Server Error..")
    }
})

router.delete("/delete/:id", authorize,async (req, res) => {
    try {
        const { id } = req.params
        const deleteFarmer = await pool.query("DELETE FROM farmersdata WHERE f_id = $1", [id])
        res.json("Farmer Deleted Successfully")
    } catch (error) {
        console.log(error)
        return res.status(500).json("Internal Server Error")
    }
})


module.exports = router