const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Skill = sequelize.define("skills", {
    id: { 
        type: DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true 
    },
    skill_name: { 
        type: DataTypes.STRING, 
        allowNull: false, 
        unique: true 
    }
}, {timestamps: false });

module.exports = Skill;
