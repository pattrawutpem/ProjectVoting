-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 05, 2023 at 07:54 AM
-- Server version: 10.5.20-MariaDB
-- PHP Version: 7.3.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `id21442045_voter`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `account_username` varchar(50) NOT NULL,
  `account_password` varchar(50) NOT NULL,
  `void` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`account_username`, `account_password`, `void`) VALUES
('admin', '1234', 0);

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
(1, 'เลือกตั้งนายกสโมสร คณะเทคโนโลยีดิจิทัล', 'ขอเชิญชวนพี่ๆน้องๆเลือกตั้งเลือกตั้งนายกสโมสร คณะเทคโนโลยีดิจิทัล', '2023-11-01 09:50:00', '2023-11-03 20:59:00', 0003),
(2, 'Et quo accusantium s', 'Dolorum corrupti te', '2023-06-07 06:25:00', '2023-11-01 18:04:00', 0002),
(3, 'Aut vero ipsam volup', 'Quaerat sunt quia po', '1999-11-13 04:00:00', '2000-02-16 07:31:00', 0001),
(4, 'Excepturi elit temp', 'Possimus ipsam sint', '1977-04-28 15:58:00', '2009-12-17 02:29:00', 0004);

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
  `type_id` int(4) UNSIGNED ZEROFILL NOT NULL DEFAULT 0003,
  `score` int(11) NOT NULL DEFAULT 0,
  `regis_date` date NOT NULL,
  `void` int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `register_club_president`
--

INSERT INTO `register_club_president` (`club_president_id`, `club_president_firstname`, `club_president_lastname`, `number`, `prefix`, `faculty`, `major`, `age`, `birth_date`, `idCard`, `email`, `phone`, `slogan`, `detail`, `picture`, `type_id`, `score`, `regis_date`, `void`) VALUES
(0001, 'ภัททราวุธ', 'โปธา', 1, 'นาย', 'เทคโนโลยีดิจิทัล', 'วิทยาการคอมพิวเตอร์', 22, '2023-11-01', '1579900917212', 'pattrawutpem@gmail.com', '0613562557', 'ตั้งใจ แก้ไข เพื่อพัฒนา', 'นโยบาย : \r\nสานต่อโครงการเก่า สร้างสรรค์โครงการใหม่ \r\nจัดกิจกรรมร่วมกันเพื่อสร้างความสัมพันธ์ระหว่างนักศึกษา\r\n', '653f387667fb3328632683_555061989684514_7333745982211132586_n.jpg', 0003, 11, '2023-10-30', 0),
(0002, 'กมลลักษณ์', 'อาทรประชาชิต', 3, 'นางสาว', 'เทคโนโลยีดิจิทัล', 'วิทยาการคอมพิวเตอร์', 22, '2001-09-19', '1571401030339', '661463021@crru.ac.th', '0634313668', 'ทำแล้ว ทำอยู่ ทำต่อไป', 'จะพัฒนาให้ดีขึ้นกว่าที่เป็นอยู่', '654151cf7d8ad371924310_1343637736226530_1510864423438259675_n.jpg', 0003, 1, '2023-10-31', 0),
(0003, 'สมหมาย', 'ใจดี', 4, 'นาย', 'เทคโนโลยีดิจิทัล', 'วิทยาการคอมพิวเตอร์', 28, '1998-01-01', '1500000000000', 'pattrawutpem@gmail.com', '0600000000', 'แก้ไข พัฒนา สานต่อ', 'แก้ไขปัญหา และพัฒนาส่งเสริมการเรียน', '65421e2f1ca51247994615_3107716439509895_4781455459858532754_n.jpg', 0003, 0, '2023-11-01', 0);

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
  `type_id` int(4) UNSIGNED ZEROFILL NOT NULL DEFAULT 0001,
  `score` int(11) NOT NULL DEFAULT 0,
  `void` int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `register_house_of_representatives`
--

