-- --------------------------------------------------------
-- Хост:                         127.0.0.1
-- Версия сервера:               11.1.0-MariaDB - mariadb.org binary distribution
-- Операционная система:         Win64
-- HeidiSQL Версия:              12.3.0.6589
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Дамп структуры базы данных enote_base
CREATE DATABASE IF NOT EXISTS `enote_base` /*!40100 DEFAULT CHARACTER SET utf16 COLLATE utf16_bin */;
USE `enote_base`;

-- Дамп структуры для процедура enote_base.add_kanban_item
DELIMITER //
CREATE PROCEDURE `add_kanban_item`(
	IN `item_name` VARCHAR(150),
	IN `project_id` INT
)
BEGIN
    INSERT INTO project_item (name,  project_id, date_create)
    VALUES (item_name, project_id, NOW());
END//
DELIMITER ;

-- Дамп структуры для процедура enote_base.add_member
DELIMITER //
CREATE PROCEDURE `add_member`(
	IN `p_user_id` INT,
	IN `p_team_id` INT
)
BEGIN
	INSERT INTO user_team (user_id, team_id)
	VALUES (p_user_id, p_team_id);
END//
DELIMITER ;

-- Дамп структуры для процедура enote_base.add_member_to_email
DELIMITER //
CREATE PROCEDURE `add_member_to_email`(IN userEmail VARCHAR(60), IN idTeam INT)
BEGIN
  DECLARE userId INT;

  -- Получить идентификатор пользователя по email
  SELECT id INTO userId FROM `user` WHERE email = userEmail;

  -- Добавить запись в таблицу user_team
  INSERT INTO user_team (idUser, idTeam) VALUES (userId, idTeam);

END//
DELIMITER ;

-- Дамп структуры для процедура enote_base.add_note
DELIMITER //
CREATE PROCEDURE `add_note`(
    IN note_name VARCHAR(50),
    IN note_description MEDIUMTEXT,
    IN note_user_id INT(11)
)
BEGIN
    INSERT INTO note (name, description, date_create, user_id)
    VALUES (note_name, note_description, NOW(), note_user_id);
END//
DELIMITER ;

-- Дамп структуры для процедура enote_base.add_project
DELIMITER //
CREATE PROCEDURE `add_project`(
    IN projectName VARCHAR(60),
    IN teamId INT
)
BEGIN
    INSERT INTO project (name, team_id, date_create)
    VALUES (projectName, teamId, NOW());
END//
DELIMITER ;

-- Дамп структуры для процедура enote_base.add_project_task
DELIMITER //
CREATE PROCEDURE `add_project_task`(
	IN `task_name` VARCHAR(150),
	IN `project_item_id` INT,
	IN `user_id` INT
)
BEGIN
    INSERT INTO project_task (name, project_item_id, user_id, date_create)
    VALUES (task_name, project_item_id, user_id, NOW());
END//
DELIMITER ;

-- Дамп структуры для процедура enote_base.add_subtask
DELIMITER //
CREATE PROCEDURE `add_subtask`(
	IN `titleIn` VARCHAR(50),
	IN `statusIn` INT,
	IN `task_idIn` INT
)
    COMMENT 'Добавление подзадачи'
BEGIN
	INSERT INTO subtask (title, status, task_id) 
	VALUES (titleIn, statusIn, task_idIn);

END//
DELIMITER ;

-- Дамп структуры для процедура enote_base.add_task
DELIMITER //
CREATE PROCEDURE `add_task`(
	IN `task_name` VARCHAR(50),
	IN `task_user_id` INT,
	IN `task_end_time` DATETIME
)
BEGIN
  INSERT INTO task (name, id_user, end_time, create_time)
  VALUES (task_name, task_user_id, task_end_time, NOW());
END//
DELIMITER ;

-- Дамп структуры для процедура enote_base.add_team
DELIMITER //
CREATE PROCEDURE `add_team`(
    IN teamName VARCHAR(60),
    IN createUser INT
)
BEGIN
    DECLARE newTeamId INT;

    -- Добавление записи в таблицу team
    INSERT INTO team (name, date_create, user_create)
    VALUES (teamName, NOW(), createUser);

    -- Получение идентификатора только что созданной команды
    SET newTeamId = LAST_INSERT_ID();

    -- Добавление записи в таблицу user_team
    INSERT INTO user_team (user_id, team_id)
    VALUES (createUser, newTeamId);

