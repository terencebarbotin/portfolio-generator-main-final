const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Portfolio = require("./portfolio.model");

const Experience = sequelize.define("experiences", {
    id: { 
        type: DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true 
    },
    title: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    description: { 
        type: DataTypes.TEXT, 
        allowNull: false 
    },
    is_project: { 
        type: DataTypes.BOOLEAN, 
        allowNull: false 
    }
}, {timestamps: false });

// Relationship between Portfolio and Experience : One-to-Many
Portfolio.hasMany(Experience, { foreignKey: "portfolio_id", onDelete: "CASCADE" });
Experience.belongsTo(Portfolio, { foreignKey: "portfolio_id" });

module.exports = Experience;
