-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 17, 2026 at 08:44 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `portfolio_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `achievements`
--

CREATE TABLE `achievements` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `date` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `achievements`
--

INSERT INTO `achievements` (`id`, `title`, `description`, `date`, `created_at`, `updated_at`) VALUES
(2, '200+ LeetCode Problems Solved', 'Successfully solved 200+ programming and algorithmic problems on LeetCode.\nStrengthened problem-solving skills through consistent practice of Data Structures & Algorithms (DSA).\nPracticed problems covering Arrays, Strings, Linked Lists, Stacks, Queues, Hashing, Trees, Recursion, Sorting, Searching, and Dynamic Programming.\nImproved ability to analyze problems and design optimized solutions with better time and space complexity.\nDeveloped stronger logical thinking, algorithmic reasoning, and debugging skills.\nBuilt consistency in competitive programming and technical interview preparation.\nApplied efficient coding practices to solve problems under time and memory constraints.', '2026-09-01', '2026-09-06 23:44:46', '2026-09-08 06:35:04'),
(3, 'AI & Software Engineering Integration', 'Combined software engineering principles with Artificial Intelligence and Machine Learning to explore intelligent, practical, and scalable application solutions.\nApplied Python, AI/ML concepts, APIs, and backend development to integrate intelligent capabilities into software applications.\nExplored Generative AI and LLM-based solutions for automation, intelligent assistance, and enhanced application functionality.\nFocused on transforming traditional software workflows into AI-powered and data-driven solutions.\nGained practical understanding of how AI can complement existing software systems to improve automation, efficiency, and user experience.', '2026-09-11', '2026-09-07 03:44:16', '2026-09-08 06:36:04');

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `certifications`
--

CREATE TABLE `certifications` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `issuer` varchar(255) NOT NULL,
  `issue_date` date NOT NULL,
  `certificate_link` varchar(255) DEFAULT NULL,
  `certificate_image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `certifications`
--

INSERT INTO `certifications` (`id`, `title`, `issuer`, `issue_date`, `certificate_link`, `certificate_image`, `created_at`, `updated_at`) VALUES
(3, 'Data Analysis Using Python', 'Samatrix Consulting Pvt Ltd', '2024-04-01', 'https://drive.google.com/file/d/1AaV6BL3WSX6wV9uuWnUtDYgHGXUzWN5i/view?usp=drivesdk', NULL, '2026-09-08 06:25:27', '2026-09-08 06:25:27'),
(4, 'Foundation to AI and Data Analytics', 'Samatrix Consulting Pvt Ltd', '2024-02-01', 'https://drive.google.com/file/d/1AgaFmQEijMhqsMmqSO2hl8BLsdGslws5/view?usp=drivesdk', NULL, '2026-09-08 06:28:05', '2026-09-08 06:28:05'),
(5, 'Statistics Using Python', 'Samatrix Consulting Pvt Ltd', '2023-12-01', 'https://drive.google.com/file/d/1A_7gY8KMBpQMVHDuVA-cSkCdRBRcAbWr/view?usp=drivesdk', NULL, '2026-09-08 06:29:21', '2026-09-08 06:29:21');

-- --------------------------------------------------------

--
-- Table structure for table `educations`
--

