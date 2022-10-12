"use strict";

const { Result } = require("../models");

module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [
      {
        id: 1,
        user_id: 1,
        word_id: 1,
        lesson_id: 1,
        answer: "Yes",
        is_correct: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        user_id: 1,
        word_id: 2,
        lesson_id: 1,
        answer: "No",
        is_correct: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        user_id: 1,
        word_id: 3,
        lesson_id: 1,
        answer: "Please",
        is_correct: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        user_id: 1,
        word_id: 4,
        lesson_id: 1,
        answer: "Yes",
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        user_id: 1,
        word_id: 5,
        lesson_id: 1,
        answer: "No",
        is_correct: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await Result.bulkCreate(data, {
      updateOnDuplicate: Object.keys(Result.getAttributes()),
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("results", null, {});
  },
};
