-- insert roles
INSERT INTO role (permission_level) VALUES ('ADMIN');
INSERT INTO role (permission_level) VALUES ('TEACHER');
INSERT INTO role (permission_level) VALUES ('STUDENT');

-- insert accounts -- all passwords: "password"
INSERT INTO account (username, password, email, city, street, phone)
    VALUES ('username', '$2a$12$vIbiC0Fw0w/EvE1dnoZ.1udL4NI7HSw4UzbqVnBOOW6D.tYzWHuQK', 'email@email.com', 'Lodz', 'Street', '111111111');
INSERT INTO account (username, password, email, city, street, phone)
    VALUES ('testteacher', '$2a$12$vIbiC0Fw0w/EvE1dnoZ.1udL4NI7HSw4UzbqVnBOOW6D.tYzWHuQK', 'teacheremail@email.com', 'Lodz', 'Street', '333333333');
INSERT INTO account (username, password, email, city, street, phone)
    VALUES ('teststudent', '$2a$12$vIbiC0Fw0w/EvE1dnoZ.1udL4NI7HSw4UzbqVnBOOW6D.tYzWHuQK', 'studentemail@email.com', 'Lodz', 'Street', '333333333');

-- insert account_roles
INSERT INTO account_role (account_id, roles_id) VALUES (1,1);
INSERT INTO account_role (account_id, roles_id) VALUES (2,2);
INSERT INTO account_role (account_id, roles_id) VALUES (3,3);