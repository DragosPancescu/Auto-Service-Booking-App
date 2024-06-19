const serviceTypeController = require("..\\controllers\\serviceTypeController.js")

const router =  require("express").Router()

router.post("/createServiceType", serviceTypeController.createServiceType)

router.get("/getServiceType/:id", serviceTypeController.getServiceType)

router.get("/getAllServiceTypes/", serviceTypeController.getAllServiceTypes)

router.put("/updateServiceType/:id", serviceTypeController.updateServiceType)

router.delete("/deleteServiceType/:id", serviceTypeController.deleteServiceType)

module.exports = router