-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 20, 2024 at 07:00 PM
-- Server version: 10.11.7-MariaDB-cll-lve
-- PHP Version: 8.1.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `upagexy3_v64`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `balance` double(20,2) NOT NULL DEFAULT 0.00,
  `name` varchar(255) NOT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `salary_date` varchar(255) DEFAULT NULL,
  `type` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `balance`, `name`, `photo`, `email`, `email_verified_at`, `password`, `salary_date`, `type`, `phone`, `address`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 0.00, 'Md Admin', '/public/admin/assets/images/profile/1706650015HOx.png', 'admin@gmail.com', '2023-11-29 18:37:08', '$2y$10$YFivZ/n.EgZojjNLKSGYb.U3GGUaMhB.jo8FDPe68NREkDYMrgA6u', '2024-05-16', 'admin', '01600000000', 'sd', 'kPnBINdiZz92S0d5K5I0WCfsJxTptpahnI8UXUIcYIk3cFrrXkJezDjsvKIb', '2023-11-28 11:11:57', '2024-05-15 23:36:36');

-- --------------------------------------------------------

--
-- Table structure for table `admin_ledgers`
--

CREATE TABLE `admin_ledgers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `admin_id` bigint(20) UNSIGNED NOT NULL,
  `reason` varchar(255) NOT NULL,
  `perticulation` varchar(255) DEFAULT NULL,
  `amount` double NOT NULL DEFAULT 0,
  `debit` double NOT NULL DEFAULT 0,
  `credit` double NOT NULL DEFAULT 0,
  `status` enum('pending','approved','rejected','default') NOT NULL DEFAULT 'default',
  `date` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `bonuses`
--

CREATE TABLE `bonuses` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `bonus_name` varchar(255) NOT NULL,
  `counter` int(11) DEFAULT 0 COMMENT 'user get service count',
  `set_service_counter` int(11) NOT NULL,
  `code` varchar(255) NOT NULL,
  `winner` int(11) DEFAULT 0,
  `amount` double NOT NULL DEFAULT 0,
  `status` enum('active','inactive') NOT NULL DEFAULT 'inactive',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `bonuses`
--

INSERT INTO `bonuses` (`id`, `bonus_name`, `counter`, `set_service_counter`, `code`, `winner`, `amount`, `status`, `created_at`, `updated_at`) VALUES
(1, 'BONUS', 1, 100, 'TB-0000001', 7, 6, 'active', '2024-06-15 00:58:06', '2024-06-15 00:59:56');

-- --------------------------------------------------------

--
-- Table structure for table `bonus_ledgers`
--

CREATE TABLE `bonus_ledgers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `bonus_id` bigint(20) UNSIGNED NOT NULL,
  `amount` double(20,2) NOT NULL DEFAULT 0.00,
  `bonus_code` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `bonus_ledgers`
--

INSERT INTO `bonus_ledgers` (`id`, `user_id`, `bonus_id`, `amount`, `bonus_code`, `created_at`, `updated_at`) VALUES
(1, 6, 1, 6.00, 'TB-0000001', '2024-06-15 00:59:56', '2024-06-15 00:59:56');

-- --------------------------------------------------------

--
-- Table structure for table `checkins`
--

CREATE TABLE `checkins` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `date` varchar(255) NOT NULL,
  `amount` double(20,2) NOT NULL DEFAULT 0.00,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `checkins`
--

INSERT INTO `checkins` (`id`, `user_id`, `date`, `amount`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, '2024-05-14 00:04:02', 0.00, 'active', '2024-05-13 23:04:02', '2024-05-13 23:04:02'),
(3, 1, '2024-05-16 17:16:34', 10.00, 'active', '2024-05-15 16:16:34', '2024-05-15 16:16:34'),
(4, 4, '2024-06-05 16:00:28', 0.00, 'active', '2024-06-05 15:00:28', '2024-06-05 15:00:28'),
(5, 5, '2024-06-09 15:18:01', 0.00, 'active', '2024-06-09 14:18:01', '2024-06-09 14:18:01'),
(6, 6, '2024-06-15 01:21:53', 0.00, 'active', '2024-06-14 23:21:53', '2024-06-14 23:21:53'),
(7, 7, '2024-06-16 03:52:50', 0.00, 'active', '2024-06-16 01:52:50', '2024-06-16 01:52:50'),
(8, 8, '2024-06-16 05:01:14', 0.00, 'active', '2024-06-16 03:01:14', '2024-06-16 03:01:14'),
(9, 9, '2024-06-18 01:16:00', 0.00, 'active', '2024-06-17 23:16:00', '2024-06-17 23:16:00'),
(10, 10, '2024-06-18 01:18:41', 0.00, 'active', '2024-06-17 23:18:41', '2024-06-17 23:18:41'),
(11, 11, '2024-06-18 01:19:48', 0.00, 'active', '2024-06-17 23:19:48', '2024-06-17 23:19:48'),
(12, 12, '2024-06-20 04:55:43', 0.00, 'active', '2024-06-20 02:55:43', '2024-06-20 02:55:43');