CREATE TABLE `educations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `institution_name` varchar(255) NOT NULL,
  `degree` varchar(255) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date DEFAULT NULL,
  `description` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `educations`
--

INSERT INTO `educations` (`id`, `institution_name`, `degree`, `start_date`, `end_date`, `description`, `created_at`, `updated_at`) VALUES
(3, 'Janta Inter College', '12th', '2021-07-01', '2022-04-01', '- Completed Class 12th (Senior Secondary) with Physics, Chemistry, and Mathematics (PCM).\n- Achieved an overall score of 75%.\n- Built a strong foundation in Mathematics, Physics, and Chemistry.\n- Developed analytical and problem-solving skills through mathematics and science-based learning.\n- Strengthened logical thinking and quantitative reasoning skills.\n- Built the academic foundation for pursuing B.Tech in Artificial Intelligence & Machine Learning.', '2026-09-07 02:49:12', '2026-09-08 05:53:48'),
(4, 'Quantum University', 'Bachelor of Technology', '2022-08-01', '2026-07-01', 'Completed a Bachelor of Technology (B.Tech) in Computer Science with Artificial Intelligence & Machine Learning, building a strong foundation in software development, AI, and modern computing technologies.\nStudied core concepts of Artificial Intelligence, Machine Learning, Deep Learning, and Data Science.\nDeveloped programming skills using Python, Java, and other modern technologies.\nGained practical knowledge of data structures, algorithms, databases, computer networks, and software engineering.\nWorked on academic and practical projects involving data analysis, machine learning models, and AI-based solutions.\nLearned data preprocessing, feature engineering, model training, testing, and evaluation.\nExplored neural networks and fundamental concepts of Deep Learning and Generative AI.\nApplied technical knowledge to solve real-world problems through software and AI-driven solutions.\nStrengthened skills in problem-solving, analytical thinking, programming, and application development.\nDeveloped an interest in combining software engineering with AI/ML to create intelligent and scalable applications.', '2026-09-08 05:49:09', '2026-09-08 05:58:27'),
(5, 'B.S.H.S School', '10th', '2019-04-01', '2020-03-01', '- Completed Class 10th (Secondary Education) with an overall score of 80%.\n- Built a strong foundation in Mathematics, Science, and core academic subjects.\n- Developed logical thinking, problem-solving, and analytical skills.\n- Strengthened fundamental concepts that supported further studies in Science and Technology.', '2026-09-08 05:56:46', '2026-09-08 05:56:46');

-- --------------------------------------------------------

--
-- Table structure for table `experiences`
--

CREATE TABLE `experiences` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `company_name` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `description` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `experiences`
--

INSERT INTO `experiences` (`id`, `company_name`, `role`, `start_date`, `end_date`, `description`, `created_at`, `updated_at`) VALUES
(5, 'Kush It World', 'Junior Software Developer', '2026-07-02', '2027-06-25', 'Full Stack Web Development – Laravel, PHP, MySQL, React.js, REST API, Postman\n- Working as a Junior Software Developer building and maintaining production-grade full stack web applications using Laravel\n(back-end), PHP, MySQL, and React.js (front-end) in a professional team environment.\n– Designed and developed RESTful API endpoints (GET, POST, PUT, DELETE) for ERP system modules using Laravel –\nimplementing Eloquent ORM relationships, request validation, and structured JSON responses consumed by the front-end.\n– Implemented role-based access control (RBAC) using Laravel middleware and policies, securing module-level access across 3\nuser tiers (Admin, Manager, Staff) within the ERP system.\n– Optimized MySQL database queries with indexing, eager loading, and JOIN restructuring – reducing average API response\ntime by ∼35% across high-traffic ERP data endpoints.\n– Performed comprehensive API testing using Postman – created collections, environment variables, and automated test scripts\nensuring all endpoints met functional requirements before production deployment.\n– Collaborated in an agile development team using Git (version control) with feature-branch workflow and pull request reviews\n– maintaining clean, reviewable commit history across all development sprints.\n– Integrated Laravel authentication (Sanctum token-based and session-based) for secure API access and CSRF protection across\nall web routes in the application.', '2026-09-08 05:24:09', '2026-09-08 05:52:42'),
(6, 'CodSoft (Remote)', 'Aartificial Intelligence', '2024-07-10', '2024-08-10', '- Completed a one-month Artificial Intelligence internship with hands-on exposure to AI and Machine Learning concepts.\n- Developed and implemented AI/ML solutions using Python for practical problem-solving.\n- Worked with data preprocessing, data analysis, feature engineering, model training, and model evaluation.\n- Applied Machine Learning algorithms to build and evaluate predictive models.\n- Gained practical understanding of the AI development lifecycle, from data preparation to model evaluation.\n- Performed testing, debugging, and optimization to improve model performance.\n- Worked on practical AI projects that strengthened problem-solving and analytical skills.\n- Gained a foundation in Artificial Intelligence, Machine Learning, and Python-based development.\n- Explored how AI can be integrated into real-world applications and automation workflows.', '2026-09-08 05:29:40', '2026-09-08 05:29:40'),
(7, 'Samatrix Consulting Pvt Ltd', 'Data Analyst', '2025-06-23', '2025-07-21', 'Analyzed real-world datasets using Python, Pandas, NumPy, and SQL to identify trends, patterns, and key insights.\nPerformed data cleaning and preprocessing, including handling missing values, duplicates, and inconsistent data.\nConducted Exploratory Data Analysis (EDA) to understand datasets and identify meaningful relationships.\nCreated data visualizations and interactive dashboards to communicate insights effectively.\nUsed SQL queries for data extraction, filtering, aggregation, joins, and analysis.\n- Applied statistical and analytical techniques to support data-driven decision-making.\n- Identified important KPIs, trends, and performance indicators from analyzed data.\n- Transformed raw data into structured, actionable insights for business and operational use.\n- Documented findings and presented analytical results in a clear and understandable format.\n- Used analytical thinking to convert business problems into data-driven solutions.', '2026-09-08 05:38:16', '2026-09-08 05:38:16');

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
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `is_read` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `name`, `email`, `message`, `is_read`, `created_at`, `updated_at`) VALUES
(2, 'Rahul Jain', 'rahuljain323@gmail.com', 'This side Rahul Jain and I am impressed from your portfolio and I want to design our company software like your portfolio.', 1, '2026-09-03 03:48:43', '2026-09-07 04:22:34'),
(3, 'jatin', 'jatin@gmail.com', 'please call me', 0, '2026-09-07 05:30:43', '2026-09-07 05:30:43');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2026_08_22_103137_create_profile_info_table', 1),
(5, '2026_08_22_103249_create_skills_table', 1),
(6, '2026_08_22_103351_create_experiences_table', 1),
(7, '2026_08_22_103626_create_services_table', 1),
(8, '2026_08_22_103713_create_certifications_table', 1),
(9, '2026_08_22_103746_create_achievements_table', 1),
(10, '2026_08_22_103850_create_messages_table', 1),
(11, '2026_08_22_103931_create_social_profiles_table', 1),
(12, '2026_08_22_105332_create_educations_table', 1),
(13, '2026_08_22_105700_create_projects_table', 1),
(14, '2026_09_03_052641_create_personal_access_tokens_table', 2),
(15, '2026_09_07_113129_rename_level_to_category_in_skills_table', 3);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` text NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(3, 'App\\Models\\User', 1, 'admin-token', '5cf2117ce6ec070c277a8240a70b654a77680c8bbe008b2c23faa9907b5c6c5c', '[\"*\"]', NULL, NULL, '2026-09-04 10:07:47', '2026-09-04 10:07:47'),
(4, 'App\\Models\\User', 1, 'admin-token', 'a008e2b6da905465a3565d3faf0640e42caea9dc440e31c074d2d9788de259fe', '[\"*\"]', NULL, NULL, '2026-09-04 10:12:52', '2026-09-04 10:12:52'),
(5, 'App\\Models\\User', 1, 'admin-token', 'b3629f052126edea6b4a0719fd2b05281bdc52bbbf4c59290c0514afd965d88d', '[\"*\"]', NULL, NULL, '2026-09-04 10:13:05', '2026-09-04 10:13:05'),
(6, 'App\\Models\\User', 1, 'admin-token', '2ee89d416991d9bcd74e5f8549226be4c71dcffaa8d8b3b83b911231946756a2', '[\"*\"]', NULL, NULL, '2026-09-04 10:14:22', '2026-09-04 10:14:22'),
(7, 'App\\Models\\User', 1, 'admin-token', 'd4a6b89933b688dea0c959be23433615010b6473c535144e39310e931360a2f7', '[\"*\"]', NULL, NULL, '2026-09-04 10:14:32', '2026-09-04 10:14:32'),
(8, 'App\\Models\\User', 1, 'admin-token', '3f2101c17ee154b9783c603005da1edecffa0ef5a57c855d590de3e47b94a02a', '[\"*\"]', NULL, NULL, '2026-09-04 23:00:48', '2026-09-04 23:00:48'),
(9, 'App\\Models\\User', 1, 'admin-token', '622b275c296e4e084ae63c84aef98dfdbac234952a15abe00ab3307de5a4aff1', '[\"*\"]', NULL, NULL, '2026-09-04 23:03:37', '2026-09-04 23:03:37'),
(10, 'App\\Models\\User', 1, 'admin-token', 'e4556e384d44e61205b30de810f40f1dd008ea0518f36fa9dd01701d62e494f7', '[\"*\"]', NULL, NULL, '2026-09-04 23:08:35', '2026-09-04 23:08:35'),
(11, 'App\\Models\\User', 1, 'admin-token', '555b036373102864a30c1a737130a1f2c731e0166a9f48b0ae2f369cd444f55c', '[\"*\"]', NULL, NULL, '2026-09-04 23:08:41', '2026-09-04 23:08:41'),
(12, 'App\\Models\\User', 1, 'admin-token', '78a72ef7d64fd3f6fbfe1181cff040f612e9551e28d79aa98d42cc1c55027d9b', '[\"*\"]', NULL, NULL, '2026-09-04 23:08:50', '2026-09-04 23:08:50'),
(13, 'App\\Models\\User', 1, 'admin-token', '7c9a71d9257407e9485c456268f167b9ae468fbee413d51705c38e179e5745bf', '[\"*\"]', NULL, NULL, '2026-09-04 23:09:19', '2026-09-04 23:09:19'),
(14, 'App\\Models\\User', 1, 'admin-token', '2b36a85a46a5c50b60ce8dff2deb51fa38b835f70ce632b9c5dcbeed0700f361', '[\"*\"]', NULL, NULL, '2026-09-04 23:10:59', '2026-09-04 23:10:59'),
(15, 'App\\Models\\User', 1, 'admin-token', '61babe77db9aee85b7c4bdb8b61ad1873a7dd690b96aedf3a4f2e3e31e1bc998', '[\"*\"]', NULL, NULL, '2026-09-04 23:11:08', '2026-09-04 23:11:08'),
(16, 'App\\Models\\User', 1, 'admin-token', '2cd47bd6a212be93f4418f8c3b2027ffe37070aaa3d1c7599489822cb1dda6a8', '[\"*\"]', NULL, NULL, '2026-09-04 23:12:09', '2026-09-04 23:12:09'),
(17, 'App\\Models\\User', 1, 'admin-token', '8463f9488c89045132ac636ec7cc6632a375e1da5e723907bed43a313a0ab8f4', '[\"*\"]', NULL, NULL, '2026-09-04 23:14:18', '2026-09-04 23:14:18'),
(18, 'App\\Models\\User', 1, 'admin-token', '89749a61603043d2c5e09b027e3516f611f0b0b06337c05e4e302de40a17fa67', '[\"*\"]', NULL, NULL, '2026-09-04 23:16:58', '2026-09-04 23:16:58'),
(19, 'App\\Models\\User', 1, 'admin-token', 'd5b45a611b33aadceaea6208874391c2187a25093a2556179eb966d4087638d6', '[\"*\"]', '2026-09-09 05:48:12', NULL, '2026-09-04 23:19:09', '2026-09-09 05:48:12'),
(20, 'App\\Models\\User', 1, 'admin-token', 'd052a2c7555625a13517ace1336de909d6a3eff25c8ffa43d17449937fc9203f', '[\"*\"]', '2026-09-05 07:17:00', NULL, '2026-09-05 07:14:53', '2026-09-05 07:17:00'),
(21, 'App\\Models\\User', 1, 'admin-token', '8abb5d7be697e45b5ed2d2f8650ce1f36a616845a276a3e0211c094c552072bd', '[\"*\"]', '2026-09-06 23:57:12', NULL, '2026-09-06 23:43:46', '2026-09-06 23:57:12');

