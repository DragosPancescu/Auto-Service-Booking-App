const dotenv = require("dotenv")
dotenv.config({ path: '.\\.env' })

const {Sequelize, DataTypes} = require("sequelize")

// Connection to database

const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD, {
        host: process.env.MYSQL_HOST,
        dialect: process.env.DB_DIALECT,
        operatorsAliases: 0,
        pool: {
            max: parseInt(process.env.POOL_MAX) || 5,
            min: parseInt(process.env.POOL_MIN) || 0,
            acquire: parseInt(process.env.POOL_ACQUIRE) || 30000,
            idle: parseInt(process.env.POOL_IDLE) || 10000
        }
    }
)

sequelize.authenticate()
.then(() => {
    console.log("Connected..")
})
.catch(error => {
    console.log(`Error: ${error}`)
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

// Models

db.users = require(".\\userModel.js")(sequelize, DataTypes)
db.bookings = require(".\\bookingModel.js")(sequelize, DataTypes)
db.serviceTypes = require(".\\serviceTypeModel.js")(sequelize, DataTypes)

// Associations

// User -> Boooking (One to Many)
db.users.hasMany(db.bookings, {
    foreignKey: "user_id",
    as: "booking"
})

db.bookings.belongsTo(db.users, {
    foreignKey: "user_id"
})

// ServiceType -> Booking (One to Many)
db.serviceTypes.hasMany(db.bookings, {
    foreignKey: "service_id",
    as: "booking"
})

db.bookings.belongsTo(db.serviceTypes, {
    foreignKey: "service_id"
})

db.sequelize.sync({ force: false })
.then(() => {
    console.log("Resync done.")
});

module.exports = db