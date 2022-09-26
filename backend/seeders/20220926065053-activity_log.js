"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("activity_logs", [
      {
        id: 1,
        user_id: 1,
        relatable_id: 1,
        relatable_type: "follow",
        createdAt: new Date("05/18/2021"),
        updatedAt: new Date("05/18/2021"),
      },
      {
        id: 2,
        user_id: 2,
        relatable_id: 1,
        relatable_type: "result",
        createdAt: new Date("06/12/2022"),
        updatedAt: new Date("06/12/2022"),
      },
      {
        id: 3,
        user_id: 3,
        relatable_id: 2,
        relatable_type: "follow",
        createdAt: new Date("01/01/2022"),
        updatedAt: new Date("01/01/2022"),
      },
      {
        id: 4,
        user_id: 1,
        relatable_id: 2,
        relatable_type: "result",
        createdAt: new Date("12/25/2021"),
        updatedAt: new Date("12/25/2021"),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("activity_logs", null, {});
  },
};
