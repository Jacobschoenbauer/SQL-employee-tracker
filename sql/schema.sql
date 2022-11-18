DROP DATABASE IF EXISTS show_db;
CREATE DATABASE show_db;

USE show_db;

CREATE TABLE department (
    id INT NOT NULL,
    department_name VARCHAR(30) NOT NULL,
     PRIMARY KEY(id)
);
CREATE TABLE job_role (
     id INT NOT NULL,
     title VARCHAR(30) NOT NULL,
     salary DECIMAL  NOT NULL,
     department_id INT,
     FOREIGN KEY(department_id)
     REFERENCES department(id)
    
);
CREATE TABLE employee (
     id INT NOT NULL ,
     first_name VARCHAR(30) NOT NULL,
     last_name VARCHAR(30) NOT NULL,
     role_id INT NOT NULL,
     manger_id INT,
     FOREIGN KEY(manger_id)  
     REFERENCES department(id) 
    
);