# Insert data into the tables
-- Clear all data from tables
DELETE FROM views;
DELETE FROM users;
DELETE FROM projects;

-- Reset auto-increment values (optional, for consistency)
ALTER TABLE views AUTO_INCREMENT = 1;
ALTER TABLE users AUTO_INCREMENT = 1;
ALTER TABLE projects AUTO_INCREMENT = 1;

-- Insert test data into projects
INSERT INTO projects (idProjects, projectName, GitLink) VALUES
(1, 'SecCo', 'https://github.com/OrtvinM/Sec-Co-Website.git'),


-- Insert test data into users
INSERT INTO users (idusers, userName, `password`) VALUES
(1,'Om','Ortvin','M','ortvin14@gmail.com','F1bb2Kv@lmnOqF'),
(2,'SBwilder', 'Stevn','Backs','SB@gmail.com', 'password'),
(3,'MrNightmare','worse','User','Wronguser@yahoo.com','123');

-- Insert test data into views
INSERT INTO views (userID, projectID) VALUES
(1, 1), --  Ortvin M visits Sec-Co
(1, 2), --  Steven Backs visits Sec-Co

