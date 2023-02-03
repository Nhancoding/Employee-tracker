USE employee_tracker;

INSERT INTO department (name) VALUES 
    ("sales"),
    ("engineering"),
    ("marketing"),
    ("hr");

INSERT INTO role (title, salary, department_id) VALUES
    ("sales director", 100000, 1), 
    ("account executive", 60000, 1), 
    ("software engineer", 120000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
    ("Nhan", "Duong", 3, NULL),
    ("Bobby", "Bob", 1, NULL),
    ("Joe", "Brito", 2, 2);