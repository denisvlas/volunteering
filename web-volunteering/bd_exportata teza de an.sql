CREATE DATABASE  IF NOT EXISTS `voluntariat(1)` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `voluntariat(1)`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: voluntariat(1)
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `ID_admin` int NOT NULL AUTO_INCREMENT,
  `nume_admin` varchar(50) DEFAULT NULL,
  `prenume_admin` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`ID_admin`),
  UNIQUE KEY `nume_admin` (`nume_admin`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `categorii`
--

DROP TABLE IF EXISTS `categorii`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorii` (
  `ID_categorie` int NOT NULL AUTO_INCREMENT,
  `nume` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`ID_categorie`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `donatii`
--

DROP TABLE IF EXISTS `donatii`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donatii` (
  `ID_donatie` int NOT NULL AUTO_INCREMENT,
  `ID_voluntariat` int DEFAULT NULL,
  `donatii` varchar(500) DEFAULT NULL,
  `cantitate` varchar(150) DEFAULT NULL,
  `data` date DEFAULT (curdate()),
  PRIMARY KEY (`ID_donatie`),
  KEY `ID_voluntariat` (`ID_voluntariat`),
  CONSTRAINT `donatii_ibfk_1` FOREIGN KEY (`ID_voluntariat`) REFERENCES `voluntariat` (`ID_voluntariat`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `donatii_anonime`
--

DROP TABLE IF EXISTS `donatii_anonime`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donatii_anonime` (
  `id_donatie_anonima` int NOT NULL AUTO_INCREMENT,
  `nume` varchar(45) NOT NULL DEFAULT 'Anonim',
  `donatii` varchar(500) NOT NULL,
  `cantitate` varchar(150) DEFAULT NULL,
  `id_proiect` int DEFAULT NULL,
  `data` date DEFAULT (curdate()),
  PRIMARY KEY (`id_donatie_anonima`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `finantari`
--

DROP TABLE IF EXISTS `finantari`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `finantari` (
  `ID_finantare` int NOT NULL AUTO_INCREMENT,
  `ID_proiect` int DEFAULT NULL,
  `ID_sponsor` int DEFAULT NULL,
  `suma` int DEFAULT NULL,
  `data` date DEFAULT NULL,
  PRIMARY KEY (`ID_finantare`),
  KEY `finantari_ibfk_1` (`ID_proiect`),
  KEY `finantari_ibfk_2` (`ID_sponsor`),
  CONSTRAINT `finantari_ibfk_1` FOREIGN KEY (`ID_proiect`) REFERENCES `proiecte` (`ID_proiect`),
  CONSTRAINT `finantari_ibfk_2` FOREIGN KEY (`ID_sponsor`) REFERENCES `sponsori` (`ID_sponsor`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `locatie`
--

DROP TABLE IF EXISTS `locatie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `locatie` (
  `id_locatie` int NOT NULL AUTO_INCREMENT,
  `strada` varchar(200) DEFAULT NULL,
  `ID_oras` int DEFAULT NULL,
  `ID_tara` int DEFAULT NULL,
  PRIMARY KEY (`id_locatie`),
  KEY `ID_oras` (`ID_oras`),
  KEY `ID_tara` (`ID_tara`),
  CONSTRAINT `locatie_ibfk_1` FOREIGN KEY (`ID_oras`) REFERENCES `orase` (`ID_oras`),
  CONSTRAINT `locatie_ibfk_2` FOREIGN KEY (`ID_tara`) REFERENCES `tari` (`ID_tara`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `necesitati`
--

DROP TABLE IF EXISTS `necesitati`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `necesitati` (
  `ID_necesitate` int NOT NULL AUTO_INCREMENT,
  `ID_proiect` int DEFAULT NULL,
  `necesitate` varchar(500) DEFAULT NULL,
  `cantitate` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`ID_necesitate`),
  KEY `necesitati_ibfk_1` (`ID_proiect`),
  CONSTRAINT `necesitati_ibfk_1` FOREIGN KEY (`ID_proiect`) REFERENCES `proiecte` (`ID_proiect`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `orase`
--

DROP TABLE IF EXISTS `orase`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orase` (
  `ID_oras` int NOT NULL AUTO_INCREMENT,
  `ID_tara` int DEFAULT NULL,
  `nume` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`ID_oras`),
  KEY `orase_ibfk_1` (`ID_tara`),
  CONSTRAINT `orase_ibfk_1` FOREIGN KEY (`ID_tara`) REFERENCES `tari` (`ID_tara`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `organizatori`
--

DROP TABLE IF EXISTS `organizatori`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `organizatori` (
  `ID_organizator` int NOT NULL AUTO_INCREMENT,
  `nume` varchar(30) NOT NULL,
  `prenume` varchar(30) NOT NULL,
  `likeuri` int DEFAULT '0',
  `email` varchar(200) NOT NULL,
  `telefon` varchar(20) NOT NULL,
  `password` varchar(45) NOT NULL,
  PRIMARY KEY (`ID_organizator`),
  UNIQUE KEY `UC_NumePrenume` (`nume`,`prenume`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `proiecte`
--

DROP TABLE IF EXISTS `proiecte`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proiecte` (
  `ID_proiect` int NOT NULL AUTO_INCREMENT,
  `ID_organizator` int DEFAULT NULL,
  `nume` varchar(200) DEFAULT NULL,
  `cont_bancar` varchar(50) DEFAULT NULL,
  `descriere` varchar(1000) DEFAULT NULL,
  `status` varchar(20) DEFAULT 'În așteptare',
  `data_inceput` date DEFAULT NULL,
  `data_sfarsit` date DEFAULT NULL,
  `ID_categorie` int DEFAULT NULL,
  `img` varchar(2000) DEFAULT 'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg',
  `ID_locatie` int DEFAULT NULL,
  `suma_necesara` int DEFAULT NULL,
  PRIMARY KEY (`ID_proiect`),
  UNIQUE KEY `nume` (`nume`),
  KEY `proiecte_ibfk_1` (`ID_organizator`),
  KEY `proiecte_ibfk_2` (`ID_categorie`),
  KEY `proiecte_ibfk_3_idx` (`ID_locatie`),
  CONSTRAINT `proiecte_ibfk_1` FOREIGN KEY (`ID_organizator`) REFERENCES `organizatori` (`ID_organizator`),
  CONSTRAINT `proiecte_ibfk_2` FOREIGN KEY (`ID_categorie`) REFERENCES `categorii` (`ID_categorie`),
  CONSTRAINT `proiecte_ibfk_3` FOREIGN KEY (`ID_locatie`) REFERENCES `locatie` (`id_locatie`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `before_insert_proiecte` BEFORE INSERT ON `proiecte` FOR EACH ROW BEGIN
    IF NEW.data_inceput = CURDATE() THEN
        SET NEW.status = 'Activ';
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `sponsori`
--

DROP TABLE IF EXISTS `sponsori`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sponsori` (
  `ID_sponsor` int NOT NULL AUTO_INCREMENT,
  `cont_bancar` varchar(50) NOT NULL,
  `nume_organizatie` varchar(200) NOT NULL,
  `likeuri` int DEFAULT '0',
  `email` varchar(200) NOT NULL,
  `password` varchar(45) NOT NULL,
  PRIMARY KEY (`ID_sponsor`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `nume_organizatie_UNIQUE` (`nume_organizatie`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tari`
--

DROP TABLE IF EXISTS `tari`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tari` (
  `ID_tara` int NOT NULL AUTO_INCREMENT,
  `nume` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`ID_tara`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `voluntari`
--

DROP TABLE IF EXISTS `voluntari`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `voluntari` (
  `ID_voluntar` int NOT NULL AUTO_INCREMENT,
  `nume` varchar(30) DEFAULT NULL,
  `prenume` varchar(30) DEFAULT NULL,
  `likeuri` int DEFAULT '0',
  `email` varchar(200) DEFAULT NULL,
  `telefon` varchar(20) DEFAULT NULL,
  `password` varchar(45) NOT NULL,
  PRIMARY KEY (`ID_voluntar`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `voluntariat`
--

DROP TABLE IF EXISTS `voluntariat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `voluntariat` (
  `ID_voluntariat` int NOT NULL AUTO_INCREMENT,
  `ID_voluntar` int DEFAULT NULL,
  `ID_proiect` int DEFAULT NULL,
  PRIMARY KEY (`ID_voluntariat`),
  UNIQUE KEY `uq_voluntariat` (`ID_voluntar`,`ID_proiect`),
  KEY `voluntariat_ibfk_2` (`ID_voluntar`),
  KEY `ID_proiect` (`ID_proiect`),
  CONSTRAINT `voluntariat_ibfk_2` FOREIGN KEY (`ID_voluntar`) REFERENCES `voluntari` (`ID_voluntar`),
  CONSTRAINT `voluntariat_ibfk_3` FOREIGN KEY (`ID_proiect`) REFERENCES `proiecte` (`ID_proiect`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping events for database 'voluntariat(1)'
--
/*!50106 SET @save_time_zone= @@TIME_ZONE */ ;
/*!50106 DROP EVENT IF EXISTS `ActualizareStatusProiecteEvent` */;
DELIMITER ;;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;;
/*!50003 SET character_set_client  = utf8mb4 */ ;;
/*!50003 SET character_set_results = utf8mb4 */ ;;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;;
/*!50003 SET @saved_time_zone      = @@time_zone */ ;;
/*!50003 SET time_zone             = 'SYSTEM' */ ;;
/*!50106 CREATE*/ /*!50117 DEFINER=`root`@`localhost`*/ /*!50106 EVENT `ActualizareStatusProiecteEvent` ON SCHEDULE EVERY 1 DAY STARTS '2024-01-05 09:00:00' ON COMPLETION NOT PRESERVE ENABLE DO CALL ActualizeazaStatusProiecte() */ ;;
/*!50003 SET time_zone             = @saved_time_zone */ ;;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;;
/*!50003 SET character_set_client  = @saved_cs_client */ ;;
/*!50003 SET character_set_results = @saved_cs_results */ ;;
/*!50003 SET collation_connection  = @saved_col_connection */ ;;
DELIMITER ;
/*!50106 SET TIME_ZONE= @save_time_zone */ ;

--
-- Dumping routines for database 'voluntariat(1)'
--
/*!50003 DROP PROCEDURE IF EXISTS `ActualizeazaStatusProiecte` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ActualizeazaStatusProiecte`()
BEGIN
  -- Actualizează statusul proiectelor care au data de început atinsă
  UPDATE proiecte
  SET status = 'Activ'
  WHERE data_inceput <= CURDATE()
    AND status = 'În așteptare';
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-16 14:14:56
