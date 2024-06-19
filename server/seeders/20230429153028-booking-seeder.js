'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let dateToday = new Date();
    const dateTomorrow = new Date();
    dateTomorrow.setDate(dateToday.getDate() + 1);

    return queryInterface.bulkInsert("bookings", [
      {
        date: dateTomorrow.toISOString().slice(0, 10),
        time: "16:30:00",
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        user_id: 1,
        service_id: 2
      },
      {
        date: dateTomorrow.toISOString().slice(0, 10),
        time: "12:00:00",
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        user_id: 2,
        service_id: 1
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    const { sequelize } = queryInterface;
    try {
      await sequelize.transaction(async (transaction) => {
        const options = { transaction };
        await sequelize.query("SET FOREIGN_KEY_CHECKS = 0", options);
        await sequelize.query("TRUNCATE TABLE bookings", options);
        await sequelize.query("SET FOREIGN_KEY_CHECKS = 1", options);
      });
    } catch (error) {
      console.log(error);
    }
  }
};
