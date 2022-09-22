'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        first_name: 'John',
        last_name: 'Doe',
        email: 'johndoe@gmail.com',
        password: '$2a$11$.COfvRUD5iLHaPi0S1bzXePWjbJ5xoOh9cF.Hj7KgwCsVAenTCUm6', // pass
        user_type: 'user',
        avatar_url: 'default_img.jpeg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        first_name: 'James',
        last_name: 'Bow',
        email: 'jamesbow@gmail.com',
        password: '$2a$11$.wtauGiDNCnjK9Hhrqheeu1NZhCoEIYtupKBX/xWwOL9iAtfNw1uu', // pass
        user_type: 'user',
        avatar_url: 'default_img.jpeg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
  ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
