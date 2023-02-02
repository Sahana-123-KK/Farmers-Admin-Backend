const router = require("express").Router()
const {getVarieties,addVariety} = require("../controllers/varietiesController")


router.get("/all",getVarieties)
router.post("/create",addVariety)


module.exports = router