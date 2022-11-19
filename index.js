const inquirer = require("inquirer");
const fs = require("fs");

function menu() {
  inquirer
    .prompt([
      // choice type add engeneer, add intern or crfeate profile
      {
        type: "list",
        name: "choice",
        message: "Choose from options below",
        choices: [
          "add manager",
          "add engineer",
          "add intern",
          "Create Profile",
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
      if (entered.choice === "add engineer") defineEngineer();
      else if (entered.choice === "add intern") defineIntern();
      else if (entered.choice === "add manager") defineManager();
      else createProfile();
    });
}

function createProfile() {
  console.log(team);
  const generateMarkingdown = generateMarkdown(team);
  fs.writeFile("./dist/Team-Profile.html", generateMarkingdown, (err) => {
    if (err) console.log(err);
    else {
      console.log("Finished");
    }
  });
}
