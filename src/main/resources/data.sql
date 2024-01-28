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
INSERT INTO account (username, password, email, city, street, phone)
    VALUES ('testteache1r', '$2a$12$vIbiC0Fw0w/EvE1dnoZ.1udL4NI7HSw4UzbqVnBOOW6D.tYzWHuQK', 'teacheremail1@email.com', 'Lodz', 'Street', '313333333');
INSERT INTO account (username, password, email, city, street, phone)
    VALUES ('testteacher2', '$2a$12$vIbiC0Fw0w/EvE1dnoZ.1udL4NI7HSw4UzbqVnBOOW6D.tYzWHuQK', 'teacherem2ail1@email.com', 'Lodz', 'Street', '323333333');

-- insert account_roles
INSERT INTO account_role (account_id, roles_id) VALUES (1,1);
INSERT INTO account_role (account_id, roles_id) VALUES (2,2);
INSERT INTO account_role (account_id, roles_id) VALUES (3,3);
INSERT INTO account_role (account_id, roles_id) VALUES (4,2);
INSERT INTO account_role (account_id, roles_id) VALUES (5,2);

-- inser levels
INSERT INTO account_levels (account_id, level) VALUES (1, 'PRIMARY_SCHOOL');
INSERT INTO account_levels (account_id, level) VALUES (1, 'MIDDLE_SCHOOL');
INSERT INTO account_levels (account_id, level) VALUES (2, 'UNIVERSITY');
INSERT INTO account_levels (account_id, level) VALUES (3, 'HIGH_SCHOOL');
INSERT INTO account_levels (account_id, level) VALUES (4, 'HIGH_SCHOOL');
INSERT INTO account_levels (account_id, level) VALUES (5, 'HIGH_SCHOOL');

-- insert teacher_statistics
INSERT INTO teacher_statistics (number_of_lessons, teacher_id)
    VALUES (10, (SELECT id FROM account WHERE username = 'testteacher'));

-- insert subjects
INSERT INTO account_subjects (account_id, subject) VALUES (1, 'MATHEMATICS');
INSERT INTO account_subjects (account_id, subject) VALUES (1, 'PHYSICS');
INSERT INTO account_subjects (account_id, subject) VALUES (2, 'BIOLOGY');
INSERT INTO account_subjects (account_id, subject) VALUES (2, 'CHEMISTRY');
INSERT INTO account_subjects (account_id, subject) VALUES (3, 'ENGLISH');
INSERT INTO account_subjects (account_id, subject) VALUES (3, 'GEOGRAPHY');
INSERT INTO account_subjects (account_id, subject) VALUES (4, 'ENGLISH');
INSERT INTO account_subjects (account_id, subject) VALUES (5, 'GEOGRAPHY');

