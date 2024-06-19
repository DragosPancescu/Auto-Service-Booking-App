const servTypeService = require("..\\services\\serviceTypeService.js")

// Create

const createServiceType = async (req, res) => {
    try {
        let serviceType = await servTypeService.createServiceTypeHelper(req)
        res.status(200).send(`Created service type: ${serviceType.name}.`)
    } catch (error) {
        res.status(500).send(error)
        console.log(error)
    }
}

// Read

const getServiceType = async (req, res) => {
    try {
        let id = req.params.id
        let serviceType = await servTypeService.getServiceTypeHelper(id)

        if (serviceType == null) { return res.status(400).send(`Could not find service type with id: ${id}.`) }
        res.status(200).send(serviceType)
    } catch (error) {
        res.status(500).send(error)
        console.log(error)
    }
}

const getAllServiceTypes = async (req, res) => {
  try {
      let serviceTypes = await servTypeService.getAllServiceTypesHelper()
      if (serviceTypes == null) { return res.status(400).send(`Could not find any service type.`) }
      res.status(200).send(serviceTypes)
  } catch (error) {
      res.status(500).send(error)
      console.log(error)
  }
}

// Update

const updateServiceType = async (req, res) => {
    try {
        let id = req.params.id

        let serviceType = await servTypeService.updateServiceTypeHelper(id, req)
        if (serviceType == 500) { 
            res.status(500).send("Some keys in the body don't correspond to any table columns.") 
        }
        res.status(200).send(serviceType)
    } catch (error) {
        res.status(500).send(error)
        console.log(error)
    }
}

// Delete

const deleteServiceType = async (req, res) => {
    try {
        let id = req.params.id

        await servTypeService.deleteServiceType(id)
        res.status(200).send(`Deleted service type with id: ${id}.`)
    } catch (error) {
        res.status(500).send(error)
        console.log(error)
    }
}

module.exports = {
    createServiceType,
    getServiceType,
    updateServiceType,
    deleteServiceType,
    getAllServiceTypes
}