END//
DELIMITER ;

-- Дамп структуры для процедура enote_base.add_user_to_team
DELIMITER //
CREATE PROCEDURE `add_user_to_team`(IN userId INT, IN teamId INT)
BEGIN
    INSERT INTO user_team (user_id, team_id)
    VALUES (userId, teamId);
END//
DELIMITER ;

-- Дамп структуры для процедура enote_base.create_team
DELIMITER //
CREATE PROCEDURE `create_team`(IN teamName VARCHAR(60), IN createUser INT)
BEGIN
    INSERT INTO team (name, date_create, user_create)
    VALUES (teamName, NOW(), createUser);
END//
DELIMITER ;

-- Дамп структуры для процедура enote_base.delete_member
DELIMITER //
CREATE PROCEDURE `delete_member`(IN p_teamId INT, IN p_userId INT)
BEGIN
    DELETE FROM USER_TEAM
    WHERE user_team.user_id = p_userId AND user_team.team_id = p_teamId;
END//
DELIMITER ;

-- Дамп структуры для процедура enote_base.delete_note
DELIMITER //
CREATE PROCEDURE `delete_note`(
	IN `noteId` INT
)
BEGIN
    DELETE FROM note WHERE id = noteId;
END//
DELIMITER ;

-- Дамп структуры для процедура enote_base.delete_project_item
DELIMITER //
CREATE PROCEDURE `delete_project_item`(IN itemId INT)
BEGIN
    DELETE FROM project_item WHERE id = itemId;
END//
DELIMITER ;

-- Дамп структуры для процедура enote_base.delete_project_task
DELIMITER //
CREATE PROCEDURE `delete_project_task`(
    IN task_id INT
)
BEGIN
    DELETE FROM project_task
    WHERE id = task_id;
END//
DELIMITER ;

-- Дамп структуры для процедура enote_base.delete_subtask
DELIMITER //
CREATE PROCEDURE `delete_subtask`(
	IN `p_id` INT
)
BEGIN
	DELETE FROM subtask WHERE id = p_id;
END//
DELIMITER ;

-- Дамп структуры для процедура enote_base.delete_task
DELIMITER //
CREATE PROCEDURE `delete_task`(
  IN task_id INT
)
BEGIN
  DELETE FROM task
  WHERE id = task_id;
END//
DELIMITER ;

-- Дамп структуры для процедура enote_base.GetProjectDetails
DELIMITER //
CREATE PROCEDURE `GetProjectDetails`(IN projectId INT)
BEGIN
    SELECT *
    FROM project
    WHERE id = projectId;
END//
DELIMITER ;

-- Дамп структуры для процедура enote_base.get_all_user_note
DELIMITER //
CREATE PROCEDURE `get_all_user_note`(
	IN `id_user` INT
)
    COMMENT 'Выводит все замекти пользователя по id'
BEGIN
	SELECT note.* FROM note 
	WHERE note.user_id = id_user;
END//
DELIMITER ;

-- Дамп структуры для процедура enote_base.get_all_user_task
DELIMITER //
CREATE PROCEDURE `get_all_user_task`(
	IN `userId` INT
)
    COMMENT 'Возвращает все заметки пользователя'
BEGIN
  SELECT id, name
  FROM task
  WHERE id_user = userId;
END//
DELIMITER ;

-- Дамп структуры для процедура enote_base.get_item_kanban
DELIMITER //
CREATE PROCEDURE `get_item_kanban`(
	IN `p_project_id` INT
)
BEGIN
    SELECT *
    FROM project_item
    WHERE project_id = p_project_id;
END//
DELIMITER ;

-- Дамп структуры для процедура enote_base.get_members_team
DELIMITER //
CREATE PROCEDURE `get_members_team`(IN teamId INT, IN userId INT)
BEGIN
    SELECT u.*
    FROM user u
    INNER JOIN user_team ut ON u.id = ut.user_id
    WHERE ut.team_id = teamId
    AND u.id != userId;
END//
DELIMITER ;

-- Дамп структуры для процедура enote_base.get_project
DELIMITER //
CREATE PROCEDURE `get_project`(IN projectId INT)
BEGIN
    SELECT *
    FROM project
    WHERE id = projectId;
