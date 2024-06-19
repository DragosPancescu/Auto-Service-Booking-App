const db = require("..\\models")
const ServiceType = db.serviceTypes

const createServiceTypeHelper = async (req) => {
    let info = {
        name: req.body.name,
        duration: req.body.duration
    }
    let serviceType = await ServiceType.create(info)
    return serviceType
}

const getServiceTypeHelper = async (id) => {
    let serviceType = await ServiceType.findOne({ 
        where: { id: id}
    })

    return serviceType
}

const getAllServiceTypesHelper = async () => {
    let serviceTypes = await ServiceType.findAll({
        attributes: ["id", "name"]
    })

    return serviceTypes
}

const updateServiceTypeHelper = async (id, req) => {
    let bodyKeys = Object.keys(req.body)

    if (!bodyKeys.every(item => ServiceType.hasOwnProperty(item))) { 
        return 500
    }
    let serviceType = await ServiceType.update(req.body, { where: { id: id } })
    return serviceType
}

const deleteServiceTypeHelper = async (id) => {
    await ServiceType.destroy({ where: { id: id } })
}

module.exports = {
    createServiceTypeHelper,
    getServiceTypeHelper,
    deleteServiceTypeHelper,
    updateServiceTypeHelper,
    getAllServiceTypesHelper
}