-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Sep 27, 2015 at 11:23 PM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `homepage`
--

-- --------------------------------------------------------

--
-- Table structure for table `cal_events`
--

CREATE TABLE IF NOT EXISTS `cal_events` (
  `e_id` int(10) NOT NULL AUTO_INCREMENT,
  `e_name` varchar(255) NOT NULL,
  `e_desc` varchar(255) NOT NULL,
  `e_date` varchar(255) NOT NULL,
  `e_user` int(10) NOT NULL,
  PRIMARY KEY (`e_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=13 ;

--
-- Dumping data for table `cal_events`
--

INSERT INTO `cal_events` (`e_id`, `e_name`, `e_desc`, `e_date`, `e_user`) VALUES
(4, 'wiw', '78', '2015-9-4', 6),
(5, '543', '34', '2015-9-6', 6),
(6, 'wdfg', 'yfyfy', '2015-9-7', 6),
(7, 'ughj', 'vhjbknl', '2015-9-19', 6),
(8, 'hjk', 'fgh', '2015-9-2', 6),
(9, 'more', '67', '2015-9-14', 6),
(10, 'oh wow', '34', '2015-9-10', 6),
(11, 'more', '678', '2015-9-10', 6),
(12, 'cool!', '34', '2015-9-4', 6);

-- --------------------------------------------------------

--
-- Table structure for table `cal_spends`
--

CREATE TABLE IF NOT EXISTS `cal_spends` (
  `s_id` int(10) NOT NULL AUTO_INCREMENT,
  `s_name` varchar(255) NOT NULL,
  `s_price` int(10) NOT NULL,
  `s_date` varchar(255) NOT NULL,
  `s_user` int(10) NOT NULL,
  PRIMARY KEY (`s_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=31 ;

--
-- Dumping data for table `cal_spends`
--

INSERT INTO `cal_spends` (`s_id`, `s_name`, `s_price`, `s_date`, `s_user`) VALUES
(24, 'wiw', 78, '2015-9-15', 6),
(25, 'bulletrproof', 0, '2015-9-6', 6),
(26, 'wat', 34, '2015-9-7', 6),
(27, 'yv', 89, '2015-9-19', 6),
(28, 'dog', 34, '2015-9-15', 6),
(29, 'holy moley', 67, '2015-8-16', 6),
(30, 'wow', 78, '2015-8-16', 6);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `u_id` int(10) NOT NULL AUTO_INCREMENT,
  `u_username` varchar(255) NOT NULL,
  `u_password` varchar(255) NOT NULL,
  `u_name` varchar(255) NOT NULL,
  `u_email` varchar(255) NOT NULL,
  PRIMARY KEY (`u_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`u_id`, `u_username`, `u_password`, `u_name`, `u_email`) VALUES
(6, 'ben', 'ben', 'ben', 'ben');

-- --------------------------------------------------------

--
-- Table structure for table `wages`
--

CREATE TABLE IF NOT EXISTS `wages` (
  `w_id` int(10) NOT NULL AUTO_INCREMENT,
  `w_date` varchar(255) NOT NULL,
  `w_amount` varchar(255) NOT NULL,
  `w_user` int(10) NOT NULL,
  PRIMARY KEY (`w_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `wages`
--

INSERT INTO `wages` (`w_id`, `w_date`, `w_amount`, `w_user`) VALUES
(1, '2015-8', '3000', 6),
(2, '2015-7', '3452', 6),
(3, '2015-9', '1344', 6);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
