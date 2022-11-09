const inquirer = require('inquirer');
const db = require('./connect/connection')
require('console.table');

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
        } else if (input.option === "Add a Department"){
          addDepartment();
        } else if (input.option === "Add a Role"){
          addRole();
        } else if (input.option === "Add an Employee"){
          addEmployee();
        } else if (input.option === "Update an Employee Role"){
          updateEmployeeRole();
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
    db.query('SELECT * FROM role JOIN department ON role.department_id = department.id', function (err, results) {
        if (err) throw err;
        console.table(results);
        startEmployeeTracker();
      });
};

const viewAllEmployees = () => {
    db.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, manager.first_name AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN employee manager ON manager.id = employee.manager_id', function (err, results) {
        if (err) throw err;
        console.table(results);
        startEmployeeTracker();
      });
};

const addDepartment = () => {
  inquirer.prompt([
    {
      type: "input",
      name: "department_name",
      message: "What is the name of your new department?"
    }
  ])
  .then((input) => {
    console.log(input);
    const param = [input.department_name]
    db.query('INSERT INTO department(name) VALUES (?)', param, function (err, results) {
      if (err) throw err;
      console.table(results);
      startEmployeeTracker();
    });
  });
};

const addRole = () => {
  db.query('SELECT * FROM department', function (err, results) {
    console.log(results)
  const departmentOptions = results.map(department => { return {name: department.name, value: department.id}})
  inquirer.prompt([
    {
      type: "input",
      name: "role_name",
      message: "What is the name of your new role?"
    },
    {
      type: "input",
      name: "role_salary",
      message: "What is the salary of your new role?"
    },
    {
      type: "list",
      name: "role_department",
      message: "What department does your role belong in?",
      choices: departmentOptions

    }
  ])
  .then((input) => {
     db.query('INSERT INTO role(title, salary, department_id) VALUES (?, ?, ?)', [input.role_name, input.role_salary, input.role_department], (err, data) => {
      if (err) throw err;
       startEmployeeTracker();
     });
    });
  });
};

const addEmployee = () => {
  db.query('SELECT * FROM role', function (err, results) {
  const roleOptions = results.map(role => { return {name: role.title, value: role.id}})
    db.query('SELECT * FROM employee', function (err, results) {
      const employeeOptions = results.map(employee => { return {name: employee.first_name + ' ' + employee.last_name, value: employee.id}})
      inquirer.prompt([
        {
          type: "input",
          name: "first_name",
          message: "What is your new employee's first name?"
        },
        {
          type: "input",
          name: "last_name",
          message: "What is your new employee's last name?"
        },
        {
          type: "list",
          name: "role",
          message: "What role does your new employee have?",
          choices: roleOptions
        },
        {
          type: "list",
          name: "manager",
          message: "Who is your employee's manager?",
          choices: employeeOptions
        },
      ])
      .then((input) => {
        db.query('INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [input.first_name, input.last_name, input.role, input.manager], (err, data) => {
         if (err) throw err;
          startEmployeeTracker();
        });
      });
    });
  });
};

const updateEmployeeRole = () => {
  db.query('SELECT * FROM employee', function (err, results) {
  const employeeOptions = results.map(employee => { return {name: employee.first_name + ' ' + employee.last_name, value: employee.id}})
    db.query('SELECT * FROM role', function (err, results) {
      const roleOptions = results.map(role => { return {name: role.title, value: role.id}})
      inquirer.prompt([
        {
          type: "list",
          name: "employee_name",
          message: "Which employee would you like to edit?",
          choices: employeeOptions
        },
        {
          type: "list",
          name: "role",
          message: "What role would you like to give this employee?",
          choices: roleOptions
        }
      ])
      .then((input) => {
        db.query('UPDATE employee SET role_id = ? WHERE id = ?', [input.role, input.employee_name], (err, data) => {
         if (err) throw err;
          startEmployeeTracker();
        });
      });
    });
  });
};

startEmployeeTracker();