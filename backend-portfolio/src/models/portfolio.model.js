const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Portfolio = sequelize.define('portfolios', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    bio: { 
        type: DataTypes.TEXT, 
        allowNull: false 
    },
    job_role: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    email: { 
        type: DataTypes.STRING, 
        allowNull: false, 
        validate: { 
            isEmail: true 
        } 
    },
    github: { 
        type: DataTypes.STRING, 
        validate: { 
            isUrl: true 
        } 
    },
    linkedin: { 
        type: DataTypes.STRING, 
        validate: { 
            isUrl: true 
        } 
    }
}, {timestamps: false });

module.exports = Portfolio;
