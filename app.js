const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const path = require("path");
// const OUTPUT_DIR = path.resolve(__dirname, "output");
// const outputPath = path.join(OUTPUT_DIR, "team.html");
const outputPath = path.resolve(__dirname, "output", "team.html");
const render = require('./lib/htmlRenderer')

const allEmployee = [];
const inquirer = require("inquirer");
const fs = require("fs");

const employeeQuestions = [
    {
        type: "input",
        message: "What your name?",
        name: "name"
    },
    {
        type: "input",
        message: "What is yor ID?",
        name: "id"
    },
    {
        type: "input",
        message: "What is your email address?",
        name: "email"
    },
    {
        type: "list",
        message: "What is your role?",
        name: "role",
        choices: ["Manager", "Intern", "Engineer"]
    },
];

const managerQuestions = [
    {
        type: "input",
        message: "What is your office number?",
        name: "officeNumber"
    }
    
];

const internQuestions = [
    {
        type: "input",
        message: "What is your school?",
        name: "school"
    }
];

const engineerQuestions = [
    {
        type: "input",
        message: "What is your GitHub?",
        name: "github"
    }
];

const newTeamMemberQuestions = [
       {
        type: "list",
        message: "Would you like to add more team member?",
        name: "newTeamMember",
        choices:["yes", "no"]
       }
];


async function makeEmployee(){

await inquirer
        .prompt(employeeQuestions)
        .then(async function (answers) {
            console.log(answers);

            if(answers.role === "Manager") {
                let managerAnswer = await inquirer
                .prompt(managerQuestions)
                const newManager = new Manager(answers.name, answers.id, answers.email, managerAnswer.officeNumber);
                allEmployee.push(newManager);
            }
            if(answers.role === "Intern") {
                let internAnswer = await inquirer
                .prompt(internQuestions)
                const newIntern = new Intern(answers.name, answers.id, answers.email, internAnswer.school);
                allEmployee.push(newIntern);
            }
            if(answers.role === "Engineer") {
                let engineerAnswer = await inquirer
                .prompt(engineerQuestions)
                const newEngineer = new Engineer(answers.name, answers.id, answers.email, engineerAnswer.github);
                allEmployee.push(newEngineer);
            }
        })
        await inquirer
        .prompt(newTeamMemberQuestions)
        .then(async function (answers) {
            if(answers.newTeamMember === "yes") {
                makeEmployee();
            }
            else {

                template = render(allEmployee);
                fs.writeFile(outputPath, template, err => {
                    if(err) {
                        throw err
                    }
                    }
                )

                return;
            }
    })

    }

    makeEmployee();