END//
DELIMITER ;

-- Дамп структуры для процедура enote_base.get_project_task
DELIMITER //
CREATE PROCEDURE `get_project_task`(
	IN `task_id` INT
)
BEGIN
    SELECT *
    FROM project_task
    WHERE project_item_id = task_id;
END//
DELIMITER ;

-- Дамп структуры для процедура enote_base.get_subtask_for_task
DELIMITER //
CREATE PROCEDURE `get_subtask_for_task`(
	IN `task_id_user` INT
)
    COMMENT 'Вывод всех подзадач'
BEGIN
	SELECT subtask.* FROM subtask
	WHERE subtask.task_id = task_id_user;
END//
DELIMITER ;

-- Дамп структуры для процедура enote_base.get_task
DELIMITER //
CREATE PROCEDURE `get_task`(
	IN `task_id` INT
)
BEGIN
	SELECT * FROM TASK
	WHERE id = task_id;
END//
DELIMITER ;

-- Дамп структуры для процедура enote_base.get_team
DELIMITER //
CREATE PROCEDURE `get_team`(IN teamId INT)
BEGIN
    SELECT *
    FROM team
    WHERE id = teamId;
END//
DELIMITER ;

-- Дамп структуры для процедура enote_base.get_users_team
DELIMITER //
CREATE PROCEDURE `get_users_team`(
	IN `userId` INT
)
BEGIN
    SELECT t.*
    FROM team t
    INNER JOIN user_team ut ON t.id = ut.team_id
    WHERE ut.user_id = userId;
END//
DELIMITER ;

-- Дамп структуры для процедура enote_base.get_user_by_email
DELIMITER //
CREATE PROCEDURE `get_user_by_email`(IN userEmail VARCHAR(255))
BEGIN
  SELECT id FROM `user` WHERE email = userEmail;
END//
DELIMITER ;

-- Дамп структуры для процедура enote_base.get_user_project
DELIMITER //
CREATE PROCEDURE `get_user_project`(
	IN `userId` INT
)
BEGIN
    SELECT DISTINCT p.*
    FROM project p
    INNER JOIN team t ON p.team_id = t.id
    INNER JOIN user_team ut ON t.id = ut.team_id
    WHERE ut.user_id = userId;
END//
DELIMITER ;

-- Дамп структуры для таблица enote_base.note
CREATE TABLE IF NOT EXISTS `note` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `description` mediumtext DEFAULT NULL,
  `date_create` datetime NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_NOTE_USER` (`user_id`),
  CONSTRAINT `FK_NOTE_USER` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=88 DEFAULT CHARSET=utf16 COLLATE=utf16_bin COMMENT='Заметки пользователя ';

-- Дамп данных таблицы enote_base.note: ~20 rows (приблизительно)
INSERT INTO `note` (`id`, `name`, `description`, `date_create`, `user_id`) VALUES
	(49, 'Пустая заметка', 'gdfgdfgdfgdfgdfgdfgdfg', '2023-06-06 18:27:11', 8),
	(50, 'Пустая заметка', '', '2023-06-06 18:28:07', 8),
	(51, 'Пустая заметка', '', '2023-06-06 18:28:12', 8),
	(54, 'Пустая заметка', '', '2023-06-06 18:32:24', 9),
	(55, 'Пустая заметка', '', '2023-06-06 18:32:25', 9),
	(56, 'Пустая заметка', '', '2023-06-06 18:32:26', 9),
	(57, 'Пустая заметка', '', '2023-06-06 20:45:54', 9),
	(58, 'Пустая заметка', '', '2023-06-06 21:07:31', 8),
	(59, 'Пустая заметка', '', '2023-06-06 21:07:31', 8),
	(60, 'Пустая заметка', '', '2023-06-06 21:07:32', 8),
	(61, 'Пустая заметка', '', '2023-06-06 21:07:32', 8),
	(62, 'Пустая заметка', '', '2023-06-06 21:07:33', 8),
	(63, 'Пустая заметка', '', '2023-06-06 21:07:33', 8),
	(64, 'Пустая заметка', '', '2023-06-06 21:07:34', 8),
	(65, 'Пустая заметка', '', '2023-06-06 21:07:35', 8),
	(66, 'Пустая заметка', '', '2023-06-06 21:08:58', 8),
	(67, 'Пустая заметка', '', '2023-06-06 21:08:58', 8),
	(86, 'ываав sdf дывлоа длыоадл выоад', '000000000000000000000000000000000000o0o21e21ee2e2', '2023-06-09 01:20:03', 17),
	(87, 'Пустая заметка', '', '2023-06-10 00:05:30', 17);

-- Дамп структуры для таблица enote_base.project
CREATE TABLE IF NOT EXISTS `project` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL,
  `date_create` date NOT NULL,
  `team_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_TEAM_PROJECT` (`team_id`),
  CONSTRAINT `FK_TEAM_PROJECT` FOREIGN KEY (`team_id`) REFERENCES `team` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf16 COLLATE=utf16_bin;

-- Дамп данных таблицы enote_base.project: ~2 rows (приблизительно)
INSERT INTO `project` (`id`, `name`, `date_create`, `team_id`) VALUES
	(5, 'Проект без названия', '2023-06-08', 38),
	(6, 'Проект без названия', '2023-06-08', 39),
	(7, 'fdsfsdkfjls  fkjdskfjsdlkfj slkf', '2023-06-09', 51);

-- Дамп структуры для таблица enote_base.project_item
CREATE TABLE IF NOT EXISTS `project_item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(70) NOT NULL,
  `project_id` int(11) NOT NULL DEFAULT 0,
  `date_create` datetime NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_PROJECT_ITEM_USER` (`user_id`),
  KEY `FK_PROJECT_ITEM_PROJECT` (`project_id`),
  CONSTRAINT `FK_PROJECT_ITEM_PROJECT` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_PROJECT_ITEM_USER` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf16 COLLATE=utf16_bin;