-- --------------------------------------------------------

--
-- Table structure for table `commissions`
--

CREATE TABLE `commissions` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `task_id` int(11) DEFAULT NULL,
  `amount` double(20,2) NOT NULL DEFAULT 0.00,
  `date` varchar(255) DEFAULT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `token` varchar(255) DEFAULT NULL,
  `created_at` varchar(255) DEFAULT NULL,
  `updated_at` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `deposits`
--

CREATE TABLE `deposits` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `method_name` varchar(255) NOT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `order_id` varchar(255) NOT NULL,
  `transaction_id` varchar(255) NOT NULL,
  `amount` varchar(255) NOT NULL COMMENT 'User Deposit Amount',
  `final_amount` double(20,2) NOT NULL DEFAULT 0.00,
  `date` varchar(255) NOT NULL,
  `feedback` text DEFAULT NULL,
  `status` enum('pending','rejected','approved') NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `deposits`
--

INSERT INTO `deposits` (`id`, `user_id`, `method_name`, `photo`, `order_id`, `transaction_id`, `amount`, `final_amount`, `date`, `feedback`, `status`, `created_at`, `updated_at`) VALUES
(1, 4, 'TRC20', '/public/upload/payment/1714046581HUg.png', '97573', '1010dfdfdf', '500', 500.00, '25-04-2024 18:03:01', NULL, 'approved', '2024-04-25 17:03:01', '2024-04-25 17:05:34'),
(2, 4, 'TRC20', '/public/upload/payment/1714046901UXo.png', '76912', 'dfdf', '15000', 15000.00, '25-04-2024 18:08:24', NULL, 'approved', '2024-04-25 17:08:24', '2024-04-25 17:08:32'),
(3, 1, 'USDT', '/public/upload/payment/1717961588xIO.png', '44113', 'ghvcsgvcgsgcvsgcgsgcvgscvgsc', '67800', 67800.00, '10-06-2024 01:33:08', NULL, 'pending', '2024-06-10 00:33:08', '2024-06-10 00:33:08'),
(4, 1, 'USDT', '/public/upload/payment/1717961643eje.png', '79286', 'ghvcsgvcgsgcvsgcgsgcvgscvgsc', '67800', 67800.00, '10-06-2024 01:34:03', NULL, 'pending', '2024-06-10 00:34:03', '2024-06-10 00:34:03');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `funds`
--

CREATE TABLE `funds` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `package_id` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `title` longtext NOT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `commission` double(20,2) NOT NULL DEFAULT 0.00 COMMENT 'percent',
  `validity` bigint(20) NOT NULL,
  `minimum_invest` double(20,2) NOT NULL DEFAULT 0.00 COMMENT 'amount',
  `status` enum('upcoming','active') NOT NULL DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `funds`
--

INSERT INTO `funds` (`id`, `package_id`, `name`, `title`, `photo`, `commission`, `validity`, `minimum_invest`, `status`, `created_at`, `updated_at`) VALUES
(1, 4, 'Fund 1', 'Fund 1', '/public/upload/fund/1715447078TbV.png', 1000.00, 20, 500.00, 'active', '2024-05-11 22:04:38', '2024-05-11 23:15:20'),
(2, 24, 'Fund 2', 'Fund 2', '/public/upload/fund/1715447112Sum.png', 2000.00, 20, 1000.00, 'active', '2024-05-11 22:05:12', '2024-05-11 23:15:26');

