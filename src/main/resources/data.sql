-- insert roles
INSERT INTO role (permission_level) VALUES ('ADMIN');
INSERT INTO role (permission_level) VALUES ('TEACHER');
INSERT INTO role (permission_level) VALUES ('STUDENT');

-- insert accounts -- all passwords: "password"
INSERT INTO account (username, password, email, city, street, phone)
    VALUES ('testadmin', '$2a$12$vIbiC0Fw0w/EvE1dnoZ.1udL4NI7HSw4UzbqVnBOOW6D.tYzWHuQK', 'adminemail@email.com', 'Lodz', 'Street', '111111111');
INSERT INTO account (username, password, email, city, street, phone)
    VALUES ('testteacher', '$2a$12$vIbiC0Fw0w/EvE1dnoZ.1udL4NI7HSw4UzbqVnBOOW6D.tYzWHuQK', 'teacheremail@email.com', 'Lodz', 'Street', '333333333');
INSERT INTO account (username, password, email, city, street, phone)
    VALUES ('teststudent', '$2a$12$vIbiC0Fw0w/EvE1dnoZ.1udL4NI7HSw4UzbqVnBOOW6D.tYzWHuQK', 'studentemail@email.com', 'Lodz', 'Street', '333333333');

-- insert account_roles
INSERT INTO account_role (account_id, roles_id) VALUES (1,1);
INSERT INTO account_role (account_id, roles_id) VALUES (2,2);
INSERT INTO account_role (account_id, roles_id) VALUES (3,3);

INSERT INTO account_levels (account_id, level) VALUES (1, 'PRIMARY_SCHOOL');
INSERT INTO account_levels (account_id, level) VALUES (1, 'MIDDLE_SCHOOL');
INSERT INTO account_levels (account_id, level) VALUES (2, 'UNIVERSITY');
INSERT INTO account_levels (account_id, level) VALUES (3, 'HIGH_SCHOOL');

-- insert subjects
INSERT INTO account_subjects (account_id, subject) VALUES (1, 'MATHEMATICS');
INSERT INTO account_subjects (account_id, subject) VALUES (1, 'PHYSICS');
INSERT INTO account_subjects (account_id, subject) VALUES (2, 'BIOLOGY');
INSERT INTO account_subjects (account_id, subject) VALUES (2, 'CHEMISTRY');
INSERT INTO account_subjects (account_id, subject) VALUES (3, 'ENGLISH');
INSERT INTO account_subjects (account_id, subject) VALUES (3, 'GEOGRAPHY');
