-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 12, 2024 at 10:04 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `DB_Petshop`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id_category` int(11) NOT NULL,
  `name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id_category`, `name`) VALUES
(1, 'Food'),
(2, 'Dog'),
(3, 'CATO'),
(9, 'Randy');

-- --------------------------------------------------------

--
-- Table structure for table `order_detail`
--

CREATE TABLE `order_detail` (
  `id_order` int(11) NOT NULL,
  `id_product` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `price` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order_dp`
--

CREATE TABLE `order_dp` (
  `id_order` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `state` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id_products` int(11) NOT NULL,
  `product_name` varchar(150) NOT NULL,
  `description` varchar(255) NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `stock` int(11) NOT NULL,
  `image` blob DEFAULT NULL,
  `important` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id_products`, `product_name`, `description`, `price`, `stock`, `image`, `important`) VALUES
(4, 'RUFOASDAD', 'RASADS', 123, 111, NULL, 1),
(5, 'xfdxfaaaaaaaaaapdo', 'xxfdxfd', 123, 2, NULL, 0),
(7, 'xdxdxd', 'xdxdxdx', 123, 22, NULL, 0),
(8, 'asdsss', 'xdxdxdxxxxx', 123, 22, NULL, 0),
(9, 'asdsss', 'xdxdxdxxxxx', 123, 22, NULL, 0),
(10, 'asdsss', 'xdxdxdxxxxx', 123, 22, NULL, 0),
(12, 'Pablo', 'XDDD', 121, 111, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `product_category`
--

CREATE TABLE `product_category` (
  `id_products` int(11) NOT NULL,
  `id_category` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_category`
--

INSERT INTO `product_category` (`id_products`, `id_category`) VALUES
(12, 1),
(12, 2);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(60) NOT NULL,
  `email` varchar(120) NOT NULL,
  `password` varchar(100) NOT NULL,
  `birth_date` date NOT NULL,
  `address` varchar(200) DEFAULT NULL,
  `phone_number` int(11) DEFAULT NULL,
  `rol` int(11) NOT NULL,
  `active` tinyint(1) NOT NULL,
  `card_number` int(11) DEFAULT NULL,
  `expire_date` date DEFAULT NULL,
  `last_connection` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id_user`, `first_name`, `last_name`, `email`, `password`, `birth_date`, `address`, `phone_number`, `rol`, `active`, `card_number`, `expire_date`, `last_connection`) VALUES
(1, 'Nohel', 'Estrada', 'nohel@gmail.com', '1234', '2003-11-06', 'Santa Rosa', 46692419, 3, 1, 252525, '2027-09-01', '2024-09-28'),
(9, 'Prueba', 'Prueba', 'Prueba@gmail.com', '1234', '2003-11-06', 'XD', 654654, 3, 0, 126564, '2029-05-01', '2024-09-28'),
(10, 'Juan', 'Gonzalez', 'Juan@gmail.com', '1234', '2003-11-06', 'XD', 231321, 2, 1, 2313213, '2025-02-01', '2024-10-25'),
(21, 'Juan', 'Gonzalez', 'Juan2@gmail.com', '1234', '2003-11-06', 'XDDD', 231321, 2, 1, 1231321, '2028-10-05', '2024-10-03'),
(29, 'Nohel', 'Estrada', 'nohel.ep03@gmail.com', 'bebe1234', '2003-11-06', 'Santa Rosa', 46692419, 1, 1, 1231321, '2028-08-01', '2024-09-28'),
(30, 'Pablo', 'Flores', 'rfloresm@unis.edu.gt', '1234', '2003-10-05', NULL, NULL, 2, 1, NULL, NULL, '2024-09-28');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id_category`);

--
-- Indexes for table `order_detail`
--
ALTER TABLE `order_detail`
  ADD KEY `id_order` (`id_order`),
  ADD KEY `id_product` (`id_product`);

--
-- Indexes for table `order_dp`
--
ALTER TABLE `order_dp`
  ADD PRIMARY KEY (`id_order`),
  ADD KEY `id_user` (`id_user`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id_products`);

--
-- Indexes for table `product_category`
--
ALTER TABLE `product_category`
  ADD KEY `id_product` (`id_products`),
  ADD KEY `product_category_ibfk_2` (`id_category`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id_category` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `order_dp`
--
ALTER TABLE `order_dp`
  MODIFY `id_order` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id_products` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `order_detail`
--
ALTER TABLE `order_detail`
  ADD CONSTRAINT `order_detail_ibfk_1` FOREIGN KEY (`id_order`) REFERENCES `order_dp` (`id_order`),
  ADD CONSTRAINT `order_detail_ibfk_2` FOREIGN KEY (`id_product`) REFERENCES `products` (`id_products`);

--
-- Constraints for table `order_dp`
--
ALTER TABLE `order_dp`
  ADD CONSTRAINT `order_dp_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`);

--
-- Constraints for table `product_category`
--
ALTER TABLE `product_category`
  ADD CONSTRAINT `product_category_ibfk_1` FOREIGN KEY (`id_products`) REFERENCES `products` (`id_products`),
  ADD CONSTRAINT `product_category_ibfk_2` FOREIGN KEY (`id_category`) REFERENCES `category` (`id_category`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
