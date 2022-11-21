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
          "Update Employeec Role",
          "Add Role",
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
      else if (entered.choice === "Update Employee Role") updateEmployee();
      else if (entered.choice === "View All Departments") viewDepartment();
      else if (entered.choice === "Add Department") addDepatment();
      else addRole();
    });
}

function allEmployee() {
  db.query(
    `SELECT id, first_name, last_name, role_id, manger_id FROM employee;`,
    (err, res) => {
      if (err) throw err;
      console.table("\n", res, "\n");
      menu();
    }
  );
}

function addEmployee() {
  db.query(`SELECT * FROM role;`, (err, res) => {
    if (err) throw err;
    let roles = res.map((role) => ({ name: role.title, value: role.role_id }));
    db.query(`SELECT * FROM employee;`, (err, res) => {
      if (err) throw err;
      let employees = res.map((employee) => ({
        name: employee.first_name + " " + employee.last_name,
        value: employee.employee_id,
      }));

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
              role: response.role_id,
              manager_id: response.manager,
            },
            (err, res) => {
              if (err) throw err;
            }
          );
          db.query(
            `INSERT INTO role SET ?`,
            {
              department_id: response.dept,
            },
            (err, res) => {
              if (err) throw err;
              console.log(
                `\n ${response.firstName} ${response.lastName} successfully added to database! \n`
              );
              menu();
            }
          );
        });
    });
  });
}

//function updateEmployee(){ menu()};
function viewDepartment() {
  db.query(`SELECT id, name FROM department;`, (err, res) => {
    if (err) throw err;
    console.table("\n", res, "\n");
    menu();
  });
}

//function addDepatment(){ menu()};
function addRole() {
  db.query(`SELECT id role FROM role;`, (err, res) => {
    if (err) throw err;
    console.table("\n", res, "\n");
    menu();
  });
}
