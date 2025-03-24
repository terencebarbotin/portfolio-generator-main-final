const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Experience = require("./experience.model");
const Skill = require("./skill.model");

const ExperienceSkills = sequelize.define("experience_skills", {
    
}, {timestamps: false });

// Relation many-to-many
Experience.belongsToMany(Skill, { through: ExperienceSkills, foreignKey: "experience_id" });
Skill.belongsToMany(Experience, { through: ExperienceSkills, foreignKey: "skill_id" });

module.exports = ExperienceSkills;