-- --------------------------------------------------------

--
-- Table structure for table `fund_invests`
--

CREATE TABLE `fund_invests` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `fund_id` bigint(20) UNSIGNED NOT NULL,
  `validity_expired` varchar(255) NOT NULL,
  `price` double(20,2) NOT NULL DEFAULT 0.00,
  `return_amount` double(20,2) NOT NULL DEFAULT 0.00,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `fund_invests`
--

INSERT INTO `fund_invests` (`id`, `user_id`, `fund_id`, `validity_expired`, `price`, `return_amount`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 1, '2024-06-01 00:34:38', 500.00, 5500.00, 'active', '2024-05-11 23:34:38', '2024-05-11 23:34:38');

-- --------------------------------------------------------

--
-- Table structure for table `lucky_ledgers`
--

CREATE TABLE `lucky_ledgers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `draw_id` bigint(20) DEFAULT NULL,
  `amount` double(20,2) NOT NULL DEFAULT 0.00,
  `current_date` varchar(255) NOT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `packages`
--

CREATE TABLE `packages` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `photo` varchar(255) NOT NULL,
  `price` double NOT NULL,
  `validity` varchar(255) NOT NULL COMMENT 'count days',
  `commission_with_avg_amount` double NOT NULL DEFAULT 0 COMMENT 'user get average amount after validity',
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `is_default` enum('1','0') NOT NULL DEFAULT '0',
  `description` longtext DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `packages`
--

INSERT INTO `packages` (`id`, `name`, `title`, `photo`, `price`, `validity`, `commission_with_avg_amount`, `status`, `is_default`, `description`, `created_at`, `updated_at`) VALUES
(4, 'Mining vehicle', 'Mining vehicle', '/public/upload/package/1718713999rTP.jpg', 10, '30', 25, 'active', '0', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborumnumquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentiumoptio, eaque rerum! Provident similique accusantium nemo autem. Veritatisobcaecati tenetur iure eius earum ut molestias architecto voluptate aliquamnihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,', '2023-04-08 09:46:00', '2024-06-18 16:36:29'),
(24, 'Transport Minerals', 'Vip 1', '/public/upload/package/1718715433BDF.jpeg', 50, '45', 92, 'active', '0', 'Northern Star Resources welcomed the first of thirty-nine new CAT 793F haul trucks to our KCGM                     Operations in September, with the remaining trucks to arrive site between now and April 2022. The                     new fleet will offer improved visibility and comfort to Northern Star’s 200+ local Operators working                     in the Super Pit and supports KCGM’s Life of Mine to 2034.', '2024-01-07 16:59:51', '2024-06-18 16:57:13'),
(25, 'Abandoned Mine', 'Vip 2', '/public/upload/package/1718715659qn4.png', 150, '45', 205, 'active', '0', 'Northern Star Resources welcomed the first of thirty-nine new CAT 793F haul trucks to our KCGM                    Operations in September, with the remaining trucks to arrive site between now and April 2022. The                    new fleet will offer improved visibility and comfort to Northern Star’s 200+ local Operators working                    in the Super Pit and supports KCGM’s Life of Mine to 2034.', '2024-01-07 17:03:27', '2024-06-18 17:00:59'),
(26, 'Extraction Mining', 'Vip 3', '/public/upload/package/1718716149KNY.jpg', 300, '45', 405, 'active', '0', 'Northern Star Resources welcomed the first of thirty-nine new CAT 793F haul trucks to our KCGM                    Operations in September, with the remaining trucks to arrive site between now and April 2022. The                    new fleet will offer improved visibility and comfort to Northern Star’s 200+ local Operators working                    in the Super Pit and supports KCGM’s Life of Mine to 2034.', '2024-01-07 17:07:38', '2024-06-18 17:09:09'),
(27, 'ERA 5', 'Vip 4', '/public/upload/package/1715444898Hm6.png', 5000, '45', 26550, 'active', '0', 'Northern Star Resources welcomed the first of thirty-nine new CAT 793F haul trucks to our KCGM\n                    Operations in September, with the remaining trucks to arrive site between now and April 2022. The\n                    new fleet will offer improved visibility and comfort to Northern Star’s 200+ local Operators working\n                    in the Super Pit and supports KCGM’s Life of Mine to 2034.', '2024-01-09 18:21:25', '2024-05-11 21:28:18');

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payment_methods`
--

