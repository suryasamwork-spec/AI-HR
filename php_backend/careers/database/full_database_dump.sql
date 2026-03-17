-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: caldim_careers
-- ------------------------------------------------------
-- Server version	10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin_users`
--

DROP TABLE IF EXISTS `admin_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin_users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `full_name` varchar(120) NOT NULL,
  `username` varchar(60) NOT NULL,
  `email` varchar(160) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` enum('superadmin','hr','recruiter') DEFAULT 'hr',
  `is_active` tinyint(1) DEFAULT 1,
  `last_login` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_users`
--

LOCK TABLES `admin_users` WRITE;
/*!40000 ALTER TABLE `admin_users` DISABLE KEYS */;
INSERT INTO `admin_users` VALUES (1,'Super Admin','admin','admin@caldimengineering.com','$2y$12$h4U49RCr2GiqGBymXeyFt.xKf6pZmxQDNWh4Q8T3eiiFeWcLwPvni','superadmin',1,'2026-03-12 03:45:35','2026-03-10 11:07:50'),(2,'Secondary Admin','admin2','admin2@caldimengineering.com','$2y$10$8unE8mzoZYaE1u7V58bx5e34Hjxgd.UTDoJRyjTvIqGNuVTeCCbsG','hr',1,'2026-03-11 04:25:11','2026-03-11 04:24:25');
/*!40000 ALTER TABLE `admin_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `applications`
--

DROP TABLE IF EXISTS `applications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `applications` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `job_id` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `cover_letter` text DEFAULT NULL,
  `current_location` varchar(255) DEFAULT NULL,
  `current_ctc` varchar(50) DEFAULT NULL,
  `expected_ctc` varchar(50) DEFAULT NULL,
  `notice_period` varchar(50) DEFAULT NULL,
  `total_experience` varchar(50) DEFAULT NULL,
  `portfolio_link` varchar(255) DEFAULT NULL,
  `resume_path` varchar(350) NOT NULL,
  `resume_name` varchar(200) NOT NULL,
  `status` enum('applied','shortlisted','interview','offered','rejected','hired') DEFAULT 'applied',
  `admin_notes` text DEFAULT NULL,
  `applied_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_unique_application` (`job_id`,`user_id`),
  KEY `idx_status` (`status`),
  KEY `idx_applied_at` (`applied_at`),
  KEY `idx_user_id` (`user_id`),
  KEY `idx_job_id` (`job_id`),
  CONSTRAINT `applications_ibfk_1` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`id`) ON DELETE CASCADE,
  CONSTRAINT `applications_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `applications`
--

LOCK TABLES `applications` WRITE;
/*!40000 ALTER TABLE `applications` DISABLE KEYS */;
INSERT INTO `applications` VALUES (1,1,2,'',NULL,NULL,NULL,NULL,NULL,NULL,'uploads/resumes/2_1773217234_520406c8.pdf','Surya__M_Cv.pdf','rejected','better luk next time','2026-03-11 08:20:34','2026-03-11 09:26:28'),(2,5,2,'',NULL,NULL,NULL,NULL,NULL,NULL,'uploads/resumes/2_1773217447_70ac84a8.pdf','Surya__M_Cv.pdf','hired','good to see you in next round','2026-03-11 08:24:07','2026-03-11 10:02:11'),(3,7,3,'',NULL,NULL,NULL,NULL,NULL,NULL,'uploads/resumes/3_1773221035_cbeb1419.pdf','Surya__M_Cv.pdf','applied',NULL,'2026-03-11 09:23:55','2026-03-11 09:23:55'),(4,6,3,'',NULL,NULL,NULL,NULL,NULL,NULL,'uploads/resumes/3_1773221102_a84d93ac.pdf','Surya__M_Cv.pdf','applied',NULL,'2026-03-11 09:25:02','2026-03-11 09:25:02'),(5,3,3,'6',NULL,NULL,NULL,NULL,NULL,NULL,'uploads/resumes/3_1773221607_218668ad.pdf','Surya__M_Cv.pdf','shortlisted','add','2026-03-11 09:33:27','2026-03-11 09:34:03'),(6,7,4,'','tamilnadu,india','5.5','8.5','Immediate','3.5','','uploads/resumes/4_1773228987_61314929.pdf','Surya__M_Cv.pdf','offered','we are glad to announce','2026-03-11 11:36:27','2026-03-11 11:38:27'),(7,6,4,'','tamilnadu,india','5.5','8.5','Immediate','3.5','','uploads/resumes/4_1773289187_8cf17b36.pdf','Surya__M_Cv.pdf','interview',NULL,'2026-03-12 04:19:47','2026-03-12 04:20:14');
/*!40000 ALTER TABLE `applications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departments`
--

DROP TABLE IF EXISTS `departments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `departments` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(120) NOT NULL,
  `description` text DEFAULT NULL,
  `icon` varchar(80) DEFAULT 'fas fa-briefcase',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departments`
--

LOCK TABLES `departments` WRITE;
/*!40000 ALTER TABLE `departments` DISABLE KEYS */;
INSERT INTO `departments` VALUES (1,'Civil Engineering','Tekla Structural Detailing, SDS2, Rebar Detailing & Coordination','fas fa-hard-hat','2026-03-10 11:07:50'),(2,'Software Services','End-to-End Software Development and Maintenance','fas fa-laptop-code','2026-03-10 11:07:50'),(3,'Human Resources','Talent Acquisition, Employee Relations','fas fa-users','2026-03-10 11:07:50'),(4,'Operations','Project Management, Quality Assurance','fas fa-cogs','2026-03-10 11:07:50');
/*!40000 ALTER TABLE `departments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jobs` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `department_id` int(10) unsigned NOT NULL,
  `title` varchar(200) NOT NULL,
  `slug` varchar(220) NOT NULL,
  `location` varchar(120) NOT NULL,
  `job_type` enum('full-time','part-time','contract','internship','remote') DEFAULT 'full-time',
  `experience_min` tinyint(3) unsigned DEFAULT 0 COMMENT 'Years',
  `experience_max` tinyint(3) unsigned DEFAULT 0 COMMENT 'Years (0 = no upper limit)',
  `salary_range` varchar(80) DEFAULT NULL COMMENT 'e.g. 4-8 LPA',
  `description` text NOT NULL,
  `requirements` text NOT NULL,
  `responsibilities` text DEFAULT NULL,
  `skills_required` varchar(500) DEFAULT NULL COMMENT 'Comma-separated',
  `openings` tinyint(3) unsigned DEFAULT 1,
  `is_featured` tinyint(1) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `deadline` date DEFAULT NULL,
  `created_by` int(10) unsigned DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `created_by` (`created_by`),
  KEY `idx_active_featured` (`is_active`,`is_featured`),
  KEY `idx_department` (`department_id`),
  KEY `idx_location` (`location`),
  KEY `idx_job_type` (`job_type`),
  FULLTEXT KEY `idx_search` (`title`,`description`,`skills_required`),
  CONSTRAINT `jobs_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`),
  CONSTRAINT `jobs_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
INSERT INTO `jobs` VALUES (1,1,'Senior Tekla Structural Detailer','senior-tekla-structural-detailer','Mumbai, India','full-time',4,8,'6–12 LPA','We are seeking an experienced Senior Tekla Structural Detailer to join our Civil Engineering team. You will work on complex structural steel projects for international clients.','B.E./B.Tech in Civil Engineering or equivalent. 4+ years hands-on Tekla Structures experience. Proficiency in steel connection design. Strong knowledge of AISC, IS codes.','Prepare accurate Tekla models and shop drawings. Coordinate with engineering teams. Review and approve junior detailer work. Manage project timelines.','Tekla Structures, AutoCAD, Steel Detailing, Shop Drawings, AISC, IS Codes',3,1,1,'2026-04-30',1,'2026-03-10 11:07:50','2026-03-10 11:07:50'),(2,1,'SDS2 Structural Detailer','sds2-structural-detailer','Pune, India','full-time',2,5,'4–8 LPA','Join our growing team as an SDS2 Detailer. Work on North American steel construction projects delivering high-quality fabrication drawings.','B.E./Diploma in Civil Engineering. 2+ years SDS2 experience. Understanding of AISC standards and connection types.','Create accurate SDS2 models and erection drawings. Coordinate with project engineers. Ensure quality standards on deliverables.','SDS2, Steel Detailing, AutoCAD, AISC, Erection Drawings',2,1,1,'2026-04-15',1,'2026-03-10 11:07:50','2026-03-10 11:07:50'),(3,1,'Rebar Detailing Engineer','rebar-detailing-engineer','Hyderabad, India','full-time',1,4,'3–6 LPA','We are hiring Rebar Detailing Engineers to work on reinforced concrete structures for residential, commercial, and industrial projects.','B.E./Diploma in Civil Engineering. 1+ year rebar detailing experience. Knowledge of BBS (Bar Bending Schedule). Familiarity with IS 456, ACI 318.','Prepare reinforcement detailing drawings & BBS. Coordinate with site engineers. Ensure compliance with structural drawings.','Rebar Detailing, BBS, AutoCAD, IS 456, ACI 318, Revit (preferred)',4,0,1,'2026-05-31',1,'2026-03-10 11:07:50','2026-03-10 11:07:50'),(4,2,'Full Stack Developer','full-stack-developer','Remote / Bangalore, India','full-time',2,6,'5–10 LPA','Join our Software Services team to build end-to-end web applications for engineering and industrial clients. Work with modern technologies in an agile environment.','B.Tech in CS/IT or equivalent. 2+ years full-stack experience. Proficiency in PHP/Laravel or Node.js + React/Vue. MySQL/PostgreSQL knowledge.','Design and develop web applications. Write clean, maintainable code. Collaborate with cross-functional teams. Participate in code reviews.','PHP, Laravel, React, JavaScript, MySQL, REST API, Git',2,1,1,'2026-04-20',1,'2026-03-10 11:07:50','2026-03-10 11:07:50'),(5,2,'Software Trainee (Internship)','software-trainee-internship','Remote','internship',0,1,'10,000–15,000 per month','A 6-month paid internship program for fresh graduates and final-year students passionate about software development. Get hands-on experience building real products.','Pursuing/completed B.Tech/MCA. Basic knowledge of HTML, CSS, JavaScript. Eager to learn and grow.','Assist in front-end/back-end development. Participate in daily standups. Complete assigned modules under mentorship.','HTML, CSS, JavaScript, PHP basics, MySQL basics',5,1,1,'2026-06-30',1,'2026-03-10 11:07:50','2026-03-10 11:07:50'),(6,2,'AI Engineer','ai-engineer-1773219167','Hosur','full-time',0,0,'15-25k','the employee must good at ai fundamentals','need to complete a degree','','',1,1,1,NULL,1,'2026-03-11 08:52:47','2026-03-11 08:52:47'),(7,2,'AI analyst','ai-analyst-1773220183','Hosur','full-time',5,6,'10lpa','experienced ai analyst','good at ai core','','',4,1,1,NULL,1,'2026-03-11 09:08:28','2026-03-11 09:09:43'),(8,2,'data analyst','data-analyst-1773229293','Hosur','full-time',1,5,'10lpa','need to be well develper and need to good in ai','complted betch','','',2,1,1,'2026-03-11',1,'2026-03-11 11:41:30','2026-03-11 11:41:33');
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `full_name` varchar(160) NOT NULL,
  `email` varchar(160) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `password_hash` varchar(255) NOT NULL,
  `profile_picture` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `email_verified` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `idx_email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'suryatest','surya@123gmail.com','91 345678987','$2y$12$3iNE7gOrf8E.aBwr0X./y.nk51m5S3IQ2zE.F3eczkGsGJYJVUnXy',NULL,1,0,'2026-03-11 04:33:53','2026-03-11 04:41:50'),(2,'suryanew1','suryasamwork@gmail.com','+91 8220622844','$2y$12$PjDPx.d0T7ZrB2O1h5RpXuKh9kY9DnBkMCysDH0qzynfffdjp5WsG',NULL,1,0,'2026-03-11 08:20:16','2026-03-11 08:32:01'),(3,'suryatest2','suryatest2@gmail.com','1234567890','$2y$12$dgk9dBGMuHhofq8H2YX0aeKLLRbknqL98o6UWHDVl0bVW4eDA1i.e',NULL,1,0,'2026-03-11 09:22:39','2026-03-11 09:22:39'),(4,'jhon','jhon@gmail.com','','$2y$12$d137gVsn/Xxr3lB5MIdL2OoIZWIjFIxZEt6TU/wL2IEGIPAFFpkdG',NULL,1,0,'2026-03-11 11:35:40','2026-03-12 03:45:02');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-03-12 10:34:15
