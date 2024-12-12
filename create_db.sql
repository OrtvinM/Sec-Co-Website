-- Drop the database if it exists and recreate it
DROP DATABASE IF EXISTS `os-portfolio`;
CREATE DATABASE `os-portfolio`;
USE `os-portfolio`;

-- Drop and recreate the projects table
DROP TABLE IF EXISTS `projects`;
CREATE TABLE `projects` (
  `idProjects` int NOT NULL AUTO_INCREMENT,
  `projectName` varchar(45) NOT NULL,
  `GitLink` varchar(500) NOT NULL,
  PRIMARY KEY (`idProjects`),
  UNIQUE KEY `idProjects_UNIQUE` (`idProjects`),
  UNIQUE KEY `projectName_UNIQUE` (`projectName`),
  UNIQUE KEY `GitLink_UNIQUE` (`GitLink`)
) 

-- Drop and recreate the users table
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `idusers` int NOT NULL AUTO_INCREMENT,
  `userName` varchar(45) NOT NULL,
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `email` varchar(450) NOT NULL,
  `hashed_password` varchar(450) NOT NULL,
  PRIMARY KEY (`idusers`)
) 

-- Drop and recreate the views table
DROP TABLE IF EXISTS `views`;
CREATE TABLE `views` (
  userID int NOT NULL,
  projectID int NOT NULL,
  KEY FKuserID_idx (userID),
  KEY FKprojectID_idx (projectID),
  CONSTRAINT FKprojectID FOREIGN KEY (projectID) REFERENCES projects (idProjects),
  CONSTRAINT FKuserID FOREIGN KEY (userID) REFERENCES users (idusers)
) 