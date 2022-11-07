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
    ('Michael', 'Scott', 6, 10),
    ('Jim', 'Halpert', 1, 1),
    ('Dwight', 'Schrute', 1, 1),
    ('Pamela', 'Beesly', 2, 2),
    ('Kevin', 'Malone', 3, 1),
    ('Andrew', 'Bernard', 1, 1),
    ('Toby', 'Flenderson', 5, 10),
    ('Angela', 'Martin', 3, 1),
    ('Stanley', 'Hudson', 4, 10),
    ('David', 'Wallace', 7, NULL);