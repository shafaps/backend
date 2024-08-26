'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn("users","username", {
      type: DataTypes.STRING,
      after:"email",
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("users","username")
  }
};
