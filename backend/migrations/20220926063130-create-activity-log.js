"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("activity_logs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
      },
      relatable_id: {
        type: Sequelize.INTEGER,
      },
      relatable_type: {
        type: Sequelize.STRING,
      },
      title: {
        allowNull: true,
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("activity_logs");
  },
};
