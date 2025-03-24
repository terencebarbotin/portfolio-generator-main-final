const sequelize = require('../config/database');
const Portfolio = require("./portfolio.model");
const Experience = require("./experience.model");
const Skill = require("./skill.model");
const ExperienceSkills = require("./experienceSkills.model");
const PortfolioSkills = require("./portfolioSkills.model");

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('[INFO] Connection to the database has been established successfully.');
    } catch (error) {
        console.error('[ERROR] Unable to connect to the database:', error);
    }
}

// async function syncDatabase() {
//     try {
//         await sequelize.sync({ alter: true });
//         console.log('[INFO] Database synchronized with models.');
//     } catch (error) {
//         console.error('[ERROR] Unable to sync the database:', error);
//     }
// }

module.exports = { sequelize, testConnection, Portfolio, Experience, Skill, ExperienceSkills, PortfolioSkills };