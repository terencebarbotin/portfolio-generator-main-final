SELECT * FROM portfolios;

SELECT * FROM skills;

SELECT * FROM experiences;

SELECT e.id AS experience_id, e.title, s.id AS skill_id, s.skill_name
FROM experience_skills es
JOIN experiences e ON es.experience_id = e.id
JOIN skills s ON es.skill_id = s.id
ORDER BY e.id;

SELECT p.id AS portfolio_id, p.name, s.id AS skill_id, s.skill_name
FROM portfolio_skills ps
JOIN portfolios p ON ps.portfolio_id = p.id
JOIN skills s ON ps.skill_id = s.id
ORDER BY p.id;

SELECT p.id AS portfolio_id, p.name, e.id AS experience_id, e.title, e.is_project
FROM experiences e
JOIN portfolios p ON e.portfolio_id = p.id
ORDER BY p.id;
