"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("lesson_words", [
      {
        id: 1,
        lesson_id: 1,
        word_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        lesson_id: 1,
        word_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        lesson_id: 1,
        word_id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        lesson_id: 1,
        word_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        lesson_id: 1,
        word_id: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        lesson_id: 2,
        word_id: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 7,
        lesson_id: 2,
        word_id: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 8,
        lesson_id: 2,
        word_id: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 9,
        lesson_id: 2,
        word_id: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 10,
        lesson_id: 2,
        word_id: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 11,
        lesson_id: 3,
        word_id: 11,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 12,
        lesson_id: 3,
        word_id: 12,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 13,
        lesson_id: 3,
        word_id: 13,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 14,
        lesson_id: 3,
        word_id: 14,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 15,
        lesson_id: 3,
        word_id: 15,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("lesson_words", null, {});
  },
};
