# Create database script for Bettys books

# Create the database
CREATE DATABASE IF NOT EXISTS Os-portfolio;
USE Os-portfolio;

# Create the tables
CREATE TABLE IF NOT EXISTS projects (id INT AUTO_INCREMENT,name VARCHAR(50),price DECIMAL(5, 2) unsigned,PRIMARY KEY(id));

# Create the app user
CREATE USER IF NOT EXISTS 'Os-portfolio_app'@'localhost' IDENTIFIED BY 'qwertyuiop'; 
GRANT ALL PRIVILEGES ON Os-portfolio.* TO ' Os-portfolio_app'@'localhost';
