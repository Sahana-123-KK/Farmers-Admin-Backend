const Pool = require("pg").Pool

const pool = new Pool({
    user: "postgres",
    password: "sahana",
    host: "localhost",
    port: 5432,
    database: "farmers"
})
// Its user and not username, b careful with it its configuration.


module.exports = pool