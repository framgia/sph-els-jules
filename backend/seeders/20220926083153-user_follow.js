"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("user_follows", [
      {
        id: 1,
        user_id: 2,
        follower_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        user_id: 3,
        follower_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        user_id: 4,
        follower_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        user_id: 5,
        follower_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("user_follows", null, {});
  },
};
