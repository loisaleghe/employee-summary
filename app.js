const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const outputPath = path.join(__dirname, 'index.html')

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const managerQuestions = [
    {
        name: "name",
        message: "Enter manager's name: "
    },

    {
        name: "id",
        message: "Enter employee id: ",
        validate(input) {
            if (input == false || isNaN(input)) {
              return "id must be a number";
            }
            return true;
          }
    },

    {
        name: "email",
        message: "Enter email address: "
    },

    {
        name: "officeNumber",
        message: "Enter office number: ",
        validate(input) {
            if (input == false || isNaN(input)) {
              return "Office number must be a number";
            }
            return true;
          }
    }
]

const engineerQuestions = [
    {
        name: "name",
        message: "Enter engineer's name: "
    },

    {
        name: "id",
        message: "Enter employee's id: ",
        validate(input) {
            if (input == false || isNaN(input)) {
              return "id must be a number";
            }
            return true;
          }
    },

    {
        name: "email",
        message: "Enter email address: "
    },

    {
        name: "github",
        message: "Enter github username: "
    }
]

const internQuestions = [
    {
        name: "name",
        message: "Enter intern's name: "
    },

    {
        name: "id",
        message: "Enter intern's id: ",
        validate(input) {
            if (input == false || isNaN(input)) {
              return "id must be a number";
            }
            return true;
          }

    },

    {
        name: "email",
        message: "Enter email adrress: "
    },

    {
        name: "school",
        message: "Enter name of school: "
    }
]

const employeeQuestions = [
    {
      type: "list",
      name: "newEmployee",
      message: "Add a new team member?",
      choices: ["Add engineer", "Add intern", "No"],
    },
  ]

  let employees = [];
  
  let addEmployee = async () => {
    let question = await inquirer.prompt(employeeQuestions);
    if (question.addEmployee == "Add engineer") {
      let engineer = await inquirer.prompt(engineerQuestions);
      let newEngineer = new Engineer(
        engineer.name,
        engineer.id,
        engineer.email,
        engineer.github
      );
      employees.push(newEngineer);
      if (engineer.name) {
        addEmployee();
      }
    } else if (question.addEmployee == "Add intern") {
      let intern = await inquirer.prompt(internQuestions);
      let newIntern = new Intern(
        intern.name,
        intern.id,
        intern.email,
        intern.school
      );
      employees.push(newIntern);
      if (intern.name) {
        addEmployee();
      }
    } else {
      fs.writeFileSync(outputPath, render(employees));
    }
  };

  (async () => {
    let manager = await inquirer.prompt(managerQuestions);
    newManager = new Manager(
      manager.name,
      manager.id,
      manager.email,
      manager.officeNumber
    );
    employees.push(newManager);
    addEmployee();
  })();