-- --------------------------------------------------------

--
-- Table structure for table `profile_info`
--

CREATE TABLE `profile_info` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `bio` text NOT NULL,
  `profile_image` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `resume_path` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `profile_info`
--

INSERT INTO `profile_info` (`id`, `full_name`, `title`, `bio`, `profile_image`, `email`, `phone`, `location`, `resume_path`, `created_at`, `updated_at`) VALUES
(1, 'Vansh Kamboj', 'Junior software developer building clean, functional web apps.', 'I’m a Software Developer with a strong focus on Java, PHP, Python, backend development, databases, APIs, and modern web technologies. I build reliable, scalable, and user-focused applications, with hands-on experience across application development, database management, API integration, testing, debugging, and performance optimization.\r\n\r\nAlongside software development, I’m actively exploring Artificial Intelligence, Machine Learning, and Generative AI, with an interest in integrating AI-powered features into real-world applications. I enjoy using AI to automate workflows, improve efficiency, enhance user experiences, and solve complex problems.\r\n\r\nI’m passionate about writing clean and maintainable code, learning emerging technologies, and turning ideas into practical software solutions. My goal is to combine strong software engineering fundamentals with AI capabilities to build intelligent, efficient, and scalable applications.', 'profile/7IfS8RpVDxjxppX3kumiSb8XVHEBfiE7mq6sEXp1.jpg', 'vanshkamboj2303@gmail.com', '6395050643', 'Noida, Uttar Pradesh', 'resume/HizY6fQGIxRZz33qdvtJvxtXG6rmliDmbiBBdw2z.pdf', '2026-08-26 06:44:18', '2026-09-09 05:48:13');

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `short_description` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `project_link` varchar(255) DEFAULT NULL,
  `is_featured` tinyint(1) NOT NULL DEFAULT 0,
  `display_order` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `title`, `short_description`, `description`, `image`, `project_link`, `is_featured`, `display_order`, `created_at`, `updated_at`) VALUES
