const express = require("express")
const cors = require("cors")

const app = express()
const PORT = parseInt(process.env.SERVER_PORT) || 5000

var corsOptions = {
    origin: true,
    credentials: true
}

// Middleware

app.use(cors(corsOptions))

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

// Routers

const userRouter = require(".\\routes\\userRouter.js")
const serviceTypeRouter = require(".\\routes\\serviceTypeRouter.js")
const bookingRouter = require(".\\routes\\bookingRouter.js")

app.use('/api/user', userRouter)
app.use('/api/serviceType', serviceTypeRouter)
app.use('/api/booking', bookingRouter)

// Server

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})