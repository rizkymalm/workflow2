-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Dec 26, 2020 at 04:23 PM
-- Server version: 10.1.13-MariaDB
-- PHP Version: 5.6.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `workflow`
--

-- --------------------------------------------------------

--
-- Table structure for table `attachment`
--

CREATE TABLE `attachment` (
  `id_attachment` int(11) NOT NULL,
  `id_employee` varchar(10) NOT NULL,
  `id_data` varchar(10) NOT NULL COMMENT 'ID Request or Project',
  `type_attachment` varchar(20) NOT NULL,
  `file_name` varchar(255) NOT NULL,
  `file_upload` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `attachment`
--

INSERT INTO `attachment` (`id_attachment`, `id_employee`, `id_data`, `type_attachment`, `file_name`, `file_upload`) VALUES
(1, 'FWT0001', 'IDD3341', 'project', 'IDD3341 Sovia 2 - HUT Soy Sauce-Diary- POUCH - BAHASA -cv1.docx', '2020-04-13 13:43:48'),
(2, 'FWT0001', 'IDD3341', 'project', 'IDD3341 Sovia 2 - HUT Soy Sauce-Screener-cv1.docx', '2020-04-13 13:43:48'),
(3, 'QDT0002', 'IDD9999', 'project', 'F1001.xlsx', '2020-05-18 23:53:20'),
(4, 'QDT0001', 'QDT-2', 'request', 'b28fd79a-d55b-4579-9e95-746851866aa0.jpg', '2020-05-18 23:57:50');

-- --------------------------------------------------------

--
-- Table structure for table `client`
--

CREATE TABLE `client` (
  `id_client` int(5) NOT NULL,
  `client_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `client`
--

INSERT INTO `client` (`id_client`, `client_name`) VALUES
(10001, 'Santos Jaya Abadi'),
(10002, 'Suzuki - Indomobil'),
(10003, 'Amartha'),
(10004, 'Re Juve'),
(10005, 'Sunlife Insurance'),
(10006, 'Heinz ABC');

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE `comment` (
  `id_comment` int(8) NOT NULL,
  `id_request` varchar(10) NOT NULL,
  `id_employee` varchar(10) NOT NULL,
  `comment_text` text NOT NULL,
  `comment_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `comment`
--

INSERT INTO `comment` (`id_comment`, `id_request`, `id_employee`, `comment_text`, `comment_date`) VALUES
(1, 'QDT-2', 'QDT0001', 'jdadlaksd dksdlfsfjsfsl', '2020-05-18 23:58:16');

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `id_department` int(5) NOT NULL,
  `department` varchar(50) NOT NULL,
  `initial` varchar(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`id_department`, `department`, `initial`) VALUES
(1, 'Questionnaire Development Team', 'QDT'),
(2, 'Data Analyst Team', 'DAT'),
(3, 'Data Processing Team', 'DPT'),
(4, 'Statistic Team', 'STT'),
(5, 'IT Team', 'ITT'),
(6, 'Researcher Team', 'RET'),
(7, 'Fieldwork Team', 'FWT');

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `id_employee` varchar(10) NOT NULL,
  `id_department` int(3) DEFAULT NULL,
  `email_employee` varchar(255) DEFAULT NULL,
  `pass_employee` varchar(20) NOT NULL,
  `name_employee` varchar(100) NOT NULL,
  `verify` enum('0','1') NOT NULL,
  `admin` enum('0','1') NOT NULL,
  `leader` enum('0','1') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`id_employee`, `id_department`, `email_employee`, `pass_employee`, `name_employee`, `verify`, `admin`, `leader`) VALUES
('DAT0001', 2, 'yekawati@kadence.com', 'kadence', 'Yuli Ekawati', '1', '0', '1'),
('DAT0002', 2, 'samrulla@kadence.com', 'kadence', 'Syarif Amrulla', '1', '0', '1'),
('DPT0001', 3, 'gede@kadence.com', 'kadence', 'Gede Arimbawa', '1', '0', '1'),
('DPT0002', 3, 'dsusilo@kadence.com', 'kadence', 'Dedy SUsilo', '1', '0', '0'),
('FWT0001', 7, 'hhasanudin@kadence.com', 'kadence', 'Hasanudin', '1', '1', '1'),
('ITT0001', 5, 'fnovembrianto@kadence.com', 'kadence', 'FX Novembrianto', '1', '1', '1'),
('ITT0002', 5, 'zfebiyanto@kadence.com', 'kadence', 'Zaki Febiyanto', '1', '1', '0'),
('QDT0001', 1, 'gghanadi@kadence.com', 'passgannet', 'Gannet Ghanadi', '1', '1', '1'),
('QDT0002', 1, 'rmalem@kadence.com', 'password', 'Rizki Malem', '1', '1', '1'),
('RET0002', 6, 'ajayanti@kadence.com', 'password', 'Amira Rifda Jayanti', '1', '0', '0');

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

CREATE TABLE `notification` (
  `id_notification` int(10) NOT NULL,
  `id_to` varchar(10) NOT NULL,
  `id_from` varchar(10) NOT NULL,
  `id_request` varchar(10) NOT NULL,
  `type_notif` varchar(20) NOT NULL,
  `date_notif` datetime NOT NULL,
  `open_notif` enum('y','n') NOT NULL DEFAULT 'n'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `notification`
--

INSERT INTO `notification` (`id_notification`, `id_to`, `id_from`, `id_request`, `type_notif`, `date_notif`, `open_notif`) VALUES
(1, 'QDT0001', 'FWT0001', 'QDT-0001', 'request', '2020-04-13 13:18:54', 'y'),
(2, 'DAT0001', 'FWT0001', 'DAT-0001', 'request', '2020-04-13 13:42:15', 'n'),
(3, 'QDT0002', 'QDT0001', 'QDT-0001', 'request', '2020-04-14 00:41:24', 'y'),
(4, 'QDT0001', 'QDT0002', 'QDT-2', 'request', '2020-05-18 23:55:50', 'y'),
(5, 'DAT0001', 'QDT0001', 'DAT-2', 'request', '2020-05-19 00:02:46', 'n'),
(6, 'ITT0001', 'QDT0001', 'ITT-0001', 'request', '2020-05-19 00:05:42', 'n'),
(8, 'QDT0001', 'RET0002', 'QDT-3', 'request', '2020-11-09 17:59:59', 'y'),
(9, 'QDT0002', 'QDT0001', 'QDT-3', '', '2020-11-09 20:00:46', 'y');

-- --------------------------------------------------------

--
-- Table structure for table `project`
--

CREATE TABLE `project` (
  `id_project` varchar(10) NOT NULL,
  `id_employee` varchar(10) NOT NULL,
  `id_client` int(5) NOT NULL,
  `project_name` varchar(100) NOT NULL,
  `project_desc` text NOT NULL,
  `project_duedate` datetime NOT NULL,
  `created_project` datetime NOT NULL,
  `update_project` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `project`
--

INSERT INTO `project` (`id_project`, `id_employee`, `id_client`, `project_name`, `project_desc`, `project_duedate`, `created_project`, `update_project`) VALUES
('IDD3193', 'FWT0001', 10003, 'Nebula', 'Financial, Investasi', '2020-04-24 00:00:00', '2020-04-13 13:18:11', '2020-04-13 13:18:11'),
('IDD3273', 'FWT0001', 10002, 'Nara', 'Mobil, Dealer', '2020-04-23 00:00:00', '2020-04-13 13:17:04', '2020-04-13 13:17:04'),
('IDD3274', 'FWT0001', 10005, 'Jeju', 'project sunlife', '2020-04-23 00:00:00', '2020-04-13 13:32:45', '2020-04-13 13:32:45'),
('IDD3289', 'FWT0001', 10004, 'Sabrina', 'FMGC', '2020-04-25 00:00:00', '2020-04-13 13:30:31', '2020-04-13 13:30:31'),
('IDD3322', 'FWT0001', 10001, 'Flavorful W11 2020', 'Coffee, Kopi instant', '2020-05-13 00:00:00', '2020-04-13 13:16:31', '2020-04-13 13:16:31'),
('IDD3341', 'FWT0001', 10006, 'Sovia 2', 'FMGC', '2020-04-18 00:00:00', '2020-04-13 13:43:48', '2020-04-13 13:43:48'),
('IDD9999', 'QDT0002', 10001, 'Caramella Online', 'Tolong ya', '2020-05-25 00:00:00', '2020-05-18 23:53:20', '2020-05-18 23:53:20');

-- --------------------------------------------------------

--
-- Table structure for table `request`
--

CREATE TABLE `request` (
  `id_request` varchar(10) NOT NULL,
  `id_project` varchar(10) DEFAULT NULL,
  `id_req_from` varchar(10) NOT NULL,
  `id_req_to` varchar(10) NOT NULL,
  `id_department` int(5) NOT NULL,
  `subj_req` varchar(50) NOT NULL,
  `desc_req` text,
  `duedate` datetime NOT NULL,
  `priority_issue` enum('major','important') NOT NULL,
  `status` enum('open','onprogres','resolved','closed','cancel','reopen') NOT NULL,
  `created_req` datetime NOT NULL,
  `update_req` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `request`
--

INSERT INTO `request` (`id_request`, `id_project`, `id_req_from`, `id_req_to`, `id_department`, `subj_req`, `desc_req`, `duedate`, `priority_issue`, `status`, `created_req`, `update_req`) VALUES
('DAT-2', 'IDD9999', 'QDT0001', 'DAT0001', 2, 'Charting', 'asdsd', '2020-05-25 00:00:00', 'major', 'open', '2020-05-19 00:02:46', '2020-05-19 00:02:46'),
('DPT-0001', 'IDD3273 - ', 'RET0002', 'DPT0001', 3, 'Tabulasi', 'Minta tolong tabulasinya ya', '2020-11-19 00:00:00', 'major', 'open', '2020-11-09 17:56:06', '2020-11-09 17:56:06'),
('ITT-0001', '0', 'QDT0001', 'ITT0001', 5, 'Install aplikas', 'asdasd', '2020-05-23 00:00:00', 'major', 'open', '2020-05-19 00:05:42', '2020-05-19 00:05:42'),
('QDT-0001', 'IDD3322', 'FWT0001', 'QDT0002', 1, 'Scripting Project Flavorful W11', 'QNR menyusul ya', '2020-04-23 00:00:00', 'important', 'resolved', '2020-04-13 13:18:54', '2020-04-13 13:18:54'),
('QDT-2', 'IDD9999', 'QDT0002', 'QDT0001', 1, 'Scripting Caramella Online', 'asddjakfsdf', '2020-05-21 00:00:00', 'major', 'resolved', '2020-05-18 23:55:50', '2020-05-18 23:55:50'),
('QDT-3', 'IDD3273', 'RET0002', 'QDT0002', 1, 'Scripting QDT STG', 'Minta tolong langsung scripting yaaaa', '2020-11-12 00:00:00', 'major', 'resolved', '2020-11-09 17:59:59', '2020-11-09 17:59:59');

-- --------------------------------------------------------

--
-- Table structure for table `worklog`
--

CREATE TABLE `worklog` (
  `id_worklog` int(10) NOT NULL,
  `id_employee` varchar(10) NOT NULL,
  `id_log` varchar(10) NOT NULL,
  `log_type` varchar(20) NOT NULL,
  `detail_log` varchar(10) NOT NULL,
  `update_log` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `worklog`
--

INSERT INTO `worklog` (`id_worklog`, `id_employee`, `id_log`, `log_type`, `detail_log`, `update_log`) VALUES
(1, 'FWT0001', 'IDD3322', 'create', 'project', '2020-04-13 13:16:31'),
(2, 'FWT0001', 'IDD3273', 'create', 'project', '2020-04-13 13:17:04'),
(3, 'FWT0001', 'IDD3193', 'create', 'project', '2020-04-13 13:18:11'),
(4, 'FWT0001', 'QDT-0001', 'create', 'request', '2020-04-13 13:18:54'),
(5, 'FWT0001', 'IDD3289', 'create', 'project', '2020-04-13 13:30:31'),
(6, 'FWT0001', 'IDD3274', 'create', 'project', '2020-04-13 13:32:45'),
(7, 'FWT0001', 'DAT-0001', 'create', 'request', '2020-04-13 13:42:15'),
(8, 'FWT0001', 'IDD3341', 'create', 'project', '2020-04-13 13:43:48'),
(9, 'QDT0001', 'QDT-0001', 'edit', 'status', '2020-04-13 23:54:13'),
(10, 'QDT0001', 'QDT-0001', 'edit', 'priority_i', '2020-04-13 23:54:37'),
(11, 'QDT0001', 'QDT-0001', 'edit', 'assignee', '2020-04-14 00:16:19'),
(12, 'QDT0001', 'QDT-0001', 'edit', 'id_req_to', '2020-04-14 00:19:12'),
(13, 'QDT0002', 'QDT-0001', 'edit', 'id_req_to', '2020-04-14 00:25:44'),
(14, 'QDT0002', 'QDT-0001', 'edit', 'id_req_to', '2020-04-14 00:30:13'),
(15, 'QDT0002', 'QDT-0001', 'edit', 'id_req_to', '2020-04-14 00:30:48'),
(16, 'QDT0002', 'QDT-0001', 'edit', 'id_req_to', '2020-04-14 00:31:43'),
(17, 'QDT0002', 'QDT-0001', 'edit', 'id_req_to', '2020-04-14 00:32:02'),
(18, 'QDT0002', 'QDT-0001', 'edit', 'id_req_to', '2020-04-14 00:32:33'),
(19, 'QDT0002', 'QDT-0001', 'edit', 'id_req_to', '2020-04-14 00:32:58'),
(20, 'QDT0002', 'QDT-0001', 'edit', 'id_req_to', '2020-04-14 00:33:31'),
(21, 'QDT0002', 'QDT-0001', 'edit', 'Assignee', '2020-04-14 00:37:20'),
(22, 'QDT0001', 'QDT-0001', 'edit', 'Assignee', '2020-04-14 00:41:24'),
(23, 'QDT0002', 'IDD9999', 'create', 'project', '2020-05-18 23:53:20'),
(24, 'QDT0002', 'QDT-2', 'create', 'request', '2020-05-18 23:55:50'),
(25, 'QDT0001', 'QDT-2', 'comment', 'request', '2020-05-18 23:58:16'),
(26, 'QDT0001', 'DAT-2', 'create', 'request', '2020-05-19 00:02:46'),
(27, 'QDT0001', 'ITT-0001', 'create', 'request', '2020-05-19 00:05:42'),
(28, 'RET0002', 'DPT-0001', 'create', 'request', '2020-11-09 17:56:06'),
(29, 'RET0002', 'QDT-3', 'create', 'request', '2020-11-09 17:59:59'),
(30, 'QDT0001', 'QDT-3', 'edit', 'Assignee', '2020-11-09 20:00:46');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attachment`
--
ALTER TABLE `attachment`
  ADD PRIMARY KEY (`id_attachment`);

--
-- Indexes for table `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`id_client`);

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id_comment`);

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`id_department`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`id_employee`);

--
-- Indexes for table `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`id_notification`);

--
-- Indexes for table `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`id_project`);

--
-- Indexes for table `request`
--
ALTER TABLE `request`
  ADD PRIMARY KEY (`id_request`);

--
-- Indexes for table `worklog`
--
ALTER TABLE `worklog`
  ADD PRIMARY KEY (`id_worklog`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attachment`
--
ALTER TABLE `attachment`
  MODIFY `id_attachment` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `comment`
--
ALTER TABLE `comment`
  MODIFY `id_comment` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `department`
--
ALTER TABLE `department`
  MODIFY `id_department` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `notification`
--
ALTER TABLE `notification`
  MODIFY `id_notification` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `worklog`
--
ALTER TABLE `worklog`
  MODIFY `id_worklog` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
