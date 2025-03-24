INSERT INTO portfolios (name, bio, job_role, email, github, linkedin)
VALUES
('John Doe', 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', 'Software Engineer', 'john.doe@gmail.com', 'https://github.com/', 'https://www.linkedin.com/'),
('Monsieur X', 'Lorem ipsum dolor sit amet consectetur adipisicing elit.', 'Frontend Engineer', 'monsieur.x@gmail.com', 'https://github.com/', 'https://www.linkedin.com/');

INSERT INTO skills (skill_name)
VALUES
('JavaScript'),
('Swagger'),
('Express.js'),
('MongoDB'),
('ReactJS'),
('Node.js'),
('Socket.io'),
('Angular'),
('TypeScript'),
('Sass'),
('VueJS'),
('HTML');

INSERT INTO experiences (portfolio_id, title, description, is_project)
VALUES
(1, 'Project X', 'Description of project X', true),
(1, 'Backend Engineer at Company X', 'Description of the role at company X', false),
(2, 'Project Y', 'Description of project Y', true),
(2, 'Frontend Engineer at Company Y', 'Description of the role at company Y', false);

-- Linking the experiences with their skills
-- For John Doe
INSERT INTO experience_skills (experience_id, skill_id)
VALUES
(1, (SELECT id FROM skills WHERE skill_name = 'ReactJS')),
(1, (SELECT id FROM skills WHERE skill_name = 'Node.js')),
(1, (SELECT id FROM skills WHERE skill_name = 'Socket.io')),
(2, (SELECT id FROM skills WHERE skill_name = 'Angular')),
(2, (SELECT id FROM skills WHERE skill_name = 'TypeScript')),
(2, (SELECT id FROM skills WHERE skill_name = 'Sass'));

-- For Monsieur X
INSERT INTO experience_skills (experience_id, skill_id)
VALUES
(3, (SELECT id FROM skills WHERE skill_name = 'ReactJS')),
(3, (SELECT id FROM skills WHERE skill_name = 'Node.js')),
(3, (SELECT id FROM skills WHERE skill_name = 'Socket.io')),
(4, (SELECT id FROM skills WHERE skill_name = 'Angular')),
(4, (SELECT id FROM skills WHERE skill_name = 'TypeScript')),
(4, (SELECT id FROM skills WHERE skill_name = 'Sass'));

-- Linking the portfolios with their skills
-- For John Doe
INSERT INTO portfolio_skills (portfolio_id, skill_id)
VALUES
(1, (SELECT id FROM skills WHERE skill_name = 'JavaScript')),
(1, (SELECT id FROM skills WHERE skill_name = 'Swagger')),
(1, (SELECT id FROM skills WHERE skill_name = 'Express.js')),
(1, (SELECT id FROM skills WHERE skill_name = 'MongoDB'));

-- For Monsieur X
INSERT INTO portfolio_skills (portfolio_id, skill_id)
VALUES
(2, (SELECT id FROM skills WHERE skill_name = 'ReactJS')),
(2, (SELECT id FROM skills WHERE skill_name = 'Angular')),
(2, (SELECT id FROM skills WHERE skill_name = 'VueJS')),
(2, (SELECT id FROM skills WHERE skill_name = 'HTML'));
