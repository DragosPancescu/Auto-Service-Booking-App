module.exports = (sequelize, DataTypes) => {
    const Booking = sequelize.define("booking", {
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        time: {
            type: DataTypes.TIME,
            allowNull: false
        }
    })

    return Booking
}