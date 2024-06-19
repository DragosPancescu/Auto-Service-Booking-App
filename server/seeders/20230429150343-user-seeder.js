'use strict';
const bcrypt = require("bcrypt")

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("users", [
      {
        firstname: "Crina",
        lastname: "Andreea",
        email: "crina1@gmail.com",
        phone: "0763603346",
        password: await bcrypt.hash("parola1", 10),
        role: "admin",
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      },
      {
        firstname: "Crina",
        lastname: "Andreea",
        email: "crina@gmail.com",
        phone: "0763803346",
        password: await bcrypt.hash("parola", 10),
        role: "user",
        createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    const { sequelize } = queryInterface;
    try {
      await sequelize.transaction(async (transaction) => {
        const options = { transaction };
        await sequelize.query("SET FOREIGN_KEY_CHECKS = 0", options);
        await sequelize.query("TRUNCATE TABLE users", options);
        await sequelize.query("SET FOREIGN_KEY_CHECKS = 1", options);
      });
    } catch (error) {
      console.log(error);
    }
  }
};