CREATE TABLE `payment_methods` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(32) NOT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `payment_methods`
--

INSERT INTO `payment_methods` (`id`, `name`, `photo`, `address`, `status`, `created_at`, `updated_at`) VALUES
(12, 'USDT', '/public/upload/setting/17179580544HM.png', 'ghvcsgvcgsgcvsgcgsgcvgscvgsc', 'active', '2023-09-15 10:48:03', '2024-06-09 23:34:14'),
(15, 'UTC2', '/public/upload/setting/1717958093hgq.png', 'ghvcsgvcgsgcvsgcgsgcvgscvgsc', 'active', '2023-11-02 09:50:36', '2024-06-09 23:34:53');

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `purchases`
--

CREATE TABLE `purchases` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `package_id` bigint(20) UNSIGNED NOT NULL,
  `amount` double NOT NULL DEFAULT 0,
  `daily_income` double(20,2) NOT NULL DEFAULT 0.00,
  `date` varchar(255) NOT NULL,
  `note` text DEFAULT NULL,
  `status` enum('active','inactive','pending') NOT NULL DEFAULT 'pending',
  `validity` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `purchases`
--

INSERT INTO `purchases` (`id`, `user_id`, `package_id`, `amount`, `daily_income`, `date`, `note`, `status`, `validity`, `created_at`, `updated_at`) VALUES
(2, 1, 4, 0, 10.00, '2024-05-12 22:54:50', NULL, 'active', '2025-05-11 22:54:50', '2024-05-11 21:54:50', '2024-05-11 21:54:50');

-- --------------------------------------------------------

--
-- Table structure for table `rebates`
--

CREATE TABLE `rebates` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `interest_commission1` double NOT NULL,
  `interest_commission2` double NOT NULL,
  `interest_commission3` double NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `rebates`
--

