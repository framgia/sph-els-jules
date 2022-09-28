"use strict";

const { Activity_log } = require("../models/");

module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [
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
        relatable_type: "lesson",
        createdAt: new Date("06/12/2022"),
        updatedAt: new Date("06/12/2022"),
      },
      {
        id: 3,
        user_id: 2,
        relatable_id: 2,
        relatable_type: "follow",
        createdAt: new Date("01/01/2022"),
        updatedAt: new Date("01/01/2022"),
      },
      {
        id: 4,
        user_id: 1,
        relatable_id: 1,
        relatable_type: "lesson",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await Activity_log.bulkCreate(data, {
      updateOnDuplicate: Object.keys(Activity_log.getAttributes()),
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("activity_logs", null, {});
  },
};
