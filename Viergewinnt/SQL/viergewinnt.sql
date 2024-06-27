-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 27. Jun 2024 um 19:54
-- Server-Version: 10.4.32-MariaDB
-- PHP-Version: 8.2.12

CREATE DATABASE IF NOT EXISTS viergewinnt;
USE viergewinnt;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `viergewinnt`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `activgame`
--

CREATE TABLE `activgame` (
  `ID` int(11) NOT NULL,
  `PlayerFK` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `activgame`
--

INSERT INTO `activgame` (`ID`, `PlayerFK`) VALUES
(0, NULL),
(1, NULL),
(2, NULL),
(3, NULL),
(4, NULL),
(5, NULL),
(6, NULL),
(7, NULL),
(8, NULL),
(9, NULL),
(10, NULL),
(11, NULL),
(12, NULL),
(13, NULL),
(14, NULL),
(15, NULL),
(16, NULL),
(17, NULL),
(18, NULL),
(19, NULL),
(20, NULL),
(21, NULL),
(22, NULL),
(23, NULL),
(24, NULL),
(25, NULL),
(26, NULL),
(27, NULL),
(28, NULL),
(29, NULL),
(30, NULL),
(31, NULL),
(32, NULL),
(33, NULL),
(34, NULL),
(35, NULL),
(36, NULL),
(37, NULL),
(38, NULL),
(39, NULL),
(40, NULL),
(41, NULL);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `colors`
--

CREATE TABLE `colors` (
  `ID` int(11) NOT NULL,
  `Color` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `colors`
--

INSERT INTO `colors` (`ID`, `Color`) VALUES
(1, 'red'),
(2, 'yellow');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `gamestate`
--

CREATE TABLE `gamestate` (
  `ID` int(11) NOT NULL,
  `currentPlayer` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `gamestate`
--

INSERT INTO `gamestate` (`ID`, `currentPlayer`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `players`
--

CREATE TABLE `players` (
  `ID` int(11) NOT NULL,
  `ColorFK` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `players`
--

INSERT INTO `players` (`ID`, `ColorFK`) VALUES
(1, 1),
(2, 2);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `statistic`
--

CREATE TABLE `statistic` (
  `ID` int(11) NOT NULL,
  `PlayerFK` int(11) DEFAULT NULL,
  `Playtime` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `activgame`
--
ALTER TABLE `activgame`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `PlayerFK` (`PlayerFK`);

--
-- Indizes für die Tabelle `colors`
--
ALTER TABLE `colors`
  ADD PRIMARY KEY (`ID`);

--
-- Indizes für die Tabelle `gamestate`
--
ALTER TABLE `gamestate`
  ADD PRIMARY KEY (`ID`);

--
-- Indizes für die Tabelle `players`
--
ALTER TABLE `players`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ColorFK` (`ColorFK`);

--
-- Indizes für die Tabelle `statistic`
--
ALTER TABLE `statistic`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `PlayerFK` (`PlayerFK`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `activgame`
--
ALTER TABLE `activgame`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT für Tabelle `colors`
--
ALTER TABLE `colors`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT für Tabelle `gamestate`
--
ALTER TABLE `gamestate`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT für Tabelle `players`
--
ALTER TABLE `players`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT für Tabelle `statistic`
--
ALTER TABLE `statistic`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `activgame`
--
ALTER TABLE `activgame`
  ADD CONSTRAINT `activgame_ibfk_1` FOREIGN KEY (`PlayerFK`) REFERENCES `players` (`ID`);

--
-- Constraints der Tabelle `players`
--
ALTER TABLE `players`
  ADD CONSTRAINT `players_ibfk_1` FOREIGN KEY (`ColorFK`) REFERENCES `colors` (`ID`);

--
-- Constraints der Tabelle `statistic`
--
ALTER TABLE `statistic`
  ADD CONSTRAINT `statistic_ibfk_1` FOREIGN KEY (`PlayerFK`) REFERENCES `players` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
