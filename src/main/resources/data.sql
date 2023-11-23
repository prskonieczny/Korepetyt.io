INSERT INTO role (permission_level) VALUES ('ADMIN');
INSERT INTO role (permission_level) VALUES ('TEACHER');
INSERT INTO role (permission_level) VALUES ('STUDENT');

INSERT INTO account (username, password, email, city, street, phone)
    VALUES ('username', '$2a$12$vIbiC0Fw0w/EvE1dnoZ.1udL4NI7HSw4UzbqVnBOOW6D.tYzWHuQK', 'email@email.com', 'Lodz', 'Street', '123123123');

INSERT INTO account_role (account_id, roles_id) VALUES (1,1)