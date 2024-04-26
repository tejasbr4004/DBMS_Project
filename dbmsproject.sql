-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 02, 2022 at 03:44 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dbmsproject`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `username` varchar(255) DEFAULT NULL,
  `train_no` int(11) DEFAULT NULL,
  `source` varchar(255) DEFAULT NULL,
  `destination` varchar(255) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `no_of_seats` int(11) DEFAULT NULL,
  `seat_class` varchar(255) DEFAULT NULL,
  `book_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`username`, `train_no`, `source`, `destination`, `date`, `price`, `no_of_seats`, `seat_class`, `book_id`) VALUES
('Splinter2', 126079, 'bangalore', 'delhi', '2022-02-08', 69000, 69, '1A', 6),
('Splinter3', 126079, 'bangalore', 'delhi', '2022-02-08', 2000, 2, '1A', 7),
('Splinter2', 126079, 'Bangalore', 'Delhi', '2022-02-26', 23000, 23, '1A', 11),
('bmw', 654222, 'Bangalore', 'Mysore', '2022-02-24', 2000, 2, '1A', 12),
('Splinter2', 654222, 'Bangalore', 'Mysore', '2022-02-26', 1000, 1, '1A', 13),
('Splinter2', 654222, 'Bangalore', 'Mysore', '2022-02-26', 1000, 1, '1A', 14),
('enzo', 654222, 'Bangalore', 'Mysore', '2022-02-27', 2000, 2, '1A', 15),
('bmw', 126080, 'Delhi', 'Bangalore', '2022-02-28', 2100, 3, 'SL', 16),
('bmw', 654222, 'Bangalore', 'Mysore', '2022-02-28', 1400, 2, 'SL', 17),
('bmw', 126079, 'Bangalore', 'Delhi', '2022-03-01', 3000, 3, '1A', 18);

-- --------------------------------------------------------

--
-- Table structure for table `seat_availability`
--

CREATE TABLE `seat_availability` (
  `train_no` int(11) DEFAULT NULL,
  `seat_class` varchar(10) DEFAULT NULL,
  `seats_available` int(255) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `price` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `seat_availability`
--

INSERT INTO `seat_availability` (`train_no`, `seat_class`, `seats_available`, `date`, `price`) VALUES
(126079, '1A', 76, '2022-02-12', 1000),
(126079, 'SL', 73, '2022-02-12', 700),
(126079, 'SL', 100, '2022-02-05', 700),
(126079, '1A', 29, '2022-02-08', 1000),
(126079, 'SL', 98, '2022-02-10', 700),
(126079, '1A', 77, '2022-02-23', 1000),
(126079, 'SL', 98, '2022-02-26', 700),
(126079, '1A', 77, '2022-02-26', 1000),
(654222, 'SL', 100, '2022-02-27', 700),
(654222, '1A', 98, '2022-02-24', 1000),
(654222, '1A', 98, '2022-02-26', 1000),
(654222, '1A', 98, '2022-02-27', 1000),
(126080, 'SL', 97, '2022-02-28', 700),
(654222, 'SL', 98, '2022-02-28', 700),
(126079, '1A', 97, '2022-03-01', 1000);

-- --------------------------------------------------------

--
-- Table structure for table `stations`
--

CREATE TABLE `stations` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `stations`
--

INSERT INTO `stations` (`id`, `name`, `city`) VALUES
(1, 'KSR', 'Bangalore'),
(2, 'NCR', 'Delhi'),
(3, 'ER', 'Kolkata'),
(4, 'MAS', 'Chennai'),
(5, 'MYS', 'Mysore'),
(6, 'JPR', 'Jaipur');

-- --------------------------------------------------------

--
-- Table structure for table `train_info`
--

CREATE TABLE `train_info` (
  `train_no` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `source` varchar(255) DEFAULT NULL,
  `destination` varchar(255) DEFAULT NULL,
  `start_time` varchar(255) DEFAULT NULL,
  `end_time` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `train_info`
--

INSERT INTO `train_info` (`train_no`, `name`, `source`, `destination`, `start_time`, `end_time`) VALUES
(126079, 'Shatabdi Express', 'Bangalore', 'Delhi', '7 AM', '10 PM'),
(126080, 'Shatabdi Express', 'Delhi', 'Bangalore', '10 PM', '7 AM'),
(546780, 'Chennai Express', 'Chennai', 'Mysore', '8 AM', '6 PM'),
(546789, 'Chennai Express', 'Mysore', 'Chennai', '10 AM', '8 PM'),
(654222, 'Mysore Express', 'Bangalore', 'Mysore', '8 AM', '6 PM'),
(654223, 'Mysore Express', 'Mysore', 'Bangalore', '10 AM', '8 PM'),
(897141, 'Gatimaan Express', 'Kolkata', 'Delhi', '7 AM', '9 PM'),
(897142, 'Gatimaan Express', 'Delhi', 'Kolkata', '8 AM', '6 PM');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `name` varchar(255) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `is_admin` tinyint(1) DEFAULT NULL,
  `bank_ac` varchar(20) NOT NULL,
  `phone_no` int(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`name`, `username`, `email`, `password`, `address`, `is_admin`, `bank_ac`, `phone_no`) VALUES
('BMW', 'bmw', 'bmw@bmw.com', 'asdf', 'bengaluru', 0, '129009', 1234567890),
('dfghjk', 'bmw34', 'binnoto1234@gmail.com', 'sdfgh', 'fghjk', 0, '1221', 2147483647),
('eesh', 'eesh', 'binnoto1234@gmail.com', '1234', 'bengaluru', 0, '21221', 1212),
('ferrari', 'enzo', 'binnoto@gmail.com', '1234', 'monza', 0, '12344', 3456),
('supreet', 'Splinter2', 'abc@gmail.com', '1234', 'my home is my address', 0, '121212', 121),
('aman', 'Splinter3', 'abcdefg@gmail.com', '1234', 'office is my home', 0, '1213456', 234567801);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`book_id`),
  ADD KEY `username` (`username`),
  ADD KEY `train_no` (`train_no`);

--
-- Indexes for table `seat_availability`
--
ALTER TABLE `seat_availability`
  ADD KEY `train_no` (`train_no`);

--
-- Indexes for table `stations`
--
ALTER TABLE `stations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `train_info`
--
ALTER TABLE `train_info`
  ADD PRIMARY KEY (`train_no`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `book_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `stations`
--
ALTER TABLE `stations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`username`) REFERENCES `users` (`username`),
  ADD CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`train_no`) REFERENCES `train_info` (`train_no`);

--
-- Constraints for table `seat_availability`
--
ALTER TABLE `seat_availability`
  ADD CONSTRAINT `seat_availability_ibfk_1` FOREIGN KEY (`train_no`) REFERENCES `train_info` (`train_no`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
