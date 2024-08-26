'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    static associate(models) {
      // Define associations here
    }
  }

  Project.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    link_project: { // New column added
      type: DataTypes.STRING,
      allowNull: true // Set to true if this field is optional
    }
  }, {
    sequelize,
    tableName: 'projects',
    modelName: 'Project',
  });

  return Project;
};
