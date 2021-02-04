-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Хост: 127.0.0.1
-- Время создания: Апр 22 2017 г., 18:28
-- Версия сервера: 10.1.19-MariaDB
-- Версия PHP: 5.6.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `codely`
--

-- --------------------------------------------------------

--
-- Структура таблицы `article`
--

CREATE TABLE `article` (
  `id_article` int(11) NOT NULL,
  `title_article` text NOT NULL,
  `date_article` text NOT NULL,
  `id_user` int(11) NOT NULL,
  `text_article` text NOT NULL,
  `likes_article` int(11) NOT NULL DEFAULT '0',
  `id_answer` int(11) DEFAULT NULL,
  `is_question` int(11) NOT NULL DEFAULT '0',
  `comment_count` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `article`
--

INSERT INTO `article` (`id_article`, `title_article`, `date_article`, `id_user`, `text_article`, `likes_article`, `id_answer`, `is_question`, `comment_count`) VALUES
(106, 'Машинное обучение', '1479052795', 28, 'Теория обучения машин (machine learning, машинное обучение) находится на стыке прикладной статистики, численных методов оптимизации, дискретного анализа, и за последние 50 лет оформилась в самостоятельную математическую дисциплину. Методы машинного обучения составляют основу ещё более молодой дисциплины — интеллектуального анализа данных (data mining).\r\nВ курсе рассматриваются основные задачи обучения по прецедентам: классификация, кластеризация, регрессия, понижение размерности. Изучаются методы их решения, как классические, так и новые, созданные за последние 10–15 лет. Упор делается на глубокое понимание математических основ, взаимосвязей, достоинств и ограничений рассматриваемых методов. Отдельные теоремы приводятся с доказательствами.hh', 4, NULL, 0, 0),
(107, 'Абстракция в ООП', '1479059116', 2, 'Абстракция в объектно-ориентированном программировании — это придание объекту характеристик, которые чётко определяют его концептуальные границы, отличая от всех других объектов. Основная идея состоит в том, чтобы отделить способ использования составных объектов данных от деталей их реализации в виде более простых объектов, подобно тому, как функциональная абстракция разделяет способ использования функции и деталей её реализации в терминах более примитивных функций, таким образом, данные обрабатываются функцией высокого уровня с помощью вызова функций низкого уровня.', 4, NULL, 0, 1),
(112, 'Полярные координаты', '1482002346', 29, 'Полярная система координат - это двухмерная система координат, в которой каждая точка на плоскости однозначно определяется двумя числами, полярным углом и полярным радиусом?', 3, NULL, 1, 1),
(115, 'Звезды', '1489488068', 31, 'Звезда́ — излучающий свет, массивный газовый шар, удерживаемый силами собственной гравитации, в недрах которого происходят реакции термоядерного синтеза. Солнце — типичная звезда спектрального класса G. Образуются из газово-пылевой среды в результате гравитационного сжатия.', 3, NULL, 0, 1),
(118, 'zsdffv', '1492872401', 28, 'asdfasdf', 1, NULL, 1, 2),
(119, 'Игорь', '1492875430', 28, 'ва', 1, NULL, 0, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `blacklist`
--

CREATE TABLE `blacklist` (
  `id_blacklist` int(11) NOT NULL,
  `id_master` int(11) NOT NULL,
  `id_slave` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `blacklist`
--

INSERT INTO `blacklist` (`id_blacklist`, `id_master`, `id_slave`) VALUES
(8, 2, 28);

-- --------------------------------------------------------

--
-- Структура таблицы `comment`
--

CREATE TABLE `comment` (
  `id_comment` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_article` int(11) NOT NULL,
  `text_comment` text NOT NULL,
  `date_comment` text NOT NULL,
  `likes_comment` int(11) NOT NULL DEFAULT '0',
  `is_answer` int(11) NOT NULL DEFAULT '0'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `comment`
--

INSERT INTO `comment` (`id_comment`, `id_user`, `id_article`, `text_comment`, `date_comment`, `likes_comment`, `is_answer`) VALUES
(37, 29, 107, 'Абстракция, инкапсуляция, наследование и полиморфизм — всё это есть в ООП.', '1482002599', 1, 0),
(38, 28, 112, 'Скорее всего, да.', '1482002679', 1, 0),
(40, 28, 115, 'ПРивет!', '1492859870', 1, 0),
(41, 28, 119, 'Чебурек', '1492876042', 0, 0),
(42, 28, 118, 'FFff', '1492878024', 0, 0),
(43, 28, 118, 'sdfsdf', '1492878027', 1, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `favorite_articles`
--

CREATE TABLE `favorite_articles` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_article` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `favorite_articles`
--

INSERT INTO `favorite_articles` (`id`, `id_user`, `id_article`) VALUES
(14, 28, 107),
(9, 28, 115);

-- --------------------------------------------------------

--
-- Структура таблицы `favorite_authors`
--

CREATE TABLE `favorite_authors` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_author` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `favorite_authors`
--

INSERT INTO `favorite_authors` (`id`, `id_user`, `id_author`) VALUES
(12, 28, 2);

-- --------------------------------------------------------

--
-- Структура таблицы `likes_article`
--

CREATE TABLE `likes_article` (
  `id_like` int(11) NOT NULL,
  `id_article` int(11) NOT NULL,
  `id_user` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `likes_article`
--

INSERT INTO `likes_article` (`id_like`, `id_article`, `id_user`) VALUES
(72, 111, 0),
(71, 111, 0),
(70, 111, 0),
(69, 111, 0),
(99, 109, 28),
(90, 111, 28),
(135, 107, 28),
(58, 108, 28),
(119, 106, 28),
(39, 1, 27),
(30, 103, 1),
(73, 110, 0),
(74, 111, 28),
(75, 111, 28),
(76, 111, 28),
(77, 111, 28),
(78, 111, 28),
(79, 111, 28),
(80, 111, 28),
(81, 111, 28),
(82, 111, 28),
(83, 111, 28),
(84, 111, 28),
(85, 111, 28),
(86, 111, 28),
(87, 111, 28),
(91, 111, 28),
(93, 110, 28),
(94, 110, 28),
(95, 110, 28),
(96, 110, 28),
(97, 110, 28),
(102, 107, 29),
(103, 106, 29),
(133, 112, 28),
(109, 112, 0),
(110, 112, 0),
(111, 106, 0),
(112, 106, 0),
(113, 107, 0),
(114, 107, 0),
(120, 115, 0),
(121, 115, 0),
(122, 115, 0),
(149, 118, 28),
(150, 119, 28);

-- --------------------------------------------------------

--
-- Структура таблицы `likes_comment`
--

CREATE TABLE `likes_comment` (
  `id_like_com` int(11) NOT NULL,
  `id_comment` int(11) NOT NULL,
  `id_user` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `likes_comment`
--

INSERT INTO `likes_comment` (`id_like_com`, `id_comment`, `id_user`) VALUES
(5, 32, 1),
(7, 37, 29),
(8, 38, 28),
(14, 40, 28),
(18, 43, 28);

-- --------------------------------------------------------

--
-- Структура таблицы `same`
--

CREATE TABLE `same` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_question` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `same`
--

INSERT INTO `same` (`id`, `id_user`, `id_question`) VALUES
(3, 28, 118);

-- --------------------------------------------------------

--
-- Структура таблицы `user`
--

CREATE TABLE `user` (
  `id_user` int(11) NOT NULL,
  `surname_user` text NOT NULL,
  `name_user` text NOT NULL,
  `login_user` text NOT NULL,
  `birthdate_user` date DEFAULT NULL,
  `work_user` text NOT NULL,
  `study_user` text NOT NULL,
  `phone_user` text NOT NULL,
  `about_user` text NOT NULL,
  `photo_user` text NOT NULL,
  `password_user` text NOT NULL,
  `rate_user` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `user`
--

INSERT INTO `user` (`id_user`, `surname_user`, `name_user`, `login_user`, `birthdate_user`, `work_user`, `study_user`, `phone_user`, `about_user`, `photo_user`, `password_user`, `rate_user`) VALUES
(2, 'Кузнецов', 'Игорь', 'igorkuzn@mail.ru', '2016-10-06', '', 'Магистратура ФИТИПа', '7873845835738', 'Нейронные сети. Даже если вы этого не хотите.', 'https://vk.cc/5Knnj0', 'neiroboy', 32),
(30, 'Великая', 'Сеня', 'piks@mail.ru', NULL, '', '', '', '', '', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 0),
(31, 'vienna', 'adele', 'lizafloyd2@gmail.com', NULL, '', '', '', '', '', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', -1),
(28, 'Фалько', 'Лиза', 'liza199797@mail.ru', '1997-03-23', 'Образовательные технологии', 'ФСПО ИТМО', '', 'Студентка 4 курса.\r\nПрограммирую своё будущее.', 'http://licensingrussia.ru/wps/wp-content/uploads/2011/06/tumblr_l4lo29uc5v1qzyp47o1_500-275x300.png', '10e2024373b456b407afcf79e3239bdc34f54f174f40465540aee6937070ea40', 126),
(29, 'Бродский', 'Иосиф', 'io@mail.ru', '1966-07-30', 'Консерватория', 'Университет имени Герцена', '', 'Поэт. Лауреат Нобелевской премии.', 'https://caricatura.ru/shiz/rom/pic/u1395.jpg', 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', 0);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `article`
--
ALTER TABLE `article`
  ADD PRIMARY KEY (`id_article`);

--
-- Индексы таблицы `blacklist`
--
ALTER TABLE `blacklist`
  ADD PRIMARY KEY (`id_blacklist`);

--
-- Индексы таблицы `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id_comment`);

--
-- Индексы таблицы `favorite_articles`
--
ALTER TABLE `favorite_articles`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `favorite_authors`
--
ALTER TABLE `favorite_authors`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `likes_article`
--
ALTER TABLE `likes_article`
  ADD PRIMARY KEY (`id_like`);

--
-- Индексы таблицы `likes_comment`
--
ALTER TABLE `likes_comment`
  ADD PRIMARY KEY (`id_like_com`);

--
-- Индексы таблицы `same`
--
ALTER TABLE `same`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `article`
--
ALTER TABLE `article`
  MODIFY `id_article` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=120;
--
-- AUTO_INCREMENT для таблицы `blacklist`
--
ALTER TABLE `blacklist`
  MODIFY `id_blacklist` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT для таблицы `comment`
--
ALTER TABLE `comment`
  MODIFY `id_comment` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;
--
-- AUTO_INCREMENT для таблицы `favorite_articles`
--
ALTER TABLE `favorite_articles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT для таблицы `favorite_authors`
--
ALTER TABLE `favorite_authors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT для таблицы `likes_article`
--
ALTER TABLE `likes_article`
  MODIFY `id_like` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=151;
--
-- AUTO_INCREMENT для таблицы `likes_comment`
--
ALTER TABLE `likes_comment`
  MODIFY `id_like_com` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
--
-- AUTO_INCREMENT для таблицы `same`
--
ALTER TABLE `same`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT для таблицы `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
