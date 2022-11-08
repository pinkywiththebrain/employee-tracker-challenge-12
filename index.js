const inquirer = require('inquirer');
const db = require('./connect/connection')
require('console.table');

//view all departments > shows department names and department ids
//view all roles > shows job title, role id, the department the role belongs to, and the salary for the role
//view all employees > formatted table showing employee ids, first name, last name, job titles, departments, salaries, and managers they report to
//add a department > prompted to enter the name of the department and that department is added to the list of departments
//add a role > prompted to enter the name, salary, and department for the role and it is added to the list
//add an employee > prompted to add employee's first name, last name, role, and manager, and it is added to the database
//update employee role > prompted to select employee and update their role and the info is updated


const startEmployeeTracker = () => {
    inquirer.prompt ([
        {
           type: 'list',
           name: 'option',
           message: "Please select an option.",
           choices: [
            "View All Departments",
            "View All Roles",
            "View All Employees",
            "Add a Department",
            "Add a Role",
            "Add an Employee",
            "Update an Employee Role"
           ],
        }
    ])
    .then((input) => {
        if (input.option === "View All Departments"){
           viewAllDepartments();
        } else if (input.option === "View All Roles"){
           viewAllRoles();
        } else if (input.option === "View All Employees"){
          viewAllEmployees();
        // } else if (input.option === "Add a Department"){

        // } else if (input.option === "Add a Role"){

        // } else if (input.option === "Add an Employee"){

        // } else if (input.option === "Update an Employee Role"){

        };
     })

};

const viewAllDepartments = () => {
    db.query('SELECT * FROM department', function (err, results) {
        if (err) throw err;
        console.table(results);
        startEmployeeTracker();
      });
};

const viewAllRoles = () => {
    db.query('SELECT * FROM role', function (err, results) {
        if (err) throw err;
        console.table(results);
        startEmployeeTracker();
      });
};

const viewAllEmployees = () => {
    db.query('SELECT * FROM employee', function (err, results) {
        if (err) throw err;
        console.table(results);
        startEmployeeTracker();
      });
};

startEmployeeTracker();