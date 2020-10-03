//bring in class objects
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

//get necessaray dependency code
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

//build path
const OUTPUT_DIR = path.resolve(__dirname, "output"); // "./output"
const outputPath = path.join(OUTPUT_DIR, "team.html"); // "./output/team.html"

//render function that will return html code
const render = require("./lib/htmlRenderer");
const { inherits } = require("util");

const employees = [];

const managerQuestions = [{
        type: "input",
        name: "managerName",
        message: "What is the manager name?",
    },
    {
        type: "input",
        name: "managerId",
        message: "What is the manager id?",
    },
    {
        type: "input",
        name: "managerEmail",
        message: "What is the manager Email?",
    },
    {
        type: "input",
        name: "managerOfficeNumber",
        message: "What is the manager office number?",
    },
];
const engineerQuestions = [{
        type: "input",
        name: "engineerName",
        message: "What is the engineer name?",
    },
    {
        type: "input",
        name: "engineerId",
        message: "What is the engineer id?",
    },
    {
        type: "input",
        name: "engineerEmail",
        message: "What is the engineer Email?",
    },
    {
        type: "input",
        name: "engineerGithub",
        message: "What is the engineer Github?",
    },
];
const internQuestions = [{
        type: "input",
        name: "internName",
        message: "What is the intern name?",
    },
    {
        type: "input",
        name: "internId",
        message: "What is the intern id?",
    },
    {
        type: "input",
        name: "internEmail",
        message: "What is the intern Email?",
    },
    {
        type: "input",
        name: "internSchool",
        message: "What is the intern School?",
    },
];

const addEmployee = () => {
    inquirer
        .prompt([{
            type: "list",
            name: "employeeChoice",
            message: "What kind of employee would you like to add to the team",
            choices: ["Manager", "Engineer", "Intern", "No more please"],
        }, ])
        .then((answer) => {
            switch (answer.employeeChoice) {
                case "Manager":
                    createManager();
                    break;
                case "Engineer":
                    createEngineer();
                    break;
                case "Intern":
                    createIntern();
                    break;
                default:
                    generateTeam();
                    break;
            }
        });
};

const createManager = () => {
    inquirer.prompt(managerQuestions).then((answers) => {
        //use answers to create employee object
        const employee = new Manager(
            answers.managerName,
            answers.managerId,
            answers.managerEmail,
            answers.managerOfficeNumber
        );
        //push employee class object into employees array
        employees.push(employee);
        //ask user if they want to add more employees
        addEmployee();
    });
};
const createEngineer = () => {
    inquirer.prompt(engineerQuestions).then((answers) => {
        //use answers to create employee object
        const employee = new Engineer(
            answers.engineerName,
            answers.engineerId,
            answers.engineerEmail,
            answers.engineerGithub
        );
        //push employee class object into employees array
        employees.push(employee);
        //ask user if they want to add more employees
        addEmployee();
    });
};
const createIntern = () => {
    inquirer.prompt(internQuestions).then((answers) => {
        //use answers to create employee object
        const employee = new Intern(
            answers.internName,
            answers.internId,
            answers.internEmail,
            answers.internSchool
        );
        //push employee class object into employees array
        employees.push(employee);
        //ask user if they want to add more employees
        addEmployee();
    });
};

const generateTeam = () => {
    //we check if the out put folder exist
    if (!fs.existsSync(OUTPUT_DIR)) {
        //if it does not exist then create one
        fs.mkdirSync(OUTPUT_DIR);
    }
    //write to created output html
    fs.writeFileSync(outputPath, render(employees), "utf8");
};

function int() {
    createManager();
}

int();