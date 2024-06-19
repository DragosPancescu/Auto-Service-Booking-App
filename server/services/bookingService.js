const db = require("..\\models")
const {Sequelize, DataTypes, Op} = require("sequelize")

const Booking = db.bookings
const ServiceType = db.serviceTypes

/* ################## UTILS ################## */

const arrayRange = (start, stop, step) =>
    Array.from(
    { length: (stop - start) / step + 1 },
    (value, index) => start + index * step
    )

const stringToDate = (time) => {
  let now = new Date()
  let nowDateTime = now.toISOString()
  let nowDate = nowDateTime.split('T')[0]

  time = time.split(":")[0].length === 1 ? `0${time}` : time

  let convertedTime = new Date(nowDate + 'T' + time)

  return convertedTime
}

const timeDifference = (time1, time2) => {
    time1 = stringToDate(time1)
    time2 = stringToDate(time2)

    let diff = Math.abs(time1 - time2)
    let minutes = Math.floor((diff / 1000) / 60)

    return minutes
}

const addMinutes = (time, minutes=30) => {
    time = stringToDate(time)
    let newTime = new Date(time.getTime() + 7 * minutes * 60000);

    stringTime = newTime.toISOString().split("T")[1].split(".")[0]
    return stringTime
}

const getSequences = (array, seqLength) => {
    let sequences = []
    // 0 - (5)
    for (let index = 0; index < array.length - seqLength + 1; index++) {
        sequences.push([
          array[index].split(":")[0].length === 1 ? `0${array[index]}` : array[index], 
          addMinutes(array[index + seqLength - 1])
        ])
    }

    return sequences
}

/* ################## UTILS END ################## */

const createBookingHelper = async (req) => {
    let info = {
        date: req.body.date,
        time: req.body.time,
        user_id: req.body.user_id,
        service_id: req.body.service_id
    }
    
    let booking = await Booking.create(info)
    return booking
}

const getBookingHelper = async (id) => {
    let booking = await Booking.findOne({ 
        where: {id: id}
    })

    return booking
}

const getBookingType = async (id) => {
    let serviceType = await Booking.findOne({
        include : {
            model: ServiceType,
            as: "serviceType"
        },
        where: {id: id}
    })

    return serviceType.serviceType
}

const getFreeSlotsByDateHelper = async(date, serviceType_id, toUpdateBooking_id) => {
    let slots = []
    arrayRange(8, 19, 1).forEach(element => {
        slots.push(`${element}:00:00`)
        slots.push(`${element}:30:00`)
    });

    // Finding all bookings for that day
    let bookings = await Booking.findAll({
        include : {
            model: ServiceType,
            as: "serviceType",
            attributes: []
        },
        where: 
        {
          date: date,
          id: {[Op.not]: toUpdateBooking_id}
        },
        attributes: ['date', 'time', [Sequelize.col('serviceType.name'), 'name'], [Sequelize.col('serviceType.duration'), 'duration']],
        raw: true
    })

    // Find the given service type duration
    let serviceType = await ServiceType.findOne({
        where: {id: serviceType_id},
        attributes: ['duration']
    })
    let duration = serviceType.duration

    // Remove already booked time for the empty slots list
    bookings.forEach(booking => {
        start_index = slots.indexOf(booking.time)

        if (start_index != -1){
            stop_index = start_index + parseFloat(booking.duration) / 0.5 - 1
            indexesToBeRemoved = arrayRange(start_index, stop_index, 1)
    
            while(indexesToBeRemoved.length) {
                slots.splice(indexesToBeRemoved.pop(), 1);
            }
        }
    });

    // Make list with possible slots given provided service type
    let free_slots = []
    let currentTimeFrame = [slots[0]]
    for (let index = 1; index < slots.length; index++) {
        if (timeDifference(slots[index - 1], slots[index]) == 30){
            currentTimeFrame.push(slots[index])
        } else {
            if (currentTimeFrame.length > parseFloat(duration) / 0.5) {
              seq = getSequences(currentTimeFrame, parseFloat(duration) / 0.5)
              free_slots = free_slots.concat(seq)
            }
            currentTimeFrame = [slots[index]]
        }
    }

    if (currentTimeFrame.length != 0 && currentTimeFrame.length > parseFloat(duration) / 0.5){
        seq = getSequences(currentTimeFrame, parseFloat(duration) / 0.5)
        free_slots = free_slots.concat(seq)
    }

    return free_slots
}

const updateBookingHelper = async (id, req) => {
    let booking = await Booking.update(req.body, { where: { id: id } })
    return booking
}

const deleteBookingHelper = async (id) => {
    await Booking.destroy({ where: { id: id } })
}

module.exports = {
    createBookingHelper,
    updateBookingHelper,
    deleteBookingHelper,
    getBookingHelper,
    getBookingType,
    getFreeSlotsByDateHelper
}