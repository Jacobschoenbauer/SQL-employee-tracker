const express = require("express");
const inquirer = require("inquirer");
const fs = require("fs");
const mysql = require("mysql2");
//const index = require("./index");
const PORT = process.env.PORT || 6500;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "",
    database: "show_db",
  },
  console.log(`Connected to the show_db database.`)
);
db.connect((err) => {
  if (err) throw err;
  console.log(`Connected as id ${db.threadId} \n`);
  menu();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
function menu() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: [
          "View all Employees",
          "Add Employee",
          "Update Employee Role",
          "Add Role",
          "View All Roles",
          "View All Departments",
          "Add Department",
        ],
        validate: (optionGroup) => {
          if (optionGroup) {
            return true;
          } else {
            console.log("please choose a job");
            return false;
          }
        },
      },
    ])
    .then((entered) => {
      console.log(entered.choice);
      if (entered.choice === "View all Employees") allEmployee();
      else if (entered.choice === "Add Employee") addEmployee();
      else if (entered.choice === "View All Departments") viewDepartment();
      else if (entered.choice === "View All Roles") viewRoles();
      else if (entered.choice === "Add Department") addDepatment();
      else if (entered.choice === "Add Role") addRole();
      else addRole();
    });
}

function allEmployee() {
  db.query(
    `SELECT id, first_name, last_name, role_id, manager_id FROM employee;`,
    (err, res) => {
      if (err) throw err;
      console.table(res);
      menu();
    }
  );
}

function addEmployee() {
  db.query(`SELECT id as value, title as name FROM role;`, (err, roles) => {
    console.log(roles);
    db.query(`SELECT * FROM employee;`, (err, res) => {
      if (err) throw err;
      let employees = res.map((employee) => ({
        name: employee.first_name + " " + employee.last_name,
        value: employee.id,
      }));
      console.log(employees);
      inquirer
        .prompt([
          {
            name: "firstName",
            type: "input",
            message: "What is the new employee's first name?",
          },
          {
            name: "lastName",
            type: "input",
            message: "What is the new employee's last name?",
          },
          {
            name: "role",
            type: "list",
            message: "What is the new employee's title?",
            choices: roles,
          },
          {
            name: "manager",
            type: "list",
            message: "Who is the new employee's manager?",
            choices: employees,
          },
        ])
        .then((response) => {
          db.query(
            `INSERT INTO employee SET ?`,
            {
              first_name: response.firstName,
              last_name: response.lastName,
              role_id: response.role,
              manager_id: response.manager,
            },
            (err, res) => {
              if (err) throw err;
              console.log(
                `${response.firstName} ${response.lastName} successfully added to database!`
              );
              menu();
            }
          );
        });
    });
  });
}

function viewDepartment() {
  db.query(`SELECT id, name FROM department;`, (err, res) => {
    if (err) throw err;
    console.table(res);
    menu();
  });
}

function addDepatment() {
  function addRole() {
    inquirer
      .prompt([
        {
          name: "new_department",
          type: "input",
          message: "What is the new Department?",
        },
      ])
      .then((response) => {
        db.query(
          `INSERT INTO department SET ?`,
          {
            name: response.new_department,
          },
          (err, res) => {
            if (err) throw err;
            console.log(
              ` ${response.new_department} successfully added to department!`
            );
            menu();
          }
        );
      });
  }
}
function addRole() {
  inquirer
    .prompt([
      {
        name: "new_role",
        type: "input",
        message: "What is the new role?",
      },
    ])
    .then((response) => {
      db.query(
        `INSERT INTO role SET ?`,
        {
          title: response.new_role,
        },
        (err, res) => {
          if (err) throw err;
          console.log(` ${response.new_role} successfully added to role!`);
          menu();
        }
      );
    });
}
function viewRoles() {
  db.query(`SELECT id role FROM role;`, (err, res) => {
    if (err) throw err;
    console.table(res);
    menu();
  });
  menu();
}
