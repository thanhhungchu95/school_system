-- Change this if you have a different database name
USE `schooldb`;

CREATE TABLE IF NOT EXISTS `students` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `birthday` date DEFAULT NULL,
  `isSuspend` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `teachers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS `student_teacher_relation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_id` int DEFAULT NULL,
  `teacher_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_f66fb757c787b22fdec93af0e0f` (`student_id`),
  KEY `FK_f21780c847754f2bb2ca2b9fb82` (`teacher_id`),
  CONSTRAINT `FK_f21780c847754f2bb2ca2b9fb82` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_f66fb757c787b22fdec93af0e0f` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `students`(`email`, `name`, `birthday`) VALUES (`alice@example.com`, `Alice Johnson`, '1990-01-01');
INSERT INTO `students`(`email`, `name`, `birthday`) VALUES (`bob@example.com`, `Bob Smith`, '1990-02-01');
INSERT INTO `students`(`email`, `name`, `birthday`) VALUES (`charlie@example.com`, `Charlie Brown`, '1990-03-01');
INSERT INTO `students`(`email`, `name`, `birthday`) VALUES (`diana@example.com`, `Diana Prince`, '1990-04-01');
INSERT INTO `students`(`email`, `name`, `birthday`) VALUES (`ethan@example.com`, `Ethan Hunt`, '1990-05-01');

INSERT INTO `teachers`(`email`, `name`) VALUES (`anderson@example.com`, `Mr. Anderson`);
INSERT INTO `teachers`(`email`, `name`) VALUES (`clark@example.com`, `Mr. Clark`);
INSERT INTO `teachers`(`email`, `name`) VALUES (`lee@example.com`, `Dr. Lee`);
INSERT INTO `teachers`(`email`, `name`) VALUES (`taylor@example.com`, `Mrs. Taylor`);
INSERT INTO `teachers`(`email`, `name`) VALUES (`brown@example.com`, `Prof. Brown`);