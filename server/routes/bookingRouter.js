const bookingController = require("..\\controllers\\bookingController.js")

const router =  require("express").Router()

router.post("/createBooking", bookingController.createBooking)

router.get("/getBooking/:id", bookingController.getBooking)

router.get("/getBookingType/:id", bookingController.getBookingType)

router.get("/getFreeSlotsByDate/:date/:serviceType_id/:toUpdateBooking_id", bookingController.getFreeSlotsByDate)

router.put("/updateBooking/:id", bookingController.updateBooking)

router.delete("/deleteBooking/:id", bookingController.deleteBooking)

module.exports = router