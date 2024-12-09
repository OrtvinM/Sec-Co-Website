CREATE DATABASE  IF NOT EXISTS `os-portfolio` 
USE `os-portfolio`;
DROP TABLE IF EXISTS projects;
CREATE TABLE `projects` (
  `idProjects` int NOT NULL AUTO_INCREMENT,
  `projectName` varchar(45) NOT NULL,
  `GitLink` varchar(500) NOT NULL,
  PRIMARY KEY (`idProjects`),
  UNIQUE KEY `idProjects_UNIQUE` (`idProjects`),
  UNIQUE KEY `projectName_UNIQUE` (`projectName`),
  UNIQUE KEY `GitLink_UNIQUE` (`GitLink`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `idusers` int NOT NULL AUTO_INCREMENT,
  `userName` varchar(45) NOT NULL,
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `email` varchar(450) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`idusers`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS views;

CREATE TABLE views (
  userID int NOT NULL,
  projectID int NOT NULL,
  KEY FKuserID_idx (userID),
  KEY FKprojectID_idx (projectID),
  CONSTRAINT FKprojectID FOREIGN KEY (projectID) REFERENCES projects (idProjects),
  CONSTRAINT FKuserID FOREIGN KEY (userID) REFERENCES users (idusers)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;