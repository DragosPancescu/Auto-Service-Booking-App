import axios from "axios"

function getBookings(id){
    return axios.get(`http://localhost:5000/api/user/getUserBookings/${id}`).then(res => res.data);
}

function getBookingData(booking){
    return axios.get(`http://localhost:5000/api/booking/getBookingType/${booking.id}`).then(res => res.data)
}

function deleteBooking(id){
    return axios.delete(`http://localhost:5000/api/booking/deleteBooking/${id}`)
}

function createBooking(date, time, user_id, service_id){
    return axios.post(`http://localhost:5000/api/booking/createBooking`, {
      date: date,
      time: time,
      user_id: user_id,
      service_id: service_id
    })
}

function updateBooking(bookingId, date, time, user_id, service_id){
  return axios.put(`http://localhost:5000/api/booking/updateBooking/${bookingId}`, {
    date: date,
    time: time,
    user_id: user_id,
    service_id: service_id
  })
}

function getServices(){
    return axios.get(`http://localhost:5000/api/serviceType/getAllServiceTypes`).then(res => res.data)
}

function getFreeSlots(date, serviceType_id, toUpdateBooking_id=-1){
  return axios.get(`http://localhost:5000/api/booking/getFreeSlotsByDate/${date}/${serviceType_id}/${toUpdateBooking_id}`).then(res => res.data)
}

function updateUser(user, userId) {
  return axios.put(`http://localhost:5000/api/user/updateUser/${userId}`, user)
}

function getUser(userId) {
  return axios.get(`http://localhost:5000/api/user/getUser/${userId}`).then(res => res.data)
}

function getAllUsers() {
  return axios.get(`http://localhost:5000/api/user/getAllUsers`).then(res => res.data)
}

export const HomeServices = {
    getBookings,
    getBookingData,
    deleteBooking,
    createBooking,
    getServices,
    getFreeSlots,
    updateUser,
    getUser,
    getAllUsers,
    updateBooking
}