INSERT INTO `rebates` (`id`, `interest_commission1`, `interest_commission2`, `interest_commission3`, `created_at`, `updated_at`) VALUES
(1, 20, 3, 2, NULL, '2024-04-25 23:57:49');

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `withdraw_charge` int(11) NOT NULL DEFAULT 0 COMMENT 'percent',
  `minimum_withdraw` double(20,2) NOT NULL DEFAULT 0.00,
  `maximum_withdraw` double(20,2) NOT NULL DEFAULT 0.00,
  `w_time_status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `checkin` double(20,2) NOT NULL DEFAULT 0.00,
  `registration_bonus` double(20,2) NOT NULL DEFAULT 0.00,
  `total_member_register_reword` int(11) NOT NULL DEFAULT 0,
  `total_member_register_reword_amount` double(20,2) NOT NULL DEFAULT 0.00,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `withdraw_charge`, `minimum_withdraw`, `maximum_withdraw`, `w_time_status`, `checkin`, `registration_bonus`, `total_member_register_reword`, `total_member_register_reword_amount`, `created_at`, `updated_at`) VALUES
(1, 10, 10.00, 25000.00, 'active', 10.00, 20.00, 8, 5.00, '2022-01-18 11:03:22', '2024-05-03 15:40:01');

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `invest` double NOT NULL DEFAULT 0,
  `bonus` double NOT NULL DEFAULT 0,
  `team_size` bigint(20) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`id`, `invest`, `bonus`, `team_size`, `created_at`, `updated_at`) VALUES
(7, 15000, 300, 50, '2024-05-04 06:55:14', '2024-05-04 06:55:14'),
(8, 55000, 800, 102, '2024-05-04 06:55:37', '2024-05-04 06:55:37'),
(9, 200000, 1500, 150, '2024-05-04 06:56:19', '2024-05-04 06:56:19'),
(10, 400000, 3000, 500, '2024-05-04 06:57:05', '2024-05-04 06:57:05'),
(11, 1000000, 7000, 1500, '2024-05-04 06:57:58', '2024-05-04 06:57:58');

-- --------------------------------------------------------

--
-- Table structure for table `task_requests`
--

CREATE TABLE `task_requests` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `task_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `team_invest` double NOT NULL DEFAULT 0,
  `team_size` bigint(20) NOT NULL DEFAULT 0,
  `status` enum('pending','approved','rejected') NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `ref_by` varchar(255) DEFAULT NULL,
  `ref_id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `investor` int(11) NOT NULL DEFAULT 0,
  `realname` varchar(255) DEFAULT NULL,
  `phone_code` varchar(20) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `ip` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  `balance` double(20,2) NOT NULL DEFAULT 0.00,
  `receive_able_amount` double(20,2) NOT NULL DEFAULT 0.00,
  `reward` double(20,2) DEFAULT 0.00,
  `reward_received` enum('true','false') NOT NULL DEFAULT 'false',
  `gateway_method` varchar(50) DEFAULT NULL,
  `gateway_number` varchar(50) DEFAULT NULL,
  `withdraw_password` varchar(255) DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `ban_unban` enum('ban','unban') NOT NULL DEFAULT 'unban',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `active_member` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `ref_by`, `ref_id`, `name`, `investor`, `realname`, `phone_code`, `phone`, `ip`, `username`, `email`, `email_verified_at`, `password`, `type`, `balance`, `receive_able_amount`, `reward`, `reward_received`, `gateway_method`, `gateway_number`, `withdraw_password`, `remember_token`, `status`, `ban_unban`, `created_at`, `updated_at`, `active_member`) VALUES
(1, '60453169', '1593967209', 'MP DevTo', 1, NULL, '+880', '1933690444', '::1', 'uname1933690444', 'user916011715425705@gmail.com', NULL, '$2y$10$URd3ER1Wt4sLnHvrgOLkm.p7eXN1eQtdZl73wW9/cPN750VCe/jLq', NULL, 10.00, 10.00, 10.00, 'true', 'UTC2', '3PlfJM2enIx.Zw8Z8ZXs1RJIozjDH7R3C3Er3Fe', '123456', NULL, 'active', 'unban', '2024-05-11 16:08:25', '2024-06-10 00:51:50', 0),
(2, '1593967209', '9259799287', 'User74', 0, NULL, '+880', '1900208571', '::1', 'uname1900208571', 'user990871715619887@gmail.com', NULL, '$2y$10$ufHv0H4RtxGHO4D3qbb5tOfXOYeclhwazwDhfp8mbiiyKPi/r72ou', NULL, 20.00, 0.00, 0.00, 'false', NULL, NULL, '123456', NULL, 'active', 'unban', '2024-05-13 22:04:47', '2024-05-13 22:04:47', 0),
(3, '1593967209', '7356588365', 'User95', 0, NULL, '+880', '01600208571', '::1', 'uname01600208571', 'user833981715623442@gmail.com', NULL, '$2y$10$4BKCfcaPe2rTh80b1CHpROBKdX0TidbrWj8JXVOGife7nupBjdUYW', NULL, 30.00, 0.00, 0.00, 'false', NULL, NULL, '123456', NULL, 'active', 'unban', '2024-05-13 23:04:02', '2024-05-13 23:06:03', 0),
(4, '7618177527', '5558638860', 'User77', 0, NULL, '+880', '01896589658', '27.147.206.126', 'uname01896589658', 'user202141717581628@gmail.com', NULL, '$2y$10$BSB2JLEnaNDKwm.HOXw79uUk9YgOBnxn6yi7UFeQ6JYoh0LgKS0X2', NULL, 20.00, 0.00, 0.00, 'false', NULL, NULL, '444434', NULL, 'active', 'unban', '2024-06-05 15:00:28', '2024-06-05 15:00:28', 0),
(5, '1593967209', '8953333243', 'User29', 0, NULL, '+880', '6565656646', '103.111.226.93', 'uname6565656646', 'user344581717924681@gmail.com', NULL, '$2y$10$77FIjPixgaIDSkspjAZbHeGfkl.j4tURJxRcJk3danymfJw.BG/We', NULL, 20.00, 0.00, 0.00, 'false', NULL, NULL, '6565656646', NULL, 'active', 'unban', '2024-06-09 14:18:01', '2024-06-09 14:18:01', 0),
(6, '539778440', '1772759103', 'User78', 0, NULL, '+880', '12345678', '103.111.226.87', 'uname12345678', 'user262591718392913@gmail.com', NULL, '$2y$10$HhpXBaGQxzRSJTeMoLpWBOhXV21w8aXwgrNzS36O2O51cNObAItt6', NULL, 26.00, 0.00, 0.00, 'false', NULL, NULL, '12345678', NULL, 'active', 'unban', '2024-06-14 23:21:53', '2024-06-15 00:59:56', 0),
(7, '8858838663', '242045465', 'User27', 0, NULL, '+880', '648716944', '105.245.236.229', 'uname648716944', 'user572471718488370@gmail.com', NULL, '$2y$10$aKaZhvSBR92W8jK9DusMoeJDTDILK27dyM6kBZdca4sEsRBLzQk4y', NULL, 20.00, 0.00, 0.00, 'false', NULL, NULL, '23041991', NULL, 'active', 'unban', '2024-06-16 01:52:50', '2024-06-16 01:52:50', 0),
(8, '1971757293', '8727929119', 'User38', 0, NULL, '+880', '1122334455', '81.0.42.140', 'uname1122334455', 'user773391718492473@gmail.com', NULL, '$2y$10$lc3415YdL.YNXDbG/ee0GOZ0hkTBUY/Q6.IovrZm3kw8G8njKXgkK', NULL, 20.00, 0.00, 0.00, 'false', NULL, NULL, '123456', NULL, 'active', 'unban', '2024-06-16 03:01:14', '2024-06-16 03:01:14', 0),
(9, '5917936799', '2846468921', 'User38', 0, NULL, '+880', '085646718411', '120.188.82.148', 'uname085646718411', 'user830581718651760@gmail.com', NULL, '$2y$10$bCsyTDjRddPAsJDdqoDX9eiGyqHBsgIls3ztcI3bpOktEOJOPAHtC', NULL, 20.00, 0.00, 10.00, 'false', NULL, NULL, '123456', NULL, 'active', 'unban', '2024-06-17 23:16:00', '2024-06-17 23:19:48', 0),
(10, '2846468921', '8353748568', 'User23', 0, NULL, '+880', '7457457845', '37.111.219.224', 'uname7457457845', 'user593461718651921@gmail.com', NULL, '$2y$10$xcVC0fqhvXZ6E0ArhBpe6OzLUHT7tMb5qPP2WRduqkP8eu.VEeeN2', NULL, 20.00, 0.00, 0.00, 'false', NULL, NULL, '7457457845', NULL, 'active', 'unban', '2024-06-17 23:18:41', '2024-06-17 23:18:41', 0),
(11, '2846468921', '6921425226', 'User70', 0, NULL, '+880', '6789262929', '120.188.81.214', 'uname6789262929', 'user441031718651988@gmail.com', NULL, '$2y$10$QH1/.6/rDMeKcPjA7u2XKers61ULZ3fXNzT5anNELtYYex40ZqTiq', NULL, 20.00, 0.00, 0.00, 'false', NULL, NULL, '54321', NULL, 'active', 'unban', '2024-06-17 23:19:48', '2024-06-17 23:19:48', 0),
(12, '8124060998', '2963675754', 'User83', 0, NULL, '+880', '9988776655', '81.0.47.164', 'uname9988776655', 'user562521718837743@gmail.com', NULL, '$2y$10$wRNo7jpt3WDVmvLHsFxJ1Oi1AQizLZPNYrVs7Tw5.PQMjIINwEC1C', NULL, 20.00, 0.00, 0.00, 'false', NULL, NULL, '123456', NULL, 'active', 'unban', '2024-06-20 02:55:43', '2024-06-20 02:55:43', 0);

-- --------------------------------------------------------

--
-- Table structure for table `user_ledgers`
--

CREATE TABLE `user_ledgers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `get_balance_from_user_id` bigint(20) DEFAULT NULL,
  `reason` varchar(255) NOT NULL,
  `perticulation` varchar(255) DEFAULT NULL,
  `amount` double NOT NULL DEFAULT 0,
  `debit` double NOT NULL DEFAULT 0,
  `credit` double NOT NULL DEFAULT 0,
  `status` enum('pending','approved','rejected','default') NOT NULL DEFAULT 'default',
  `date` varchar(255) DEFAULT NULL,
  `step` varchar(20) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_ledgers`
--

INSERT INTO `user_ledgers` (`id`, `user_id`, `get_balance_from_user_id`, `reason`, `perticulation`, `amount`, `debit`, `credit`, `status`, `date`, `step`, `created_at`, `updated_at`) VALUES
(1, 1, NULL, 'my_commission', 'Package Commission added.', 10, 10, 0, 'approved', '11-05-2024 22:54', 'first', '2024-05-11 21:54:08', '2024-05-11 21:54:08'),
(2, 1, NULL, 'my_commission', 'Package Commission added.', 10, 10, 0, 'approved', '11-05-2024 22:54', 'first', '2024-05-11 21:54:50', '2024-05-11 21:54:50'),
(3, 1, NULL, 'invest_fund', 'Congratulations User71 Gifting Invest Success', 500, 0, 0, 'default', '2024-05-12 00:34:38', NULL, '2024-05-11 23:34:38', '2024-05-11 23:34:38'),
(4, 1, NULL, 'withdraw_request', 'withdraw request status is pending', 1000, 900, 0, 'pending', '12-05-2024 20:26', NULL, '2024-05-12 19:26:05', '2024-05-12 19:26:05'),
(5, 1, NULL, 'daily_income', 'Team reward received.', 5, 0, 5, 'approved', '2024-05-13 23:27:57', NULL, '2024-05-13 22:27:57', '2024-05-13 22:27:57'),
(6, 1, NULL, 'daily_income', 'Team reward received.', 10, 0, 10, 'approved', '2024-05-13 23:29:54', NULL, '2024-05-13 22:29:54', '2024-05-13 22:29:54'),
(7, 3, NULL, 'checkin', 'checkin commission received', 10, 10, 0, 'approved', '14-05-2024 00:06', NULL, '2024-05-13 23:06:03', '2024-05-13 23:06:03'),
(8, 1, NULL, 'checkin', 'checkin commission received', 10, 10, 0, 'approved', '15-05-2024 17:16', NULL, '2024-05-15 16:16:34', '2024-05-15 16:16:34'),
(9, 1, NULL, 'daily_income', 'ERA 1 Package commission', 10, 0, 10, 'approved', '2024-05-16 00:36:36', NULL, '2024-05-15 23:36:36', '2024-05-15 23:36:36'),
(10, 1, NULL, 'withdraw_request', 'withdraw request status is pending', 10, 9, 0, 'pending', '10-06-2024 01:51', NULL, '2024-06-10 00:51:50', '2024-06-10 00:51:50'),
(11, 6, NULL, 'Claim', 'Congratulations User78 you are successfully get your bonus.', 6, 6, 0, 'approved', '15-06-2024 02:59', NULL, '2024-06-15 00:59:56', '2024-06-15 00:59:56');

-- --------------------------------------------------------

--
-- Table structure for table `vip_sliders`
--

CREATE TABLE `vip_sliders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `photo` varchar(255) NOT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `page_type` enum('home_page','vip_page') NOT NULL DEFAULT 'home_page',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `vip_sliders`
--

