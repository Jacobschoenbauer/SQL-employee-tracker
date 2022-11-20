DROP DATABASE IF EXISTS show_db;
CREATE DATABASE show_db;

USE show_db;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT ,
    name VARCHAR(30) NOT NULL, 
    PRIMARY KEY(id)
);
CREATE TABLE role (
     id INT NOT NULL AUTO_INCREMENT,
     title VARCHAR(30) NOT NULL,
     salary DECIMAL (10,2), 
     department_id INT,
     FOREIGN KEY(department_id) REFERENCES department(id) ON DELETE SET NULL,
     PRIMARY KEY(id)
);
CREATE TABLE employee (
     id INT NOT NULL AUTO_INCREMENT,
     first_name VARCHAR(30) NOT NULL,
     last_name VARCHAR(30) NOT NULL,
     role_id INT,
     manger_id INT,
     FOREIGN KEY(manger_id)REFERENCES role(id) ON DELETE SET NULL, 
    FOREIGN KEY(role_id) REFERENCES role(id) ON DELETE SET NULL,
    PRIMARY KEY(id)
);