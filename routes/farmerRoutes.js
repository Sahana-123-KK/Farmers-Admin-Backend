const express = require("express")
const router = express.Router()
const pool = require('../db')
router.get("/", (req, res) => {
    res.send("Hello welcome to farmers routes...")
})

router.post("/create", async (req, res) => {
    try {
        const { vno, address, name, variety, datetime } = req.body

        const newFarmer = await pool.query("INSERT INTO farmersdata (address,vno,name,variety,datetime) VALUES ($1,$2,$3,$4,$5) RETURNING *", [address, vno, name, variety, datetime])

        res.json(newFarmer.rows[0])

    } catch (error) {
        console.log(error)
        return res.status(500).json("Internal Server Error")
    }
})


router.get("/getfarmers", async (req, res) => {
    try {
        const farmers = await pool.query("SELECT * FROM farmersdata")
        res.json(farmers.rows)
    } catch (error) {
        console.log(error)
        return res.status(500).json("Internal Server Error")
    }
})

router.put("/update/:id", async (req, res) => {
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

router.delete("/delete/:id", async (req, res) => {
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