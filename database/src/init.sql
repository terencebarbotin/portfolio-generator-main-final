-- Drop tables if they already exist to avoid conflicts
DROP TABLE IF EXISTS experience_skills;
DROP TABLE IF EXISTS portfolio_skills;
DROP TABLE IF EXISTS experiences;
DROP TABLE IF EXISTS skills;
DROP TABLE IF EXISTS portfolios;

-- "portfolios" table : Stores user information related to their portfolio
CREATE TABLE portfolios (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    bio TEXT NOT NULL,
    job_role VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    github VARCHAR(255),
    linkedin VARCHAR(255)
);

-- "skills" table : Stores all unique skills
CREATE TABLE skills (
    id SERIAL PRIMARY KEY,
    skill_name VARCHAR(100) UNIQUE NOT NULL
);

-- "experiences" table : Stores user experiences and projects
CREATE TABLE experiences (
    id SERIAL PRIMARY KEY,
    portfolio_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    is_project BOOLEAN NOT NULL,
    FOREIGN KEY (portfolio_id) REFERENCES portfolios(id) ON DELETE CASCADE
);

-- "experience_skills" table : Relates experiences and skills
CREATE TABLE experience_skills (
    experience_id INT NOT NULL,
    skill_id INT NOT NULL,
    PRIMARY KEY (experience_id, skill_id),
    FOREIGN KEY (experience_id) REFERENCES experiences(id) ON DELETE CASCADE,
    FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE
);

-- "portfolio_skills" table : Relates portfolios and skills
CREATE TABLE portfolio_skills (
    portfolio_id INT NOT NULL,
    skill_id INT NOT NULL,
    PRIMARY KEY (portfolio_id, skill_id),
    FOREIGN KEY (portfolio_id) REFERENCES portfolios(id) ON DELETE CASCADE,
    FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE
);
