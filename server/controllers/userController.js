const userService = require("..\\services\\userService.js")

// Create

const createUser = async (req, res) => {
    try {
        let user = await userService.createUserHelper(req)

        // if errors
        if (Object.keys(user).length == 2){ return res.status(400).send(user) }
        res.status(200).send(user)
    } catch (error){
        res.status(500).send(error)
        console.log(error)
    }
}

// Read

const getUser = async (req, res) => {
    try {
        let id = req.params.id
        let user = await userService.getUserHelper(id)

        if (user == null) { return res.status(400).send(`Could not find user: ${username}.`) }
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send(error)
        console.log(error)
    }
}

const getUserBookings = async (req, res) => {
    try {
        let id = req.params.id
        let bookings = await userService.getUserBookingsHelper(id)

        res.status(200).send(bookings)
    } catch (error) {
        res.status(500).send(error)
        console.log(error)
    }
}

const getAllUsers = async (req, res) => {
    try {
        let users = await userService.getAllUsersHelper()

        res.status(200).send(users)
    } catch (error) {
        res.status(500).send(error)
        console.log(error)
    }
}

// Update

const updateUser = async (req, res) => {
    try {
        let id = req.params.id
        let user = await userService.updateUserHelper(id, req)

        if (user == 500) { return res.status(500).send("Some keys in the body don't correspond to any table columns.") }
        // if errors
        if (Object.keys(user).length == 2){ return res.status(400).send(user) }
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send(error)
        console.log(error)
    }
}

// Delete

const deleteUser = async (req, res) => {
    try {
        let id = req.params.id
        await userService.deleteUserHelper(id)

        res.status(200).send(`Deleted user id: ${id}.`)
    } catch (error) {
        res.status(500).send(error)
        console.log(error)
    }
}

// Authenticate

const loginUser = async (req, res) => {
    try {
        result = await userService.loginUserHelper(req)
        
        if (result == null) { return res.status(500).send("Function error.") }
        if (result[0] == 400) { return res.status(400).send(result[1]) }
        res.status(200).send(result[1])
    } catch (error) {
        res.status(500).send(error)
        console.log(error)
    }
}


module.exports = {
    createUser,
    getUser,
    updateUser,
    deleteUser,
    loginUser,
    getUserBookings,
    getAllUsers
}
