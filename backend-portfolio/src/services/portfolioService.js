const { Portfolio, Experience, Skill,  } = require("../models");

exports.getAll = async () => {
    const portfolios = await Portfolio.findAll({
        include: [
            Skill,
            { model: Experience, include: [Skill] }
        ]
    });

    return portfolios.map(portfolio => ({
        id: portfolio.id,
        name: portfolio.name,
        bio: portfolio.bio,
        jobRole: portfolio.job_Role,
        email: portfolio.email,
        github: portfolio.github,
        linkedin: portfolio.linkedin,
        skills: portfolio.skills.map(skill => skill.skill_name),
        experiences: portfolio.experiences.map(experience => ({
            title: experience.title,
            description: experience.description,
            skills: experience.skills.map(skill => skill.skill_name),
            isProject: experience.is_project
        }))
    }));
}

exports.getById = async (id) => {
    const portfolio = await Portfolio.findByPk(id, {
        include: [
            Skill,
            { model: Experience, include: [Skill] }
        ]
    });

    return {
        id: portfolio.id,
        name: portfolio.name,
        bio: portfolio.bio,
        jobRole: portfolio.job_role,
        email: portfolio.email,
        github: portfolio.github,
        linkedin: portfolio.linkedin,
        skills: portfolio.skills.map(skill => skill.skill_name),
        experiences: portfolio.experiences.map(experience => ({
            title: experience.title,
            description: experience.description,
            skills: experience.skills.map(skill => skill.skill_name),
            isProject: experience.is_project
        }))
    };
};

exports.create = async (body) => {
    const { name, bio, jobRole, email, github, linkedin, skills, experiences } = body;

    // create a new portfolio record in the database
    const newPortfolio = await Portfolio.create({
        name,
        bio,
        job_role: jobRole,
        email,
        github,
        linkedin
    });

    // add skills to the portfolio (Many-to-Many)
    if (skills && skills.length > 0) {
        // find or create skills in the database
        const skillInstances = await Promise.all( // Promise.all() to wait for all the promises to resolve
            skills.map(async (skillName) => {
                const [skill] = await Skill.findOrCreate({
                    where: { skill_name: skillName }
                });
                return skill;
            })
        );
        await newPortfolio.addSkills(skillInstances);
    }

    // add experiences to the portfolio (One-to-Many)
    if (experiences && experiences.length > 0) {
        for (const exp of experiences) {
            const newExperience = await Experience.create({
                title: exp.title,
                description: exp.description,
                is_project: exp.isProject,
                portfolio_id: newPortfolio.id
            });

            // add skills to the experience (Many-to-Many)
            if (exp.skills && exp.skills.length > 0) {
                const expSkillInstances = await Promise.all(
                    exp.skills.map(async (skillName) => {
                        const [skill] = await Skill.findOrCreate({
                            where: { skill_name: skillName }
                        });
                        return skill;
                    })
                );
                await newExperience.addSkills(expSkillInstances);
            }
        }
    }

    return newPortfolio.id;
};
