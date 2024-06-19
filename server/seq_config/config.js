const dotenv = require("dotenv")
dotenv.config({ path: '.\\.env' })

module.exports = {
  "development": {
    "username": process.env.MYSQL_USER,
    "password": process.env.MYSQL_PASSWORD,
    "database": process.env.MYSQL_DATABASE,
    "host": process.env.MYSQL_HOST,
    "dialect": process.env.DB_DIALECT
  },
}