-- Дамп данных таблицы enote_base.project_item: ~7 rows (приблизительно)
INSERT INTO `project_item` (`id`, `name`, `project_id`, `date_create`, `user_id`) VALUES
	(33, 'Что-то надо сделать', 7, '2023-06-09 15:21:52', NULL),
	(35, 'Без названия', 7, '2023-06-09 15:22:52', NULL),
	(36, 'Без названия', 7, '2023-06-09 15:23:31', NULL),
	(37, 'Без названия', 7, '2023-06-09 15:23:31', NULL),
	(38, 'Без названия', 7, '2023-06-09 15:23:31', NULL),
	(39, 'Без названия', 7, '2023-06-09 15:23:32', NULL),
	(40, 'Без названия', 7, '2023-06-09 15:23:32', NULL);

-- Дамп структуры для таблица enote_base.project_task
CREATE TABLE IF NOT EXISTS `project_task` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `date_create` datetime DEFAULT NULL,
  `project_item_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_PROJECT_TASK_PROJECT_ITEM` (`project_item_id`),
  KEY `FK_PROJECT_TASK_USER` (`user_id`),
  CONSTRAINT `FK_PROJECT_TASK_PROJECT_ITEM` FOREIGN KEY (`project_item_id`) REFERENCES `project_item` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_PROJECT_TASK_USER` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=utf16 COLLATE=utf16_bin;

-- Дамп данных таблицы enote_base.project_task: ~3 rows (приблизительно)
INSERT INTO `project_task` (`id`, `name`, `date_create`, `project_item_id`, `user_id`) VALUES
	(83, 'аывава', '2023-06-10 00:05:58', 33, 17),
	(84, 'ававыаыв', '2023-06-10 00:06:27', 33, 17),
	(85, 'аываывавы', '2023-06-10 00:06:29', 33, 17),
	(86, '', '2023-06-10 01:00:58', 35, 17);

-- Дамп структуры для процедура enote_base.reg_user
DELIMITER //
CREATE PROCEDURE `reg_user`(
	IN `p_name` VARCHAR(255),
	IN `p_surname` VARCHAR(255),
	IN `p_password` VARCHAR(255),
	IN `p_email` VARCHAR(255),
	OUT `p_status` INT
)
BEGIN
  DECLARE email_count INT;

  -- Проверяем наличие существующего e-mail в таблице
  SELECT COUNT(*) INTO email_count
  FROM user
  WHERE email = p_email;

  IF email_count > 0 THEN
    SET p_status = 400; -- e-mail уже существует
  ELSE
    -- Создаем новую учетную запись
    INSERT INTO user (name, surname, password, email)
    VALUES (p_name, p_surname, p_password, p_email);
    
    SET p_status = 200; -- Учетная запись создана успешно
  END IF;
END//
DELIMITER ;

-- Дамп структуры для таблица enote_base.subtask
CREATE TABLE IF NOT EXISTS `subtask` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(250) DEFAULT 'Пусто',
  `status` int(11) DEFAULT 0,
  `task_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_SUBTASK_TASK` (`task_id`),
  CONSTRAINT `FK_SUBTASK_TASK` FOREIGN KEY (`task_id`) REFERENCES `task` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=97 DEFAULT CHARSET=utf16 COLLATE=utf16_bin COMMENT='Подзадача';

-- Дамп данных таблицы enote_base.subtask: ~2 rows (приблизительно)
INSERT INTO `subtask` (`id`, `title`, `status`, `task_id`) VALUES
	(95, 'Новая задача', 0, 44),
	(96, 'Новая задача', 0, 44);

-- Дамп структуры для таблица enote_base.task
CREATE TABLE IF NOT EXISTS `task` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT 'Задача без названия',
  `id_user` int(11) NOT NULL,
  `create_time` datetime DEFAULT NULL,
  `end_time` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_TASK_USER` (`id_user`),
  CONSTRAINT `FK_TASK_USER` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf16 COLLATE=utf16_bin COMMENT='Задача';

