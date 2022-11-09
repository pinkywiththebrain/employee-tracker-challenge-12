INSERT INTO department(name)
VALUES
    ('Engineering'),
    ('Finance'),
    ('Legal'),
    ('HR'),
    ('Management');

INSERT INTO role(title, salary, department_id)
VALUES
    ("Senior Software Developer", 70000, 1),
    ("Junior Software Developer", 40000, 1),
    ("Financial Advisor", 65000, 2),
    ("Business Lawyer", 100000, 3),
    ("Human Resources Officer", 60000, 4),
    ("Department Manager", 90000, 5),
    ("CEO", 300000, 5);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
    ('David', 'Wallace', 7, NULL),
    ('Michael', 'Scott', 6, 1),
    ('Jim', 'Halpert', 1, 2),
    ('Dwight', 'Schrute', 1, 2),
    ('Pamela', 'Beesly', 2, 3),
    ('Kevin', 'Malone', 3, 1),
    ('Andrew', 'Bernard', 1, 2),
    ('Toby', 'Flenderson', 5, 1),
    ('Angela', 'Martin', 3, 1),
    ('Stanley', 'Hudson', 4, 1);

-- Note: employees must be ordered by managers first because you can't reference an employee who hasn't been created yet (manager_id)