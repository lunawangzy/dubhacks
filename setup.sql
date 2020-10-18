CREATE TABLE courses (
  course_num  VARCHAR(30) PRIMARY KEY UNIQUE NOT NULL,
  department VARCHAR(30) NOT NULL
);

INSERT INTO courses (course_num, department)
VALUES ('CSE154', 'CSE'),
       ('MATH126', 'MATH'),
       ('CHEM237', 'CHEM'),
       ('PSYCH210', 'PSYCH'),
       ('PHIL101', 'PHIL');

CREATE TABLE comments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  course_num VARCHAR(30) NOT NULL REFERENCES courses,
  reviews VARCHAR(500) NOT NULL,
  review_time DATETIME DEFAULT NOW()
);

INSERT INTO comments (course_num, reviews)
VALUES ('MATH126', 'The last couse in the calc series'),
       ('MATH126', 'Lots of calculation...'),
       ('CSE154', 'Useful class'),
       ('CHEM237', 'Intro to ochem');