-- insert announcements
INSERT INTO announcement (student_name, level, subject, description) VALUES ('teststudent', 'PRIMARY_SCHOOL', 'MATHEMATICS', 'Mam problem z ułamkami :c');
INSERT INTO announcement (student_name, level, subject, description) VALUES ('teststudent', 'PRIMARY_SCHOOL', 'PHYSICS', 'O co chodzi w prawie Ohma1?');
INSERT INTO announcement (student_name, level, subject, description) VALUES ('teststudent', 'PRIMARY_SCHOOL', 'PHYSICS', 'O co chodzi w prawie Ohma2?');
INSERT INTO announcement (student_name, level, subject, description) VALUES ('teststudent', 'PRIMARY_SCHOOL', 'PHYSICS', 'O co chodzi w prawie Ohma3?');
INSERT INTO announcement (student_name, level, subject, description) VALUES ('teststudent', 'PRIMARY_SCHOOL', 'PHYSICS', 'O co chodzi w prawie Ohma4?');
INSERT INTO announcement (student_name, level, subject, description) VALUES ('teststudent', 'PRIMARY_SCHOOL', 'PHYSICS', 'O co chodzi w prawie Ohma5?');
INSERT INTO announcement (student_name, level, subject, description) VALUES ('teststudent', 'PRIMARY_SCHOOL', 'PHYSICS', 'O co chodzi w prawie Ohma6?');
INSERT INTO announcement (student_name, level, subject, description) VALUES ('teststudent', 'PRIMARY_SCHOOL', 'PHYSICS', 'O co chodzi w prawie Ohma7?');
INSERT INTO announcement (student_name, level, subject, description) VALUES ('teststudent', 'PRIMARY_SCHOOL', 'PHYSICS', 'O co chodzi w prawie Ohma8?');
INSERT INTO announcement (student_name, level, subject, description) VALUES ('teststudent', 'PRIMARY_SCHOOL', 'PHYSICS', 'O co chodzi w prawie Ohma9?');
INSERT INTO announcement (student_name, level, subject, description) VALUES ('teststudent', 'PRIMARY_SCHOOL', 'PHYSICS', 'O co chodzi w prawie Ohma0?');
INSERT INTO announcement (student_name, level, subject, description) VALUES ('teststudent', 'PRIMARY_SCHOOL', 'PHYSICS', 'O co chodzi w prawie Ohma11?');
INSERT INTO announcement (student_name, level, subject, description) VALUES ('teststudent', 'PRIMARY_SCHOOL', 'PHYSICS', 'O co chodzi w prawie Ohma12?');
INSERT INTO announcement (student_name, level, subject, description) VALUES ('teststudent', 'PRIMARY_SCHOOL', 'PHYSICS', 'O co chodzi w prawie Ohma13?');

-- insert teachers into announcements
INSERT INTO announcement_teacher (announcement_id, teacher_id) VALUES (1,2);
INSERT INTO announcement_teacher (announcement_id, teacher_id) VALUES (1,3);

-- insert lessons
INSERT INTO lesson (start_time, end_time, student_username, teacher_username, description, subject, lesson_status)
VALUES ('2023-01-17T10:00:00', '2023-01-17T12:00:00', 'teststudent', 'testteacher', 'Ułamki zwykłę, dodawanie i dzielenie ułamków', 'MATHEMATICS', 'ACTIVE');
INSERT INTO lesson (start_time, end_time, student_username, teacher_username, description, subject, lesson_status)
VALUES ('2023-02-17T10:00:00', '2023-02-17T12:00:00', 'teststudent', 'testteacher', 'Ułamki zwykłę, dodawanie i dzielenie u2łamków', 'MATHEMATICS', 'ACTIVE');
INSERT INTO lesson (start_time, end_time, student_username, teacher_username, description, subject, lesson_status)
VALUES ('2025-02-17T10:00:00', '2025-02-17T12:00:00', 'teststudent', 'testteacher', 'Ułamki zwykłę, dodawanie i dzielenie u2łamków', 'MATHEMATICS', 'ACTIVE');

-- insert opinion
INSERT INTO opinion (star_review, opinion_content, opinion_pros, opinion_cons, student_username, teacher_username, creation_date)
VALUES
    ('FIVE', 'Bardzo dobry nauczyciel!', 'Znakomita wiedza', 'Brak', 'teststudent', 'testteacher',  '2024-01-20 12:30:00');
INSERT INTO opinion (star_review, opinion_content, opinion_pros, opinion_cons, student_username, teacher_username, creation_date)
VALUES
    ('FIVE', 'Bardzo niezly nauczyciel!', 'Znakomita wiedza', 'Brak', 'teststudent', 'testteacher',  '2025-01-20 14:30:00');
INSERT INTO opinion (star_review, opinion_content, opinion_pros, opinion_cons, student_username, teacher_username, creation_date)
VALUES
    ('FIVE', 'Bardzo koks nauczyciel!', 'Znakomita wiedza', 'Brak', 'teststudent', 'testteacher',  '2026-01-20 13:30:00');