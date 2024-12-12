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
(1, 'SecCo', 'https://github.com/OrtvinM/Sec-Co-Website.git');


-- Insert test data into users
INSERT INTO users (idusers, userName, firstName, lastName, email, hashed_password) VALUES
(1, 'Ortvin M', 'Ortvin', 'M', 'Ortvin15@gmail.com', '$2b$10$yxEd/G9L.mH.VcEdXR0X6OZSWRvpcUP.k2zFx8bkE9rVIpn6.jvQC');

-- Insert test data into views
INSERT INTO views (userID, projectID) VALUES
(1, 1);