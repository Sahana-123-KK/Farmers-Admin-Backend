const pool = require("../db")



const getVarieties = async(req,res)=>{
    const getall = await pool.query("SELECT * FROM varieties")
    res.json(getall.rows)
}

const addVariety =async(req,res)=>{
    const {variety} = req.body
    const newVariety = await pool.query("INSERT INTO varieties (name) VALUES ($1) RETURNING *",[variety])

    res.json(newVariety.rows[0])
}

// const deleteVariety = 
module.exports ={getVarieties,addVariety}