-- Дамп данных таблицы enote_base.task: ~20 rows (приблизительно)
INSERT INTO `task` (`id`, `name`, `id_user`, `create_time`, `end_time`) VALUES
	(17, 'Задача без названия', 8, '2023-06-06 18:28:15', '2023-06-06 00:00:00'),
	(18, 'Задача без названия', 9, '2023-06-06 20:47:06', '2023-06-06 00:00:00'),
	(19, 'Задача без названия', 9, '2023-06-06 20:53:11', '2023-06-06 00:00:00'),
	(20, 'Задача без названия', 9, '2023-06-06 20:53:12', '2023-06-06 00:00:00'),
	(21, 'Задача без названия', 9, '2023-06-06 20:53:12', '2023-06-06 00:00:00'),
	(22, 'Задача без названия', 9, '2023-06-06 20:53:13', '2023-06-06 00:00:00'),
	(23, 'Задача без названия', 9, '2023-06-06 20:53:14', '2023-06-06 00:00:00'),
	(24, 'Задача без названия', 9, '2023-06-06 20:53:14', '2023-06-06 00:00:00'),
	(25, 'Задача без названия', 9, '2023-06-06 20:53:15', '2023-06-06 00:00:00'),
	(26, 'Задача без названия', 9, '2023-06-06 20:53:16', '2023-06-06 00:00:00'),
	(27, 'Задача без названия', 9, '2023-06-06 20:53:16', '2023-06-06 00:00:00'),
	(28, 'Задача без названия', 9, '2023-06-06 20:53:17', '2023-06-06 00:00:00'),
	(29, 'Задача без названия', 9, '2023-06-06 20:53:18', '2023-06-06 00:00:00'),
	(30, 'Задача без названия', 9, '2023-06-06 20:53:41', '2023-06-06 00:00:00'),
	(31, 'Задача без названия', 9, '2023-06-06 20:53:42', '2023-06-06 00:00:00'),
	(32, 'Задача без названия', 9, '2023-06-06 20:53:56', '2023-06-06 00:00:00'),
	(33, 'Задача без названия', 8, '2023-06-06 21:07:42', '2023-06-06 00:00:00'),
	(34, 'Задача без названия', 8, '2023-06-06 21:07:43', '2023-06-06 00:00:00'),
	(44, 'ffffffffffffffffffffffffffffffff', 17, '2023-06-09 01:18:27', '2023-04-17 00:00:00'),
	(45, 'Задача без названия', 17, '2023-06-10 01:00:40', '2023-06-09 00:00:00');

