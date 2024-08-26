'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Projects', 'link_project', {
      type: Sequelize.STRING,
      allowNull: true, // You can change this to false if you want to enforce that a link is always required
      after: 'description' // Optional: This places the new column after the 'description' column
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Projects', 'link_project');
  
  }
};
