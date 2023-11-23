CREATE TABLE account (
                         id INT PRIMARY KEY,
                         username VARCHAR(255) UNIQUE NOT NULL,
                         password VARCHAR(255) NOT NULL,
                         phone VARCHAR(255) NOT NULL,
                         email VARCHAR(255) UNIQUE NOT NULL,
                         city VARCHAR(255) NOT NULL,
                         street VARCHAR(255) NOT NULL
);

CREATE TABLE account_role (
                              account_id INT,
                              role_id INT,
                              PRIMARY KEY (account_id, role_id),
                              FOREIGN KEY (account_id) REFERENCES account(id),
                              FOREIGN KEY (role_id) REFERENCES role(id)
);

CREATE TABLE lesson (
                        id INT PRIMARY KEY,
                        start_time TIMESTAMP NOT NULL,
                        end_time TIMESTAMP NOT NULL,
                        student_account_id INT NOT NULL,
                        teacher_account_id INT NOT NULL,
                        description VARCHAR(2000) NOT NULL,
                        subject VARCHAR(255) NOT NULL,
                        lesson_status VARCHAR(255),
                        FOREIGN KEY (student_account_id) REFERENCES account(id),
                        FOREIGN KEY (teacher_account_id) REFERENCES account(id)
);

CREATE TABLE role (
                      id INT PRIMARY KEY,
                      created_at TIMESTAMP,
                      updated_at TIMESTAMP,
                      permission_level VARCHAR(255) NOT NULL
);

CREATE TABLE opinion (
                         id INT PRIMARY KEY,
                         star_review VARCHAR(255) NOT NULL,
                         opinion_content VARCHAR(1000),
                         opinion_pros VARCHAR(500),
                         opinion_cons VARCHAR(500),
                         student_username VARCHAR(255),
                         teacher_id BIGINT,
                         is_hidden BOOLEAN,
                         creation_date TIMESTAMP NOT NULL
);

ALTER TABLE opinion
    ADD CONSTRAINT star_review_check CHECK (star_review IN ('ONE_STAR', 'TWO_STARS', 'THREE_STARS', 'FOUR_STARS', 'FIVE_STARS'));

ALTER TABLE opinion
    ADD FOREIGN KEY (teacher_id) REFERENCES account(id);

-- INSERT INTO role (permission_level) VALUES ('ADMIN')
--
-- INSERT INTO account (username, password, email, city, street, phone)
--     VALUES ('username', '$2a$12$vIbiC0Fw0w/EvE1dnoZ.1udL4NI7HSw4UzbqVnBOOW6D.tYzWHuQK', 'email@email.com', 'Lodz', 'Street', '123123123');
-- INSERT INTO account_role (account_id, roles_id) VALUES (1,1)