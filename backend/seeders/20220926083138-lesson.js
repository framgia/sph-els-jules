"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("lessons", [
      {
        id: 1,
        title: "Basic 500",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, sapiente? Non at debitis doloribus placeat porro modi dignissimos voluptas a!",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        title: "In a restaurant",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, sapiente? Non at debitis doloribus placeat porro modi dignissimos voluptas a!",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        title: "On a trip",
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, sapiente? Non at debitis doloribus placeat porro modi dignissimos voluptas a!",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("lessons", null, {});
  },
};