INSERT INTO `register_house_of_representatives` (`Representatives_id`, `prefix`, `Representatives_firstname`, `Representatives_lastname`, `number`, `age`, `idCard`, `birth_date`, `nationality`, `career`, `house_number`, `moo`, `tumbon`, `district`, `province`, `post`, `email`, `phone`, `Political_Party`, `slogan`, `constituency`, `detail`, `educational`, `picture`, `regis_date`, `type_id`, `score`, `void`) VALUES
(0001, 'Et reprehenderit ea ', 'Lesley', 'Dawson', 471, 89, 'Doloremque ve', '1983-04-16', 'Voluptate in ipsa i', 'Ad velit fugiat aut ', 7, 40, 'Odit aut laboris rat', 'Sunt esse duis ad a', 'Non iure accusantium', 44, 'rymejykup@mailinator.com', 1522222, 'Placeat fugit maio', 'Aut dolore consectet', 3, 'Minus enim minim fac', 'Porro dolorem quas a', '6544908ba5a65—Pngtree—voting and election in international_6545404.png', '2023-11-01', 0001, 0, 0);

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
  `type_id` int(4) UNSIGNED ZEROFILL NOT NULL DEFAULT 0004,
  `toppic_id` int(4) NOT NULL,
  `score` int(11) NOT NULL DEFAULT 0,
  `regis_date` date NOT NULL,
  `void` int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `register_other`
--

INSERT INTO `register_other` (`register_other_id`, `register_other_fistname`, `register_other_lastname`, `number`, `detail`, `picture`, `type_id`, `toppic_id`, `score`, `regis_date`, `void`) VALUES
(0001, 'สงกรานต์', 'สงกรานต์', 1, '-', '6542ae591fbfe395677366_2318500185096417_4186359558406953792_n.jpg', 0004, 1, 0, '2023-11-01', 0);

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
  `type_id` int(4) UNSIGNED ZEROFILL NOT NULL DEFAULT 0002,
  `score` int(11) NOT NULL DEFAULT 0,
  `regis_date` date NOT NULL,
  `void` int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `register_provincial_council`
--

INSERT INTO `register_provincial_council` (`provincial_id`, `prefix`, `provincial_firstname`, `provincial_lastname`, `number`, `age`, `birth_date`, `idCard`, `nationality`, `career`, `house_number`, `moo`, `tumbon`, `district`, `province`, `post`, `email`, `phone`, `constituency`, `educational`, `picture`, `type_id`, `score`, `regis_date`, `void`) VALUES
(0001, 'Dolores aut quia eum', 'Keaton', 'Burris', 10, 55, '2010-11-08 00:00:00', 'Sint quo volu', 'Possimus saepe nece', 'Quia ut libero quia ', 167, 21, 'Veritatis ea est ita', 'Non ducimus in recu', 'Ut elit aut modi la', 79, 'kiwunig@mailinator.com', 600000000, 3, 'Nobis nemo proident', '65427dca106c1raise-hand.png', 0002, 0, '2023-11-01', 0);

-- --------------------------------------------------------

--
-- Table structure for table `register_toppic`
--

CREATE TABLE `register_toppic` (
  `toppic_id` int(4) UNSIGNED ZEROFILL NOT NULL,
  `toppic_name` varchar(255) NOT NULL,
  `void` int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `register_toppic`
--

INSERT INTO `register_toppic` (`toppic_id`, `toppic_name`, `void`) VALUES
(0001, 'ประธานศิษย์เก่า', 0);

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
  `Gender` varchar(6) NOT NULL,
  `idCard` varchar(13) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` varchar(10) NOT NULL,
  `status_vote_hor` int(1) NOT NULL DEFAULT 0,
  `status_vote_prc` int(1) NOT NULL DEFAULT 0,
  `status_vote_clp` int(1) NOT NULL DEFAULT 0,
  `status_vote_other` int(1) NOT NULL DEFAULT 0,
  `otp` int(4) NOT NULL DEFAULT 0,
  `void` int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `voter`
--

INSERT INTO `voter` (`voter_id`, `voter_firstname`, `voter_lastname`, `Gender`, `idCard`, `email`, `phone`, `status_vote_hor`, `status_vote_prc`, `status_vote_clp`, `status_vote_other`, `otp`, `void`) VALUES
(0001, '﻿ภัททราวุธ', 'โปธา', 'ชาย', '1579900917212', 'pattrawutpem@gmail.com', '0613562557', 0, 0, 0, 0, 7919, 0),
(0002, 'ก้อง', 'แซ่ว่าง', 'ชาย', '1500000000000', 'kong631463010@gmail.com', '1111111111', 0, 0, 0, 0, 0, 0),
(0003, '﻿อัญมาณี', 'จันทะมา', 'หญิง', '1570301203877', '631463024@crru.ac.th', '0625011173', 0, 0, 0, 0, 5344, 0),
(0004, 'สงกรานต์', 'คำมูล', 'ชาย', '8571576080707', '631463009@crru.ac.th', '0825049025', 0, 0, 1, 0, 9961, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`account_username`);

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
