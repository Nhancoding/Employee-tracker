const inquirer = require("inquirer");
const { changeUser } = require("./db/connection");
const db = require("./db/connection")

const init = () => {
    return inquirer.prompt({
        type:"list",
        message: "What would you like to do?",
        name: "option",
        choices: ["View all department", "View all employees", "View all roles", "Add department", "Add employee", "Add role", "Exit"]
    }).then(options => {
        // console.log(options);
        if (options.option === "View all department") {
            viewAllDepartment() 
        }
        if (options.option === "View all employees") {
            viewAllEmployee() 
        }
        if (options.option === "View all roles") {
            viewAllRoles() 
        }
        if (options.option === "Add department") {
            addDepartment() 
        }
        if (options.option === "Add employee") {
            addEmployee() 
        }
        if (options.option === "Add role") {
            addRole()
        }
        if (options.option === "Exit") {
            process.exit()
        }
    })

};

const viewAllDepartment = () => {
    db.query("SELECT * FROM department", (err, res) => {
        console.table(res)
        init()
    })
    
}

const viewAllEmployee = () => {
    db.query("SELECT * FROM employee", (err, res) => {
        console.table(res)
        init()
    })
}

const viewAllRoles = () => {
    db.query("SELECT role.title AS 'title' department.name AS 'department' role.salary AS 'salary' FROM role LEFT JOIN department ON (department.id = role.department_id)", (err, res) => {
        console.table(res)
        init()
    })

}

const addDepartment = () => {

}

const addEmployee = () => {

}

const addRole = () => {

}


init()