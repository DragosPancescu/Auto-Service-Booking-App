const userController = require("..\\controllers\\userController.js")

const router =  require("express").Router()

router.post("/createUser", userController.createUser)

router.get("/getUserBookings/:id", userController.getUserBookings)

router.get("/getUser/:id", userController.getUser)

router.get("/getAllUsers", userController.getAllUsers)

router.put("/updateUser/:id", userController.updateUser)

router.delete("/deleteUser/:id", userController.deleteUser)

// Auth stuff
router.post("/login", userController.loginUser)

module.exports = router