-- Дамп структуры для таблица enote_base.team
CREATE TABLE IF NOT EXISTS `team` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL,
  `date_create` date NOT NULL,
  `user_create` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_USER_CREATE` (`user_create`),
  CONSTRAINT `FK_USER_CREATE` FOREIGN KEY (`user_create`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf16 COLLATE=utf16_bin;

-- Дамп данных таблицы enote_base.team: ~43 rows (приблизительно)
INSERT INTO `team` (`id`, `name`, `date_create`, `user_create`) VALUES
	(3, 'Команда без названия', '2023-06-06', 8),
	(4, 'Команда без названия', '2023-06-06', 8),
	(5, 'аываывыва', '2023-06-06', 9),
	(6, 'Команда без названия', '2023-06-06', 9),
	(7, 'fdsffffffffffffffff fsdfdsfdsfds', '2023-06-06', 9),
	(8, 'Команда без названия', '2023-06-06', 9),
	(9, 'Команда без названия', '2023-06-06', 9),
	(10, 'Команда без названия', '2023-06-06', 9),
	(11, 'Команда без названия', '2023-06-06', 8),
	(12, 'Команда без названия', '2023-06-06', 8),
	(13, 'Команда без названия', '2023-06-06', 8),
	(14, 'Команда без названия', '2023-06-06', 8),
	(15, 'Команда без названия', '2023-06-06', 8),
	(16, 'Команда без названия', '2023-06-06', 8),
	(17, 'Команда без названия', '2023-06-06', 8),
	(18, 'Команда без названия', '2023-06-06', 8),
	(19, 'Команда без названия', '2023-06-06', 8),
	(20, 'Команда без названия', '2023-06-06', 8),
	(21, 'Команда без названия', '2023-06-06', 8),
	(22, 'Команда без названия', '2023-06-06', 8),
	(23, 'Команда без названия', '2023-06-06', 8),
	(24, 'Команда без названия', '2023-06-06', 8),
	(25, 'Команда без названия', '2023-06-06', 8),
	(26, 'Команда без названия', '2023-06-06', 8),
	(27, 'Команда без названия', '2023-06-06', 8),
	(30, 'Команда без названия', '2023-06-06', 9),
	(31, 'Команда без названия', '2023-06-06', 9),
	(32, 'Команда без названия', '2023-06-06', 9),
	(33, 'Команда без названия', '2023-06-06', 9),
	(34, 'Команда без названия', '2023-06-06', 9),
	(38, 'Тестовая команда', '2023-06-08', 17),
	(39, 'Команда без названия', '2023-06-08', 17),
	(40, 'Команда без названия', '2023-06-08', 17),
	(41, 'Команда без названия', '2023-06-08', 17),
	(42, 'Команда без названия', '2023-06-08', 17),
	(43, 'Команда без названия', '2023-06-08', 17),
	(44, 'Команда без названия', '2023-06-08', 17),
	(45, 'Команда без названия', '2023-06-08', 17),
	(46, 'Команда без названия', '2023-06-08', 17),
	(47, 'Команда без названия', '2023-06-08', 17),
	(48, 'Команда без названия', '2023-06-08', 17),
	(49, 'Команда без названия', '2023-06-08', 17),
	(50, 'Команда без названия', '2023-06-08', 17),
	(51, 'dsffds sdsffffff fsfsd', '2023-06-09', 17);

-- Дамп структуры для процедура enote_base.update_note
DELIMITER //
CREATE PROCEDURE `update_note`(
  IN note_id INT,
  IN note_name VARCHAR(50),
  IN note_description MEDIUMTEXT
)
BEGIN
  UPDATE note
  SET name = note_name,
      description = note_description
  WHERE id = note_id;
END//
DELIMITER ;

-- Дамп структуры для процедура enote_base.update_project
DELIMITER //
CREATE PROCEDURE `update_project`(
    IN project_id INT,
    IN new_name VARCHAR(60)
)
BEGIN
    UPDATE project
    SET name = new_name
    WHERE id = project_id;
END//
DELIMITER ;

-- Дамп структуры для процедура enote_base.update_project_item
DELIMITER //
CREATE PROCEDURE `update_project_item`(
    IN item_id INT,
    IN new_name VARCHAR(60)
)
BEGIN
    UPDATE project_item
    SET name = new_name
    WHERE id = item_id;
END//
DELIMITER ;

-- Дамп структуры для процедура enote_base.update_project_task
DELIMITER //
CREATE PROCEDURE `update_project_task`(
    IN task_id INT,
    IN new_name VARCHAR(150)
)
BEGIN
    UPDATE project_task
    SET name = new_name
    WHERE id = task_id;
END//
DELIMITER ;

-- Дамп структуры для процедура enote_base.update_subtask
DELIMITER //
CREATE PROCEDURE `update_subtask`(
	IN `p_id` INT,
	IN `p_title` VARCHAR(250),
	IN `p_status` INT
)
BEGIN
    UPDATE subtask
    SET title = p_title,
        status = p_status
    WHERE id = p_id;
END//
DELIMITER ;

-- Дамп структуры для процедура enote_base.update_task
DELIMITER //
CREATE PROCEDURE `update_task`(
  IN task_id INT,
  IN task_name VARCHAR(50),
  IN task_end_time DATETIME
)
BEGIN
  UPDATE task
  SET name = task_name,
      end_time = task_end_time
  WHERE id = task_id;
END//
DELIMITER ;

-- Дамп структуры для процедура enote_base.update_team
DELIMITER //
CREATE PROCEDURE `update_team`(IN teamId INT, IN teamName VARCHAR(60))
BEGIN
    UPDATE team
    SET name = teamName
    WHERE id = teamId;
END//
DELIMITER ;

-- Дамп структуры для таблица enote_base.user
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` tinytext NOT NULL,
  `surname` tinytext NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` tinytext DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`) USING HASH
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf16 COLLATE=utf16_bin;

