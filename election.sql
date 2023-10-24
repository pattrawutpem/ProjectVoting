-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 24, 2023 at 02:47 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `election`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `account_id` int(11) NOT NULL,
  `account_username` varchar(50) NOT NULL,
  `account_password` varchar(50) NOT NULL,
  `void` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`account_id`, `account_username`, `account_password`, `void`) VALUES
(1, 'admin', '1234', 0);

-- --------------------------------------------------------

--
-- Table structure for table `declare`
--

CREATE TABLE `declare` (
  `declare_id` int(4) NOT NULL,
  `toppic` varchar(50) NOT NULL,
  `detail` longtext NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `type_id` int(4) UNSIGNED ZEROFILL NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `declare`
--

INSERT INTO `declare` (`declare_id`, `toppic`, `detail`, `start_date`, `end_date`, `type_id`) VALUES
(1, 'ตัวอย่าง', '  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis perferendis illum animi facere veniam maxime tenetur. Quia tenetur modi ullam at tempore? Laboriosam assumenda delectus mollitia cupiditate magni soluta iste?', '2023-09-28 11:19:54', '2023-10-03 19:19:54', 0003),
(2, 'Ratione ut nesciunt5', 'Duis officia iusto m', '2023-09-29 20:40:00', '2023-10-03 22:16:00', 0004),
(3, 'ตัวอย่างdd', 'asdfgdjdsasbcfd', '2023-10-02 16:20:13', '2023-10-03 16:20:13', 0002),
(4, 'oopopopop', 'xczghgzvbvnhgfzvxfcgjg', '2023-10-02 16:20:13', '2023-10-04 16:20:13', 0001);

-- --------------------------------------------------------

--
-- Table structure for table `register_club_president`
--

CREATE TABLE `register_club_president` (
  `club_president_id` int(4) UNSIGNED ZEROFILL NOT NULL,
  `club_president_firstname` varchar(255) NOT NULL,
  `club_president_lastname` varchar(255) NOT NULL,
  `number` int(2) NOT NULL,
  `prefix` varchar(50) NOT NULL,
  `faculty` varchar(255) NOT NULL,
  `major` varchar(255) NOT NULL,
  `age` int(3) NOT NULL,
  `birth_date` date NOT NULL,
  `idCard` varchar(13) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` varchar(11) NOT NULL,
  `slogan` longtext NOT NULL,
  `detail` longtext NOT NULL,
  `picture` varchar(255) NOT NULL,
  `type_id` int(4) UNSIGNED ZEROFILL NOT NULL,
  `score` int(11) NOT NULL,
  `regis_date` date NOT NULL,
  `void` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `register_club_president`
--

INSERT INTO `register_club_president` (`club_president_id`, `club_president_firstname`, `club_president_lastname`, `number`, `prefix`, `faculty`, `major`, `age`, `birth_date`, `idCard`, `email`, `phone`, `slogan`, `detail`, `picture`, `type_id`, `score`, `regis_date`, `void`) VALUES
(0001, 'Chava', 'Hobbs', 14, 'นาย', 'Et quis dolore asper', 'Quis sed officiis sa', 34, '1972-06-19', 'Eum assumenda', 'zutu@mailinator.com', '+1 (281) 38', 'Enim qui in rerum qu', 'Commodo deserunt pra', '6530ed7368d7fScreenshot 2022-12-24 161048.png', 0003, 0, '2023-10-19', 0),
(0002, 'Maggy', 'Carter', 805, 'นาย', 'Officia laboriosam ', 'Perferendis illo ab ', 14, '2019-08-25', 'Non ex qui ha', 'nyfap@mailinator.com', '+1 (138) 58', 'Veniam similique it', 'Cillum eu et eius to', '65339921bd1e7QWDTVRte_400x400.jpg', 0003, 1, '2023-10-21', 0);

-- --------------------------------------------------------

--
-- Table structure for table `register_house_of_representatives`
--

CREATE TABLE `register_house_of_representatives` (
  `Representatives_id` int(4) UNSIGNED ZEROFILL NOT NULL,
  `prefix` varchar(50) NOT NULL,
  `Representatives_firstname` varchar(255) NOT NULL,
  `Representatives_lastname` varchar(255) NOT NULL,
  `number` int(2) NOT NULL,
  `age` int(2) NOT NULL,
  `idCard` varchar(13) NOT NULL,
  `birth_date` date NOT NULL,
  `nationality` varchar(50) NOT NULL,
  `career` varchar(255) NOT NULL,
  `house_number` int(10) NOT NULL,
  `moo` int(10) NOT NULL,
  `tumbon` varchar(255) NOT NULL,
  `district` varchar(255) NOT NULL,
  `province` varchar(255) NOT NULL,
  `post` int(5) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` int(11) NOT NULL,
  `Political_Party` varchar(255) NOT NULL,
  `slogan` longtext NOT NULL,
  `constituency` int(4) NOT NULL,
  `detail` longtext NOT NULL,
  `educational` varchar(500) NOT NULL,
  `picture` varchar(255) NOT NULL,
  `regis_date` date NOT NULL,
  `type_id` int(4) UNSIGNED ZEROFILL NOT NULL,
  `score` int(11) NOT NULL,
  `void` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `register_house_of_representatives`
--

INSERT INTO `register_house_of_representatives` (`Representatives_id`, `prefix`, `Representatives_firstname`, `Representatives_lastname`, `number`, `age`, `idCard`, `birth_date`, `nationality`, `career`, `house_number`, `moo`, `tumbon`, `district`, `province`, `post`, `email`, `phone`, `Political_Party`, `slogan`, `constituency`, `detail`, `educational`, `picture`, `regis_date`, `type_id`, `score`, `void`) VALUES
(0001, '', 'Britanni', 'Castro', 769, 5, 'Nisi eum duci', '2021-02-02', 'Ut amet veniam lab', 'Non aut nisi non dis', 303, 34, 'Aliqua Accusamus qu', 'Atque rerum quod ips', 'Quia pariatur Illo ', 11, 'dahet@mailinator.com', 1, 'In in cupidatat aut ', 'Ut in aliquam et mai', 0, 'Qui cum sequi qui do', 'Eligendi qui fugiat ', '652faf87f3a4434a263c1aa683b5b52417a4fe42ac2fa.jpg', '2023-10-18', 0001, 3, 0),
(0002, 'นาย', 'Laurel', 'Charles', 865, 7, 'Velit excepte', '1996-06-27', 'Dolore ea debitis ne', 'Deserunt voluptate l', 804, 19, 'Officia impedit aut', 'Fugiat labore sit d', 'Ullam sequi odio dol', 99, 'wuce@mailinator.com', 1, 'Omnis in sed a ut te', 'Sed exercitation vol', 0, 'Aliqua Excepteur fu', 'Quam veritatis id mo', '652faffab677814799d9779f9b44d7116783ce7121d5f.jpg', '2023-10-18', 0001, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `register_other`
--

CREATE TABLE `register_other` (
  `register_other_id` int(4) UNSIGNED ZEROFILL NOT NULL,
  `register_other_fistname` varchar(255) NOT NULL,
  `register_other_lastname` varchar(255) NOT NULL,
  `number` int(6) NOT NULL,
  `detail` longtext NOT NULL,
  `picture` varchar(255) NOT NULL,
  `type_id` int(4) UNSIGNED ZEROFILL NOT NULL,
  `toppic_id` int(4) NOT NULL,
  `score` int(11) NOT NULL,
  `regis_date` date NOT NULL,
  `void` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `register_other`
--

INSERT INTO `register_other` (`register_other_id`, `register_other_fistname`, `register_other_lastname`, `number`, `detail`, `picture`, `type_id`, `toppic_id`, `score`, `regis_date`, `void`) VALUES
(0002, 'Graiden Walker', 'Graiden Walker', 109, 'In exercitationem re', '6530f2f98a30014799d9779f9b44d7116783ce7121d5f.jpg', 0004, 5, 0, '2023-10-19', 0);

-- --------------------------------------------------------

--
-- Table structure for table `register_provincial_council`
--

CREATE TABLE `register_provincial_council` (
  `provincial_id` int(4) UNSIGNED ZEROFILL NOT NULL,
  `prefix` varchar(50) NOT NULL,
  `provincial_firstname` varchar(255) NOT NULL,
  `provincial_lastname` varchar(255) NOT NULL,
  `number` int(4) NOT NULL,
  `age` int(3) NOT NULL,
  `birth_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `idCard` varchar(13) NOT NULL,
  `nationality` varchar(50) NOT NULL,
  `career` varchar(255) NOT NULL,
  `house_number` int(10) NOT NULL,
  `moo` int(10) NOT NULL,
  `tumbon` varchar(255) NOT NULL,
  `district` varchar(255) NOT NULL,
  `province` varchar(255) NOT NULL,
  `post` int(5) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` int(11) NOT NULL,
  `constituency` int(4) NOT NULL,
  `educational` varchar(500) NOT NULL,
  `picture` varchar(255) NOT NULL,
  `type_id` int(4) UNSIGNED ZEROFILL NOT NULL,
  `score` int(11) NOT NULL,
  `regis_date` date NOT NULL,
  `void` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `register_provincial_council`
--

INSERT INTO `register_provincial_council` (`provincial_id`, `prefix`, `provincial_firstname`, `provincial_lastname`, `number`, `age`, `birth_date`, `idCard`, `nationality`, `career`, `house_number`, `moo`, `tumbon`, `district`, `province`, `post`, `email`, `phone`, `constituency`, `educational`, `picture`, `type_id`, `score`, `regis_date`, `void`) VALUES
(0003, 'Quasi ut asperiores ', 'Alice', 'Franco', 160, 74, '2023-10-21 11:29:51', 'Esse cupidita', 'Quia numquam volupta', 'Aut qui aperiam est', 919, 10, 'Exercitationem adipi', 'Dolore pariatur Eli', 'Nihil numquam aliqui', 87, 'gyhex@mailinator.com', 1, 0, 'Dolores explicabo M', '6530f29141e39Admin-bro.png', 0002, 1, '2023-10-19', 0);

-- --------------------------------------------------------

--
-- Table structure for table `register_toppic`
--

CREATE TABLE `register_toppic` (
  `toppic_id` int(4) UNSIGNED ZEROFILL NOT NULL,
  `toppic_name` varchar(255) NOT NULL,
  `void` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `register_toppic`
--

INSERT INTO `register_toppic` (`toppic_id`, `toppic_name`, `void`) VALUES
(0005, 'หัวหน้างาน', 0),
(0006, 'ทดสอบ', 0);

-- --------------------------------------------------------

--
-- Table structure for table `type`
--

CREATE TABLE `type` (
  `type_id` int(4) UNSIGNED ZEROFILL NOT NULL,
  `type_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `type`
--

INSERT INTO `type` (`type_id`, `type_name`) VALUES
(0001, 'สมาชิกสภาผู้แทนราษฎร( สส. )'),
(0002, 'สมาชิกสภาจังหวัด( สจ. )'),
(0003, 'ประธานสโมสร'),
(0004, 'อื่นๆ');

-- --------------------------------------------------------

--
-- Table structure for table `voter`
--

CREATE TABLE `voter` (
  `voter_id` int(4) UNSIGNED ZEROFILL NOT NULL,
  `voter_firstname` varchar(255) NOT NULL,
  `voter_lastname` varchar(255) NOT NULL,
  `Gender` varchar(4) NOT NULL,
  `idCard` varchar(13) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` varchar(10) NOT NULL,
  `status_vote` int(1) NOT NULL,
  `type_id` int(4) NOT NULL,
  `void` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `voter`
--

INSERT INTO `voter` (`voter_id`, `voter_firstname`, `voter_lastname`, `Gender`, `idCard`, `email`, `phone`, `status_vote`, `type_id`, `void`) VALUES
(0005, '﻿ภัททราวุธ', 'โปธา', 'ชาย', '1500000000000', '631463013@crru.ac.th', '0613562557', 0, 1, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `declare`
--
ALTER TABLE `declare`
  ADD PRIMARY KEY (`declare_id`);

--
-- Indexes for table `register_club_president`
--
ALTER TABLE `register_club_president`
  ADD PRIMARY KEY (`club_president_id`);

--
-- Indexes for table `register_house_of_representatives`
--
ALTER TABLE `register_house_of_representatives`
  ADD PRIMARY KEY (`Representatives_id`);

--
-- Indexes for table `register_other`
--
ALTER TABLE `register_other`
  ADD PRIMARY KEY (`register_other_id`);

--
-- Indexes for table `register_provincial_council`
--
ALTER TABLE `register_provincial_council`
  ADD PRIMARY KEY (`provincial_id`);

--
-- Indexes for table `register_toppic`
--
ALTER TABLE `register_toppic`
  ADD PRIMARY KEY (`toppic_id`);

--
-- Indexes for table `type`
--
ALTER TABLE `type`
  ADD PRIMARY KEY (`type_id`);

--
-- Indexes for table `voter`
--
ALTER TABLE `voter`
  ADD PRIMARY KEY (`voter_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
