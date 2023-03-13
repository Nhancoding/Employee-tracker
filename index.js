const inquirer = require("inquirer");
const { changeUser } = require("./db/connection");
const db = require("./db/connection");

const init = () => {
  return inquirer
    .prompt({
      type: "list",
      message: "What would you like to do?",
      name: "option",
      choices: [
        "View all department",
        "View all employees",
        "View all roles",
        "Add department",
        "Add employee",
        "Add role",
        "Exit",
      ],
    })
    .then((options) => {
      // console.log(options);
      if (options.option === "View all department") {
        viewAllDepartment();
      }
      if (options.option === "View all employees") {
        viewAllEmployee();
      }
      if (options.option === "View all roles") {
        viewAllRoles();
      }
      if (options.option === "Add department") {
        addDepartment();
      }
      if (options.option === "Add employee") {
        addEmployee();
      }
      if (options.option === "Add role") {
        addRole();
      }
      if (options.option === "Exit") {
        process.exit();
      }
    });
};

const viewAllDepartment = () => {
  db.query("SELECT * FROM department", (err, res) => {
    console.table(res);
    init();
  });
};

const viewAllEmployee = () => {
  db.query("SELECT * FROM employee", (err, res) => {
    console.table(res);
    init();
  });
};

const viewAllRoles = () => {
  db.query(
    "SELECT role.title AS 'title' department.name AS 'department' role.salary AS 'salary' FROM role LEFT JOIN department ON (department.id = role.department_id)",
    (err, res) => {
      console.table(res);
      init();
    }
  );
};

const addDepartment = () => {
  inquirer
    .prompt({
      type: "input",
      name: "department",
      message: "enter the department name",
    })
    .then((data) => {
      db.query(
        "INSERT INTO department (name) value(?)",
        [data.department],
        (err, res) => {
          console.log(res);
          init();
        }
      );
    });
};

const addEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstname",
        message: "enter first name",
      },
      {
        type: "input",
        name: "lastname",
        message: "enter last name",
      },
      {
        type: "input",
        name: "roleid",
        message: "enter your role",
      },
      {
        type: "input",
        name: "managerid",
        message: "enter manager name",
      },
    ])
    .then((data) => {
      db.query(
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) value(?,?,?,?)",
        [data.firstname, data.lastname, data.roleid, data.managerid],
        (err, res) => {
          console.log(res);
          if (err) {
            console.log(err);
          }
          init();
        }
      );
    });
};

const addRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "enter title",
      },
      {
        type: "input",
        name: "salary",
        message: "enter salary",
      },
      {
        type: "input",
        name: "departmentid",
        message: "enter your department id",
      },
    ])
    .then((data) => {
      db.query(
        "INSERT INTO role (title, salary, department_id) value(?,?,?)",
        [data.title, data.salary, data.departmentid],
        (err, res) => {
          console.log(res);
          if (err) {
            console.log(err);
          }
          init()
        }
      );
    });
};

init();
