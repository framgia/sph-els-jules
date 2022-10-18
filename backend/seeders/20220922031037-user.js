"use strict";

const { User } = require("../models");

module.exports = {
  async up(queryInterface, Sequelize) {
    const { BACKEND_URL } = process.env;
    const data = [
      {
        id: 1,
        first_name: "John",
        last_name: "Doe",
        email: "johndoe@gmail.com",
        password:
          "$2a$11$.COfvRUD5iLHaPi0S1bzXePWjbJ5xoOh9cF.Hj7KgwCsVAenTCUm6", // pass
        user_type: "user",
        avatar_url: `${BACKEND_URL}/images/default_img.jpeg`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        first_name: "James",
        last_name: "Bow",
        email: "jamesbow@gmail.com",
        password:
          "$2a$11$.wtauGiDNCnjK9Hhrqheeu1NZhCoEIYtupKBX/xWwOL9iAtfNw1uu", // test
        user_type: "user",
        avatar_url: `${BACKEND_URL}/images/default_img.jpeg`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        first_name: "Jane",
        last_name: "Dough",
        email: "jane123@gmail.com",
        password:
          "$2a$11$.wtauGiDNCnjK9Hhrqheeu1NZhCoEIYtupKBX/xWwOL9iAtfNw1uu", // test
        user_type: "user",
        avatar_url: `${BACKEND_URL}/images/default_img.jpeg`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        first_name: "Joe",
        last_name: "Blow",
        email: "joeblow@gmail.com",
        password:
          "$2a$11$.wtauGiDNCnjK9Hhrqheeu1NZhCoEIYtupKBX/xWwOL9iAtfNw1uu", // test
        user_type: "user",
        avatar_url: `${BACKEND_URL}/images/default_img.jpeg`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        first_name: "Juan",
        last_name: "Cruz",
        email: "juancruz@gmail.com",
        password:
          "$2a$11$.wtauGiDNCnjK9Hhrqheeu1NZhCoEIYtupKBX/xWwOL9iAtfNw1uu", // test
        user_type: "user",
        avatar_url: `${BACKEND_URL}/images/default_img.jpeg`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        first_name: "Admin1",
        last_name: "Admin1",
        email: "admin1@admin.com",
        password:
          "$2a$11$.wtauGiDNCnjK9Hhrqheeu1NZhCoEIYtupKBX/xWwOL9iAtfNw1uu", // test
        user_type: "admin",
        avatar_url: `${BACKEND_URL}/images/default_img.jpeg`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 7,
        first_name: "Admin2",
        last_name: "Admin2",
        email: "admin2@admin.com",
        password:
          "$2a$11$.wtauGiDNCnjK9Hhrqheeu1NZhCoEIYtupKBX/xWwOL9iAtfNw1uu", // test
        user_type: "admin",
        avatar_url: `${BACKEND_URL}/images/default_img.jpeg`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 8,
        first_name: "Admin3",
        last_name: "Admin3",
        email: "admin3@admin.com",
        password:
          "$2a$11$.wtauGiDNCnjK9Hhrqheeu1NZhCoEIYtupKBX/xWwOL9iAtfNw1uu", // test
        user_type: "admin",
        avatar_url: `${BACKEND_URL}/images/default_img.jpeg`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await User.bulkCreate(data, {
      updateOnDuplicate: Object.keys(User.getAttributes()),
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