-- Дамп данных таблицы enote_base.user: ~14 rows (приблизительно)
INSERT INTO `user` (`id`, `name`, `surname`, `email`, `password`) VALUES
	(3, 'Test', 'Test', '1234', '1234'),
	(4, 'Post', 'Post', 'yandex@ya.ru', '1234'),
	(5, '123', '123', 'sdf@yandex.ru', '123'),
	(6, 'Sergay', 'Vavilov', 's1df@yandex.ru', '1234'),
	(7, 'Sir Giorgy', 'Misteer', 'setowner@yandex.ru', '12345'),
	(8, 'Testov', 'Test', 'adm2@mail.ru', '1234'),
	(9, '1234', 'Gusev', 'adm3@ya.ru', '1234'),
	(10, 'Anatoly', 'Negusev', 'testtest@mail.ru', '1234'),
	(11, '1234', '1234', 'test2@mail.ru', '123'),
	(12, 'neznat@yandex.ru', 'neznat@yandex.ru', 'neznat@yandex.ru', '123'),
	(13, '%u0421%u0435%u0440%u0433%u0435%u0439', '%u0418%u0432%u0430%u043D%u043E%u0432', 'tog@test.ru', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92'),
	(14, 'Ior', 'Sur', 'test@mail.ru', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92'),
	(15, '%u041D%u0435%u0430%u043D%u0430%u0442%u043E%u043B%u0438%u0439', '%u041D%u0435%u0433%u0443%u0441%u0435%u0432', 'rus@mail.ru', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92'),
	(16, 'Тест', 'Иванов', 'ref@mail.ru', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92'),
	(17, 'Анатолий', 'Гусев', 'adm@ya.ru', '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9');

-- Дамп структуры для таблица enote_base.user_team
CREATE TABLE IF NOT EXISTS `user_team` (
  `user_id` int(11) DEFAULT NULL,
  `team_id` int(11) DEFAULT NULL,
  KEY `FK_USERTEAM_USER` (`user_id`),
  KEY `FK_USERTEAM_TEAM` (`team_id`),
  CONSTRAINT `FK_USERTEAM_TEAM` FOREIGN KEY (`team_id`) REFERENCES `team` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_USERTEAM_USER` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_bin;

-- Дамп данных таблицы enote_base.user_team: ~32 rows (приблизительно)
INSERT INTO `user_team` (`user_id`, `team_id`) VALUES
	(8, 3),
	(8, 4),
	(9, 5),
	(9, 6),
	(9, 7),
	(9, 8),
	(9, 9),
	(9, 10),
	(8, 11),
	(8, 12),
	(8, 13),
	(8, 14),
	(8, 15),
	(8, 16),
	(8, 17),
	(8, 18),
	(8, 19),
	(8, 20),
	(8, 21),
	(8, 22),
	(8, 23),
	(8, 24),
	(8, 25),
	(8, 26),
	(8, 27),
	(9, 30),
	(9, 31),
	(9, 32),
	(9, 33),
	(9, 34),
	(14, 38),
	(14, 40),
	(17, 51);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
