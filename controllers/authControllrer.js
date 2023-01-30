
const pool = require("../db")
const bcrypt = require("bcryptjs")
const jwtGenerator = require("../utils/jwtGenerator")

const register = async (req, res) => {
    try {


        const { name, email, password } = req.body


        const exists = await pool.query("SELECT FROM users WHERE user_email = $1", [email])
        if (exists.rows.length !== 0) {
            return res.status(401).json("User Already Exists")
        }

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const newUser = await pool.query("INSERT INTO users (user_name,user_email,user_password) VALUES ($1,$2,$3) RETURNING *", [name, email, hash])

        const token = jwtGenerator(newUser.rows[0].user_id)

        res.json({ token })

    } catch (error) {
        console.log(error)
        return res.status(500).json("Internal Server Error")
    }

}


const login = async (req, res) => {
    try {

        const { email, password } = req.body

        const exists = await pool.query("SELECT * FROM users WHERE user_email = $1", [email])
        // console.log(exists.rows.length)
        if (exists.rows.length===0) {
            return res.status(401).json("Invalid Credentials")
        }
        const valid = await bcrypt.compare(password, exists.rows[0].user_password)
        if (!valid) {
            return res.status(401).json("Invalid Credentials")

        }

        const token = jwtGenerator(exists.rows[0].user_id)
        res.json({ token })
    } catch (error) {
        console.log(error)
        return res.status(500).json("Internal Server Error")
    }
}


module.exports = { register,login }