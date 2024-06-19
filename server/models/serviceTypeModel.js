module.exports = (sequelize, DataTypes) => {
    const ServiceType = sequelize.define("serviceType", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        duration: {
            type: DataTypes.DECIMAL(3, 1),
            allowNull: false
        }
    })

    return ServiceType
}