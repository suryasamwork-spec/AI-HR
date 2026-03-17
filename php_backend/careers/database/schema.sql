-- ============================================================
-- Caldim Engineering – Careers Portal Database Schema
-- MySQL 8+  |  Engine: InnoDB  |  Charset: utf8mb4
-- ============================================================

CREATE DATABASE IF NOT EXISTS caldim_careers
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE caldim_careers;

-- ============================================================
-- 1. DEPARTMENTS
-- ============================================================
CREATE TABLE IF NOT EXISTS departments (
    id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(120) NOT NULL,
    description TEXT,
    icon        VARCHAR(80)  DEFAULT 'fas fa-briefcase',
    created_at  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ============================================================
-- 2. ADMIN USERS
-- ============================================================
CREATE TABLE IF NOT EXISTS admin_users (
    id            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    full_name     VARCHAR(120) NOT NULL,
    username      VARCHAR(60)  NOT NULL UNIQUE,
    email         VARCHAR(160) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role          ENUM('superadmin','hr','recruiter') DEFAULT 'hr',
    is_active     TINYINT(1)   DEFAULT 1,
    last_login    TIMESTAMP    NULL,
    created_at    TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ============================================================
-- 3. USERS (Candidates)
-- ============================================================
CREATE TABLE IF NOT EXISTS users (
    id              INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    full_name       VARCHAR(160) NOT NULL,
    email           VARCHAR(160) NOT NULL UNIQUE,
    phone           VARCHAR(20),
    password_hash   VARCHAR(255) NOT NULL,
    profile_picture VARCHAR(255) DEFAULT NULL,
    is_active       TINYINT(1)   DEFAULT 1,
    email_verified  TINYINT(1)   DEFAULT 0,
    created_at      TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email)
) ENGINE=InnoDB;

-- ============================================================
-- 4. JOBS
-- ============================================================
CREATE TABLE IF NOT EXISTS jobs (
    id              INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    department_id   INT UNSIGNED NOT NULL,
    title           VARCHAR(200) NOT NULL,
    slug            VARCHAR(220) NOT NULL UNIQUE,
    location        VARCHAR(120) NOT NULL,
    job_type        ENUM('full-time','part-time','contract','internship','remote') DEFAULT 'full-time',
    experience_min  TINYINT UNSIGNED DEFAULT 0 COMMENT 'Years',
    experience_max  TINYINT UNSIGNED DEFAULT 0 COMMENT 'Years (0 = no upper limit)',
    salary_range    VARCHAR(80)  DEFAULT NULL COMMENT 'e.g. 4-8 LPA',
    description     TEXT         NOT NULL,
    requirements    TEXT         NOT NULL,
    responsibilities TEXT        DEFAULT NULL,
    skills_required  VARCHAR(500) DEFAULT NULL COMMENT 'Comma-separated',
    openings        TINYINT UNSIGNED DEFAULT 1,
    is_featured     TINYINT(1)   DEFAULT 0,
    is_active       TINYINT(1)   DEFAULT 1,
    deadline        DATE         DEFAULT NULL,
    created_by      INT UNSIGNED DEFAULT NULL,
    created_at      TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE RESTRICT,
    FOREIGN KEY (created_by)    REFERENCES admin_users(id) ON DELETE SET NULL,

    INDEX idx_active_featured  (is_active, is_featured),
    INDEX idx_department       (department_id),
    INDEX idx_location         (location),
    INDEX idx_job_type         (job_type),
    FULLTEXT idx_search        (title, description, skills_required)
) ENGINE=InnoDB;

-- ============================================================
-- 5. APPLICATIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS applications (
    id           INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    job_id       INT UNSIGNED NOT NULL,
    user_id      INT UNSIGNED NOT NULL,
    cover_letter TEXT         DEFAULT NULL,
    resume_path  VARCHAR(350) NOT NULL,
    resume_name  VARCHAR(200) NOT NULL,
    status       ENUM('applied','shortlisted','interview','offered','rejected','hired')
                 DEFAULT 'applied',
    admin_notes  TEXT         DEFAULT NULL,
    applied_at   TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
    updated_at   TIMESTAMP    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (job_id)  REFERENCES jobs(id)  ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,

    UNIQUE  idx_unique_application (job_id, user_id),
    INDEX   idx_status             (status),
    INDEX   idx_applied_at         (applied_at),
    INDEX   idx_user_id            (user_id),
    INDEX   idx_job_id             (job_id)
) ENGINE=InnoDB;

-- ============================================================
-- SEED DATA
-- ============================================================

-- Departments
INSERT INTO departments (name, description, icon) VALUES
('Civil Engineering', 'Tekla Structural Detailing, SDS2, Rebar Detailing & Coordination', 'fas fa-hard-hat'),
('Software Services', 'End-to-End Software Development and Maintenance', 'fas fa-laptop-code'),
('Human Resources', 'Talent Acquisition, Employee Relations', 'fas fa-users'),
('Operations', 'Project Management, Quality Assurance', 'fas fa-cogs');

-- Admin User  (password: Admin@1234)
INSERT INTO admin_users (full_name, username, email, password_hash, role) VALUES
('Super Admin', 'admin', 'admin@caldimengineering.com',
 '$2y$12$G/PkstjpBcRPBr4T8.N/6uq2xQJkn3Yd7FJn0Hm9lHWPPjO.mQMYO', 'superadmin');

-- Sample Jobs
INSERT INTO jobs
  (department_id, title, slug, location, job_type, experience_min, experience_max,
   salary_range, description, requirements, responsibilities, skills_required,
   openings, is_featured, is_active, deadline, created_by)
VALUES
(1, 'Senior Tekla Structural Detailer', 'senior-tekla-structural-detailer',
 'Mumbai, India', 'full-time', 4, 8,
 '6–12 LPA',
 'We are seeking an experienced Senior Tekla Structural Detailer to join our Civil Engineering team. You will work on complex structural steel projects for international clients.',
 'B.E./B.Tech in Civil Engineering or equivalent. 4+ years hands-on Tekla Structures experience. Proficiency in steel connection design. Strong knowledge of AISC, IS codes.',
 'Prepare accurate Tekla models and shop drawings. Coordinate with engineering teams. Review and approve junior detailer work. Manage project timelines.',
 'Tekla Structures, AutoCAD, Steel Detailing, Shop Drawings, AISC, IS Codes',
 3, 1, 1, '2026-04-30', 1),

(1, 'SDS2 Structural Detailer', 'sds2-structural-detailer',
 'Pune, India', 'full-time', 2, 5,
 '4–8 LPA',
 'Join our growing team as an SDS2 Detailer. Work on North American steel construction projects delivering high-quality fabrication drawings.',
 'B.E./Diploma in Civil Engineering. 2+ years SDS2 experience. Understanding of AISC standards and connection types.',
 'Create accurate SDS2 models and erection drawings. Coordinate with project engineers. Ensure quality standards on deliverables.',
 'SDS2, Steel Detailing, AutoCAD, AISC, Erection Drawings',
 2, 1, 1, '2026-04-15', 1),

(1, 'Rebar Detailing Engineer', 'rebar-detailing-engineer',
 'Hyderabad, India', 'full-time', 1, 4,
 '3–6 LPA',
 'We are hiring Rebar Detailing Engineers to work on reinforced concrete structures for residential, commercial, and industrial projects.',
 'B.E./Diploma in Civil Engineering. 1+ year rebar detailing experience. Knowledge of BBS (Bar Bending Schedule). Familiarity with IS 456, ACI 318.',
 'Prepare reinforcement detailing drawings & BBS. Coordinate with site engineers. Ensure compliance with structural drawings.',
 'Rebar Detailing, BBS, AutoCAD, IS 456, ACI 318, Revit (preferred)',
 4, 0, 1, '2026-05-31', 1),

(2, 'Full Stack Developer', 'full-stack-developer',
 'Remote / Bangalore, India', 'full-time', 2, 6,
 '5–10 LPA',
 'Join our Software Services team to build end-to-end web applications for engineering and industrial clients. Work with modern technologies in an agile environment.',
 'B.Tech in CS/IT or equivalent. 2+ years full-stack experience. Proficiency in PHP/Laravel or Node.js + React/Vue. MySQL/PostgreSQL knowledge.',
 'Design and develop web applications. Write clean, maintainable code. Collaborate with cross-functional teams. Participate in code reviews.',
 'PHP, Laravel, React, JavaScript, MySQL, REST API, Git',
 2, 1, 1, '2026-04-20', 1),

(2, 'Software Trainee (Internship)', 'software-trainee-internship',
 'Remote', 'internship', 0, 1,
 '10,000–15,000 per month',
 'A 6-month paid internship program for fresh graduates and final-year students passionate about software development. Get hands-on experience building real products.',
 'Pursuing/completed B.Tech/MCA. Basic knowledge of HTML, CSS, JavaScript. Eager to learn and grow.',
 'Assist in front-end/back-end development. Participate in daily standups. Complete assigned modules under mentorship.',
 'HTML, CSS, JavaScript, PHP basics, MySQL basics',
 5, 1, 1, '2026-06-30', 1);