INSERT INTO `vip_sliders` (`id`, `photo`, `status`, `page_type`, `created_at`, `updated_at`) VALUES
(11, '/public/upload/slider/1688711605xsK.jpg', 'active', 'home_page', '2023-07-05 01:06:16', '2023-07-07 04:33:25'),
(12, '/public/upload/slider/1688711639ObA.jpg', 'active', 'home_page', '2023-07-05 01:06:35', '2023-07-07 04:33:59');

-- --------------------------------------------------------

--
-- Table structure for table `withdrawals`
--

CREATE TABLE `withdrawals` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `method_name` varchar(255) DEFAULT NULL,
  `oid` varchar(255) DEFAULT NULL,
  `number` varchar(255) DEFAULT NULL,
  `amount` decimal(20,2) NOT NULL DEFAULT 0.00,
  `currency` varchar(40) NOT NULL,
  `rate` decimal(20,2) NOT NULL DEFAULT 0.00,
  `charge` decimal(20,2) NOT NULL DEFAULT 0.00,
  `trx` varchar(40) DEFAULT NULL,
  `final_amount` decimal(20,2) NOT NULL DEFAULT 0.00,
  `after_charge` decimal(20,2) NOT NULL DEFAULT 0.00,
  `withdraw_information` text DEFAULT NULL,
  `status` enum('pending','approved','rejected') NOT NULL DEFAULT 'pending' COMMENT '1=>success, 2=>pending, 3=>cancel,  ',
  `admin_feedback` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `withdrawals`
