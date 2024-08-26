'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    static associate(models) {
      // Define associations here
    }
  }

  Team.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false
    },
    linkedin: {
      type: DataTypes.STRING,
      allowNull: true
    },
    link_instagram: {
      type: DataTypes.STRING,
      allowNull: true
    },
    link_github: {
      type: DataTypes.STRING,
      allowNull: true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Team',
    tableName: 'teams', // Ensure this matches the actual table name
    timestamps: false // Set to true if your table has timestamp columns
  });

  return Team;
};