(1, 'Personal Developer Portfolio', 'A modern, responsive developer portfolio showcasing my technical skills, professional experience, education, certifications, and projects, with a focus on software development and Artificial Intelligence.', '- Designed and developed a responsive personal portfolio website to showcase my professional profile and technical expertise.\r\n- Created dedicated sections for About Me, Skills, Experience, Education, Certifications, and Projects.\r\n- Highlighted expertise in Java, PHP, Python, SQL, Backend Development, Web Technologies, and Artificial Intelligence.\r\n- Added detailed project showcases with technologies, features, and development contributions.\r\n- Implemented a clean and professional UI/UX with responsive layouts for desktop and mobile devices.\r\n- Integrated interactive elements and smooth navigation to improve the overall user experience.\r\n- Structured the application with maintainable and reusable components.\r\n- Optimized the portfolio for performance, responsiveness, accessibility, and professional presentation.\r\n- Focused on presenting my software development experience alongside my knowledge of AI, Machine Learning, and Generative AI.', 'projects/V0mQ1lUmRpbtZWvhywoflZkBOhRLJx2dvVKIGYbV.png', 'https://github.com/vanshkamboj047', 1, 1, '2026-08-26 04:08:24', '2026-09-08 06:05:39'),
(2, 'Dynamic News Portal', 'A dynamic web-based news portal that allows users to explore the latest news, categories, articles, and updates through a responsive and user-friendly interface.', '- Developed a dynamic news portal for publishing, managing, and displaying news articles.\r\n- Implemented multiple news categories such as Technology, Business, Sports, Entertainment, and World News.\r\n- Developed functionality for creating, updating, deleting, and managing news articles.\r\n- Implemented user authentication and role-based access for administrators and content managers.\r\n- Added search and category-based filtering to help users quickly find relevant news.\r\n- Designed a responsive interface compatible with desktop, tablet, and mobile devices.\r\n- Integrated a backend database for managing articles, categories, users, and content.\r\n- Implemented dynamic news feeds so newly published content is automatically reflected on the website.\r\n- Added features such as featured news, latest news, article details, and related articles.\r\n- Focused on performance, clean UI/UX, database management, and maintainable code.\r\n- Used technologies such as Java/PHP, SQL, HTML, CSS, JavaScript, and REST APIs.', 'projects/LclItEAfpwu90yK2EY58W2HdHr9T7PO5Pe7YjGdY.png', 'https://newssite.site.je', 1, 2, '2026-09-07 04:11:02', '2026-09-08 06:09:01'),
(3, 'ERP Management System', 'A comprehensive ERP system designed for a battery manufacturing company to manage inventory, production, sales, procurement, finance, employees, and business operations through a centralized platform.', '- Developed a centralized ERP solution to manage and streamline battery manufacturing and business operations.\r\n- Designed modules for Inventory, Procurement, Sales, Production, Customers, Suppliers, Employees, and Reporting.\r\n- Implemented inventory management for tracking raw materials, battery components, finished goods, stock movements, and warehouses.\r\n- Managed the complete procure-to-stock workflow, including purchase requests, purchase orders, goods receipt, and supplier management.\r\n- Supported production workflows including material consumption, production planning, work orders, and finished-goods entry.\r\n- Implemented batch/lot and serial number tracking to improve product traceability.\r\n- Developed sales workflows covering quotations, sales orders, dispatch, invoicing, and customer management.\r\n- Created dashboards and reports for monitoring stock levels, purchases, sales, production, and overall business performance.\r\n- Implemented role-based access control to ensure users can access only the modules and operations relevant to their responsibilities.\r\n- Integrated business processes and data into a single centralized database, reducing manual data entry and improving operational visibility.\r\n- Designed workflows with a focus on data accuracy, scalability, security, and maintainability.\r\n- Worked with Java/PHP, SQL, REST APIs, HTML, CSS, JavaScript, and database-driven application architecture.\r\n- Focused on building an ERP system that can support end-to-end operations of a battery manufacturing organization.', 'projects/Rg89BFGod8nmn90sR5D7DWOISZMSFdTfUmQgwqri.png', NULL, 1, 3, '2026-09-08 06:14:40', '2026-09-08 06:14:40');

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `title`, `description`, `icon`, `created_at`, `updated_at`) VALUES
(2, 'Custom Software Development', 'Design and develop reliable, scalable, and business-focused software solutions based on specific requirements. From understanding business logic and designing databases to implementing backend functionality, APIs, authentication, and complete application workflows, I focus on building clean, maintainable, and efficient software.', 'service_icon/WabW2STfZJgrnoSXEAkKoRHjgmWRALtLsTCbrnzI.png', '2026-09-05 07:17:02', '2026-09-08 06:19:00'),
(6, 'Bug Fixing & Technical Problem Solving', 'Identify, analyze, and resolve software issues across applications, APIs, databases, and user interfaces. I troubleshoot errors, investigate root causes, fix functional and technical problems, and optimize existing code to improve application stability, performance, and reliability.', 'service_icon/ECfS6ABV5PnhWUNcJgATa7u1Hf9nNTCb599qpHKx.jpg', '2026-09-07 03:03:12', '2026-09-08 06:20:02'),
(8, 'Web Application Development', 'Build modern, responsive, and user-friendly web applications tailored to business and user requirements. I work across frontend and backend development, database integration, API connectivity, authentication, and dynamic functionality to deliver secure, scalable, and high-performance web solutions.', 'service_icon/X5fKkEazPYlhDByDc6C3jJtvVejuThH4XvanTEIy.jpg', '2026-09-07 03:03:14', '2026-09-08 06:20:31');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('0s3Zl6C0oNO0AXZlzPwEmujNBLKUF9pKZyZOYzvF', NULL, '127.0.0.1', 'PostmanRuntime/7.56.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiSktaOUNqQ1NHR0FISVh0TEJwUm0zZG1JTHZCNE9DZ3BKUzNOemNjTyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1787499887),
('7kRWOj27hNtRf9ECQfwQokSGhkJ6NVpBmPAsUWdo', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Code/1.134.0 Chrome/148.0.7778.280 Electron/42.8.1 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiRXpEQnhKVnFSREpRcmM4aHlTVzZQS3VwZ3ZmZ2VzYkxTMzZCdTVsRCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1787493777),
('ED3E3oHsGYdmr413qds2rx58PnJzYv7arATL7e97', NULL, '127.0.0.1', 'PostmanRuntime/7.56.1', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoid2VrTXI4dndtdUxpbGNmNzJYcjEwTnFpNnY5ZW40WDZBYlVLZ3p2dyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1788171190),
('jNICSAX8K5j1AzbSrd3pkSkm4mxMMSTsDmhSWPL5', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoidlUzV1pZeVRVc0xkSkN2ZjRWeEtSbjRzdW4yNnYzS2M3WEVFVU5vQiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1787632392),
('MArqk12DRNKirEfT5ko1G7Hq0vQY0tilAvFAf7nX', NULL, '127.0.0.1', 'PostmanRuntime/7.56.1', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZVh0NkZIVjhYSm5UMUdIOExOYVJoY1NzZVYyaFpjVjF3ZmJSZnBHMSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1787739677),
('nnWQkhvj7wrC7rp9dWcqv8y9Se0eHD2KJL1Ss5al', NULL, '127.0.0.1', 'PostmanRuntime/7.56.1', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoibWFRRDhlMUl0emJpWTdOQ21qUFpVMnFBcmFmOW9HdW5FbmFFZnh6VSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1787632684),
('q79CQcEYjXnh5ZYmd7iCYTlwTTEhqgSuuinvhWp0', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiUzc1amxnQ0NUQlFwejdSSTJ2SlBhNXRWSHoxRWZlbjU0SkI3REJaRCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1787732157),
('QLlT0nHlNheu4mflN9NmBNGvrb1EtyO0kUJZ9QP2', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiSFNOR04yWjhDVkhVSVlGdm5SVnlKeXhtQnJZSTRyYmgycng0dVpYeSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1787830027),
('rKUIYlJZKfVKEG0ERouUWnerzzXEBahEBd3ynq40', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiTDBhSkxvd0FTd0tNVzJxM1pNZ0duWnJiS0V2bGI1TmllY0RUZXo1SyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1787494098),
('vEoXYpk7X2nWw4quin9QjCmDFShEBKWh6GI5h10M', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Code/1.134.0 Chrome/148.0.7778.280 Electron/42.8.1 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoianh0MzRCU2NmMURDSVFVZjRBMGJJZUhOcHgzblVHSVhJNHFWSzFCTCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1787547685),
('yH8qY5rYNqerXgbKq18my59kkpwZNupeMfzNqZAI', NULL, '127.0.0.1', 'PostmanRuntime/7.56.1', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiMmY5YWpVWThNcWJJamlpM09zZzAyNTdmczZqYTBuNTdTRjhBeXBWciI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1788331676);

-- --------------------------------------------------------

--
-- Table structure for table `skills`
--

CREATE TABLE `skills` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `skills`
--

INSERT INTO `skills` (`id`, `name`, `category`, `created_at`, `updated_at`) VALUES
(8, 'Laravel', 'Frameworks', '2026-09-07 06:23:15', '2026-09-07 06:23:15'),
(9, 'React.js', 'Frameworks', '2026-09-07 06:24:24', '2026-09-07 06:24:24'),
(10, 'Bootstrap', 'Frameworks', '2026-09-07 06:25:27', '2026-09-07 06:25:27'),
(11, 'Tailwind CSS', 'Frameworks', '2026-09-07 06:25:59', '2026-09-07 06:25:59'),
(12, 'PHP', 'Back-End & API Development', '2026-09-07 06:27:50', '2026-09-07 06:27:50'),
(13, 'RESTful API Design', 'Back-End & API Development', '2026-09-07 06:28:49', '2026-09-07 06:28:49'),
(14, 'MVC Aarchitecture', 'Back-End & API Development', '2026-09-07 06:29:35', '2026-09-07 06:29:35'),
(15, 'Eloquent ORM', 'Back-End & API Development', '2026-09-07 06:30:04', '2026-09-07 06:30:04'),
(16, 'Blade Templating', 'Back-End & API Development', '2026-09-07 06:31:42', '2026-09-07 06:31:42'),
(17, 'CRUD Operations', 'Back-End & API Development', '2026-09-07 06:32:04', '2026-09-07 06:32:04'),
(18, 'RBAC', 'Back-End & API Development', '2026-09-07 06:32:24', '2026-09-07 06:32:24'),
(19, 'Middleware', 'Back-End & API Development', '2026-09-07 06:32:50', '2026-09-07 06:32:50'),
(20, 'React.js', 'Front-End Development', '2026-09-07 06:46:09', '2026-09-07 06:46:09'),
(21, 'HTML5', 'Front-End Development', '2026-09-07 06:46:10', '2026-09-07 06:46:10'),
(22, 'CSS3', 'Front-End Development', '2026-09-07 06:46:11', '2026-09-07 06:46:11'),
(23, 'JavaScript(ES6+)', 'Front-End Development', '2026-09-07 06:46:12', '2026-09-07 06:46:12'),
(24, 'jQuery', 'Front-End Development', '2026-09-07 06:46:13', '2026-09-07 06:46:13'),
(25, 'Responsive Web Design', 'Front-End Development', '2026-09-07 06:46:13', '2026-09-07 06:46:13'),
(26, 'Cross-Browser Compatibility', 'Front-End Development', '2026-09-07 06:46:14', '2026-09-07 06:46:14'),
(27, 'Component-Based Architecture', 'Front-End Development', '2026-09-07 06:46:15', '2026-09-07 06:46:15'),
(28, 'MySQL', 'Databases', '2026-09-07 06:48:25', '2026-09-07 06:48:25'),
(29, 'Schema Design', 'Databases', '2026-09-07 06:48:26', '2026-09-07 06:48:26'),
(30, 'Indexing', 'Databases', '2026-09-07 06:48:27', '2026-09-07 06:48:27'),
(31, 'Joins', 'Databases', '2026-09-07 06:48:28', '2026-09-07 06:48:28'),
(32, 'Foreign Keys', 'Databases', '2026-09-07 06:48:29', '2026-09-07 06:48:29'),
(33, 'Query Optimization', 'Databases', '2026-09-07 06:48:30', '2026-09-07 06:48:30'),
(34, 'Migration', 'Databases', '2026-09-07 06:48:30', '2026-09-07 06:48:30'),
(35, 'Seeders', 'Databases', '2026-09-07 06:48:31', '2026-09-07 06:48:31'),
(39, 'Postman', 'API Testing & Tools', '2026-09-07 06:51:46', '2026-09-07 06:51:46'),
(40, 'Git', 'API Testing & Tools', '2026-09-07 06:51:46', '2026-09-07 06:51:46'),
(41, 'GitHub (Vesion Control)', 'API Testing & Tools', '2026-09-07 06:51:47', '2026-09-07 06:51:47'),
(42, 'VS Code', 'API Testing & Tools', '2026-09-07 06:51:48', '2026-09-07 06:51:48'),
(43, 'npm', 'API Testing & Tools', '2026-09-07 06:51:49', '2026-09-07 06:51:49'),
(44, 'Node.js', 'API Testing & Tools', '2026-09-07 06:51:50', '2026-09-07 06:51:50'),
(45, 'Laravel Debugbar', 'API Testing & Tools', '2026-09-07 06:51:51', '2026-09-07 06:51:51'),
(46, 'Laravel Sanctum', 'Authentication & Security', '2026-09-07 06:54:05', '2026-09-07 06:54:05'),
(47, 'JWT', 'Authentication & Security', '2026-09-07 06:54:06', '2026-09-07 06:54:06'),
(48, 'Session Management', 'Authentication & Security', '2026-09-07 06:54:07', '2026-09-07 06:54:07'),
(49, 'CSRF Protection', 'Authentication & Security', '2026-09-07 06:54:08', '2026-09-07 06:54:08'),
(50, 'Input Validation', 'Authentication & Security', '2026-09-07 06:54:09', '2026-09-07 06:54:09'),
(51, 'Role-Based Access Control', 'Authentication & Security', '2026-09-07 06:54:10', '2026-09-07 06:54:10'),
(52, 'Eager Loading', 'Web Performance', '2026-09-07 06:55:28', '2026-09-07 06:55:28'),
(53, 'Query Optimization', 'Web Performance', '2026-09-07 06:55:29', '2026-09-07 06:55:29'),
(54, 'Caching', 'Web Performance', '2026-09-07 06:55:30', '2026-09-07 06:55:30'),
(55, 'Code Splitting', 'Web Performance', '2026-09-07 06:55:31', '2026-09-07 06:55:31'),
(56, 'Debugging', 'Web Performance', '2026-09-07 06:55:32', '2026-09-07 06:55:32'),
(57, 'Browser DevTools', 'Web Performance', '2026-09-07 06:55:33', '2026-09-07 06:55:33'),
(58, 'PHP', 'Programming Languages', '2026-09-07 06:56:32', '2026-09-07 06:56:32'),
(59, 'JavaScript', 'Programming Languages', '2026-09-07 06:56:32', '2026-09-07 06:56:32'),
(60, 'Python', 'Programming Languages', '2026-09-07 06:56:33', '2026-09-07 06:56:33'),
(61, 'Java', 'Programming Languages', '2026-09-07 06:56:34', '2026-09-07 06:56:34'),
(62, 'C Programming', 'Programming Languages', '2026-09-07 06:56:35', '2026-09-07 06:56:35'),
(63, 'Agile', 'Methodologies', '2026-09-07 06:57:47', '2026-09-07 06:57:47'),
(64, 'Feature-Branch Git Workflow', 'Methodologies', '2026-09-07 06:57:48', '2026-09-07 06:57:48'),
(65, 'Pull Request Reviews', 'Methodologies', '2026-09-07 06:57:49', '2026-09-07 06:57:49'),
(66, 'Debugging', 'Methodologies', '2026-09-07 06:57:50', '2026-09-07 06:57:50'),
(67, 'Unit Testing Basics', 'Methodologies', '2026-09-07 06:57:51', '2026-09-07 06:57:51'),
(68, 'Data Structures & Algorithms', 'Relevant Coursework', '2026-09-07 06:59:01', '2026-09-07 06:59:01'),
(69, 'OOPs', 'Relevant Coursework', '2026-09-07 06:59:02', '2026-09-07 06:59:02'),
(70, 'DBMS', 'Relevant Coursework', '2026-09-07 06:59:03', '2026-09-07 06:59:03'),
(71, 'Software Engineering', 'Relevant Coursework', '2026-09-07 06:59:04', '2026-09-07 06:59:04'),
(72, 'Problem Solving', 'Soft Skills', '2026-09-07 07:00:04', '2026-09-07 07:00:04'),
(73, 'Self-Learning', 'Soft Skills', '2026-09-07 07:00:05', '2026-09-07 07:00:05'),
(74, 'Adaptability', 'Soft Skills', '2026-09-07 07:00:06', '2026-09-07 07:00:06'),
(75, 'Team Collaboration', 'Soft Skills', '2026-09-07 07:00:07', '2026-09-07 07:00:07'),
(76, 'Attention to Detail', 'Soft Skills', '2026-09-07 07:00:08', '2026-09-07 07:00:08');

-- --------------------------------------------------------

--
-- Table structure for table `social_profiles`
--

CREATE TABLE `social_profiles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `platform_name` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `social_profiles`
--

INSERT INTO `social_profiles` (`id`, `platform_name`, `url`, `icon`, `created_at`, `updated_at`) VALUES
(2, 'Github', 'https://github.com/VanshKamboj047', 'socialProfile_icon/CxSzJebHZUg4FYq8mtrfqNcuGqlKHsalbzfjLIxU.png', '2026-09-06 23:57:13', '2026-09-08 06:49:05'),
(3, 'Whatsapp', 'https://wa.me/916395050643', 'socialProfile_icon/dbD8wBQj29QVRHCIVXmGZ2CxdTBKZ5suQlP9S0o3.png', '2026-09-07 03:49:01', '2026-09-08 06:46:30'),
(5, 'LinkedIn', 'https://www.linkedin.com/in/vansh-kamboj-283b59247/', 'socialProfile_icon/KORXfkQuAvmj99JpQs8KUDlFkeBpRZVLcyTfe8nE.png', '2026-09-08 06:44:12', '2026-09-08 06:44:12'),
(6, 'LeetCode', 'https://leetcode.com/u/vanshkamboj047/', 'socialProfile_icon/zxpQTJ5sdT02aS6JyYMdF1e41GNnxJsxvBHUinuv.png', '2026-09-08 06:51:12', '2026-09-08 06:51:12');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Vansh', 'vanshkamboj2303@gmail.com', NULL, '$2y$12$G6Y3EypEsxL/zwGG6SlyQu4upfxjjGHDIB8Of9c.GRPVun3iB3dya', NULL, '2026-09-03 00:05:59', '2026-09-03 00:05:59');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `achievements`
--
ALTER TABLE `achievements`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_expiration_index` (`expiration`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_locks_expiration_index` (`expiration`);

--
-- Indexes for table `certifications`
--
ALTER TABLE `certifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `educations`
--
ALTER TABLE `educations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `experiences`
--
ALTER TABLE `experiences`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  ADD KEY `personal_access_tokens_expires_at_index` (`expires_at`);

--
-- Indexes for table `profile_info`
--
ALTER TABLE `profile_info`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `skills`
--
ALTER TABLE `skills`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `social_profiles`
--
ALTER TABLE `social_profiles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `achievements`
--
ALTER TABLE `achievements`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `certifications`
--
ALTER TABLE `certifications`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `educations`
--
ALTER TABLE `educations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `experiences`
--
ALTER TABLE `experiences`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `profile_info`
--
ALTER TABLE `profile_info`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `skills`
--
ALTER TABLE `skills`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT for table `social_profiles`
--
ALTER TABLE `social_profiles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
