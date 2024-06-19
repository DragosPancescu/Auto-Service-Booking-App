import axios from "axios"

function login(email, password){
    return axios.post('http://localhost:5000/api/user/login', {
        email: email,
        password: password
    });
}

function createAccount(firstname, lastname, email, phone, password, role = 'user'){
    return axios.post('http://localhost:5000/api/user/createUser', {
        firstname: firstname,
        lastname: lastname,
        email: email,
        phone: phone,
        password: password,
        role: role
    });
}

function deleteAccount(userId){
    return axios.delete(`http://localhost:5000/api/user/deleteUser/${userId}`);
}

export const RegisterServices = {
    login,
    createAccount,
    deleteAccount
}