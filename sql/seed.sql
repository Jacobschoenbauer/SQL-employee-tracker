INSERT INTO department (id, department_name)
VALUES   (1, "Sales"),
         (2, "Engineering"),
         (3,"Finance" ),
         (4, "Legal")

INSERT INTO role (id, title, salary, department_id)
VALUES  (1, "Super Seller", 70000, 2),
        (2, "Super Boss", 80000, 1),
        (3, "Smaller Seller", 10000, 3),
        (4, "Does It All", 10000, 4)
    

INSERT INTO employee (id, first_name, last_name, role_id, manger_id)
VALUES (1, "Ben", "Schoenbauer", 2, NULL),
       (2, "Mike", "Schoenbauer", 4, 3),
       (3, "Dave", "Schoenbauer", 1, 4),
       (4, "Jake", "Schoenbauer", 3, 2)