--

INSERT INTO `withdrawals` (`id`, `user_id`, `method_name`, `oid`, `number`, `amount`, `currency`, `rate`, `charge`, `trx`, `final_amount`, `after_charge`, `withdraw_information`, `status`, `admin_feedback`, `created_at`, `updated_at`) VALUES
(1, 1, 'nagad', 'W-43003174238425781', '123456101010', 1000.00, 'Bangladesh', 0.00, 100.00, NULL, 900.00, 0.00, NULL, 'pending', NULL, '2024-05-12 19:26:05', '2024-05-12 19:26:05'),
(2, 1, 'UTC2', 'W-79221913063585693', '3PlfJM2enIx.Zw8Z8ZXs1RJIozjDH7R3C3Er3Fe', 10.00, 'Bangladesh', 0.00, 1.00, NULL, 9.00, 0.00, NULL, 'pending', NULL, '2024-06-10 00:51:50', '2024-06-10 00:51:50');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `admins_email_unique` (`email`);

--
-- Indexes for table `admin_ledgers`
--
ALTER TABLE `admin_ledgers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bonuses`
--
ALTER TABLE `bonuses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bonus_ledgers`
--
ALTER TABLE `bonus_ledgers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `checkins`
--
ALTER TABLE `checkins`
  ADD PRIMARY KEY (`id`),
  ADD KEY `checkins_user_id_foreign` (`user_id`);

--
-- Indexes for table `commissions`
--
ALTER TABLE `commissions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `deposits`
--
ALTER TABLE `deposits`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `funds`
--
ALTER TABLE `funds`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `fund_invests`
--
ALTER TABLE `fund_invests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fund_invests_user_id_foreign` (`user_id`),
  ADD KEY `fund_invests_fund_id_foreign` (`fund_id`);

