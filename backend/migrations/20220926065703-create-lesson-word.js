"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("lesson_words", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      lesson_id: {
        type: Sequelize.INTEGER,
      },
      word_id: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("lesson_words");
  },
};
