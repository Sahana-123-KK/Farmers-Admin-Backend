
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")

dotenv.config()
const authorize = async (req, res, next) => {
    try {
        const token = req.header("token")
        if (!token) {
            return res.status(403).json("Not Authorized")
        }
        const payload = jwt.verify(token, process.env.SECRETKEY)
        if (!payload) {
            return res.status(403).json("Not Authorized")

        }
        req.user = payload.user
        next()

    } catch (error) {
        console.log(error)
        return res.status(403).json("Not Authorized")
    }
}

module.exports = authorize