--
-- Indexes for table `lucky_ledgers`
--
ALTER TABLE `lucky_ledgers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `lucky_ledgers_user_id_foreign` (`user_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `packages`
--
ALTER TABLE `packages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `payment_methods`
--
ALTER TABLE `payment_methods`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `purchases`
--
ALTER TABLE `purchases`
  ADD PRIMARY KEY (`id`),
  ADD KEY `purchases_user_id_foreign` (`user_id`),
  ADD KEY `purchases_package_id_foreign` (`package_id`);

--
-- Indexes for table `rebates`
--
ALTER TABLE `rebates`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `task_requests`
--
ALTER TABLE `task_requests`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `user_ledgers`
--
ALTER TABLE `user_ledgers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vip_sliders`
--
ALTER TABLE `vip_sliders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `withdrawals`
--
ALTER TABLE `withdrawals`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `admin_ledgers`
--
ALTER TABLE `admin_ledgers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `bonuses`
--
ALTER TABLE `bonuses`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `bonus_ledgers`
--
ALTER TABLE `bonus_ledgers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `checkins`
--
ALTER TABLE `checkins`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `commissions`
--
ALTER TABLE `commissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `deposits`
--
ALTER TABLE `deposits`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `funds`
--
ALTER TABLE `funds`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `fund_invests`
--
ALTER TABLE `fund_invests`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `lucky_ledgers`
--
ALTER TABLE `lucky_ledgers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `packages`
--
ALTER TABLE `packages`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `payment_methods`
--
ALTER TABLE `payment_methods`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `purchases`
--
ALTER TABLE `purchases`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `rebates`
--
ALTER TABLE `rebates`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `task_requests`
--
ALTER TABLE `task_requests`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `user_ledgers`
--
ALTER TABLE `user_ledgers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `vip_sliders`
--
ALTER TABLE `vip_sliders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `withdrawals`
--
ALTER TABLE `withdrawals`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `checkins`
--
ALTER TABLE `checkins`
  ADD CONSTRAINT `checkins_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `lucky_ledgers`
--
ALTER TABLE `lucky_ledgers`
  ADD CONSTRAINT `lucky_ledgers_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
