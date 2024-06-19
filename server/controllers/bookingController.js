const bookingService = require("..\\services\\bookingService.js")

// Create

const createBooking = async (req, res) => {
    try {
        let booking = await bookingService.createBookingHelper(req)
        res.status(200).send(`Created service booking: ${booking}`)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

// Read

const getBooking = async (req, res) => {
    try {
        let id = req.params.id
        let booking = await bookingService.getBookingHelper(id)

        if (booking == null) { return res.status(400).send(`Could not find a booking with id: ${id}`) }
        res.status(200).send(booking)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

const getBookingType = async (req, res) => {
    try {
        let id = req.params.id
        serviceType = await bookingService.getBookingType(id)
        res.status(200).send(serviceType)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

const getFreeSlotsByDate = async (req, res) => {
    try {
        let date = req.params.date
        let serviceType_id = req.params.serviceType_id
        let toUpdateBooking_id = req.params.toUpdateBooking_id
        slots = await bookingService.getFreeSlotsByDateHelper(date, serviceType_id, toUpdateBooking_id)
        res.status(200).send(slots)
    } catch (error) {
        res.status(500).send(error)
        console.log(error)
    }
}

// Update

const updateBooking = async (req, res) => {
    try {
        let id = req.params.id
        let booking = await bookingService.updateBookingHelper(id, req)
        
        // if (booking == 500) { return res.status(500).send("Some keys in the body don't correspond to any table columns.") }
        res.status(200).send(booking)
    } catch (error) {
        res.status(500).send(error)
        console.log(error)
    }
}

// Delete

const deleteBooking = async (req, res) => {
    try {
        let id = req.params.id

        await bookingService.deleteBookingHelper(id)
        res.status(200).send(`Deleted booking with id: ${id}.`)
    } catch (error) {
        res.status(500).send(error)
        console.log(error)
    }
}

module.exports = {
    createBooking,
    updateBooking,
    deleteBooking,
    getBooking,
    getBookingType,
    getFreeSlotsByDate
}