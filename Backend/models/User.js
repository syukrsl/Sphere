// models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../dbConnect'); // Import your Sequelize instance

const User = sequelize.define('User', {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
    
    // Sync the model with the database (creates the table if it doesn't exist)
    User.sync();
    