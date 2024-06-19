const db = require("..\\models")
const User = db.users
const Booking = db.bookings
const { Op } = require("sequelize")

const dotenv = require("dotenv")
dotenv.config({ path: '.\\.env' })

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

function generateToken(user) {
  return accessToken = jwt.sign(
    JSON.stringify({ id: user.id, firstname: user.firstname, lastname: user.lastname }), 
    process.env.ACCESS_TOKEN_SECRET
  )
}

const createUserHelper = async (req) => {
    let info = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        role: req.body.role
    }
    info.password = await bcrypt.hash(info.password, 10)

    let users = await User.findAll()
    let errors = {
      email: "",
      phone: ""
    }
    let sendError = false

    let userEmail = users.find(user => user.email === info.email)
    let userPhone = users.find(user => user.phone === info.phone)

    if (userEmail != null) { errors.email = "Email is already taken"; sendError = true}
    if (userPhone != null) { errors.phone = "Phone number is already taken"; sendError = true}

    if (sendError){ return errors }
  
    let user = await User.create(info)
    // Used for auth
    let accessToken = generateToken(user)
    user.accessToken = accessToken
    
    return user
}

const getUserHelper = async (id) => {
    let user = await User.findOne({ 
        where: { id: id}
    })

    return user
}

const getAllUsersHelper = async () => {
  let users = await User.findAll()

  return users
}

const getUserBookingsHelper = async (id) => {
    let bookings = await User.findAll({
        include : [{
            model: Booking,
            as: "booking"
        }],
        where: { id: id }
    })

    return bookings[0].booking
}

const updateUserHelper = async (id, req) => {
    console.log(req.body)

    let users = await User.findAll({
      where: {
        id : {
          [Op.ne]: id
        }
      }
    })

    let errors = {
      email: "",
      phone: ""
    }
    let sendError = false

    let userEmail = users.find(user => user.email === req.body.email)
    let userPhone = users.find(user => user.phone === req.body.phone)

    if (userEmail != null) { errors.email = "Email is already taken"; sendError = true}
    if (userPhone != null) { errors.phone = "Phone number is already taken"; sendError = true}

    if (sendError){ return errors }
    if (req.body.hasOwnProperty('password')) { req.body.password = await bcrypt.hash(req.body.password, 10) }
    const user = await User.update(req.body, { where: { id: id } })
    return user
}

const deleteUserHelper = async (id) => {
    await User.destroy({ where: { id: id } })
}

const loginUserHelper = async (req) => {
    let token = ""
    let email = req.body.email
    let user = await User.findOne({ 
        where: { email: email}
    })

    if (user == null) { return [400, "Incorrect credentials."]}

    let password = req.body.password
    if (await bcrypt.compare(password, user.password)){
        // Used for auth
        let accessToken = generateToken(user)

        return [200, { 
          id: user.id,
          role: user.role,
          accessToken: accessToken
        }]
    } else {
        return [400, "Incorrect credentials."]
    }
}

module.exports = {
    createUserHelper,
    getUserHelper,
    deleteUserHelper,
    updateUserHelper,
    loginUserHelper,
    getUserBookingsHelper,
    getAllUsersHelper
}