const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Portfolio = require("./portfolio.model");
const Skill = require("./skill.model");

const PortfolioSkills = sequelize.define("portfolio_skills", {

}, {timestamps: false });

// Relation many-to-many
Portfolio.belongsToMany(Skill, { through: PortfolioSkills, foreignKey: "portfolio_id" });
Skill.belongsToMany(Portfolio, { through: PortfolioSkills, foreignKey: "skill_id" });

module.exports = PortfolioSkills;
