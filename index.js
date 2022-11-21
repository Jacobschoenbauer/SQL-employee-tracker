const inquirer = require("inquirer");
const fs = require("fs");
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
      else if (entered.choice === "Update Employeec Role") updateEmployee();
      else if (entered.choice === "View All Departments") viewDepartment();
      else if (entered.choice === "Add Department") addDepatment();
      else addRole();
    });
}

function allEmployee() {
  app.get("/api/all-employee", (req, res) => {
    const sql = `SELECT id, first_name, last_name, role_id, manager_id FROM employee`;

    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        message: "success",
        data: rows,
      });
    });
  });
}
function addEmployee() {
  app.post("/api/add-employee", ({ body }, res) => {
    const sql = `INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
      VALUES (?)`;
    const params = [body.movie_name];

    db.query(sql, params, (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: "success",
        data: body,
      });
    });
  });
}

//function updateEmployee(){};
function viewDepartment() {
  app.get("/api/view-department", (req, res) => {
    const sql = `SELECT id, department_name FROM department`;

    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        message: "success",
        data: rows,
      });
    });
  });
}

//function addDepatment(){};
//function addRole(){};
menu();
