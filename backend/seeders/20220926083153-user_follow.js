"use strict";

const { User_follow } = require("../models");

module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [
      {
        id: 1,
        user_id: 2,
        follower_id: 1,
        is_followed: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        user_id: 3,
        follower_id: 2,
        is_followed: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        user_id: 4,
        follower_id: 2,
        is_followed: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        user_id: 5,
        follower_id: 3,
        is_followed: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        user_id: 1,
        follower_id: 3,
        is_followed: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        user_id: 1,
        follower_id: 4,
        is_followed: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await User_follow.bulkCreate(data, {
      updateOnDuplicate: Object.keys(User_follow.getAttributes()),
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("user_follows", null, {});
  },
};
