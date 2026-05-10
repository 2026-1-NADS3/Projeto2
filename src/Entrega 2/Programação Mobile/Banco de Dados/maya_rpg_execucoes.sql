-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: maya_rpg
-- ------------------------------------------------------
-- Server version	8.0.46

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
-- Table structure for table `execucoes`
--

DROP TABLE IF EXISTS `execucoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `execucoes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `prescricao_id` int NOT NULL,
  `paciente_id` int NOT NULL,
  `nivel_dor` int NOT NULL,
  `observacoes` text COLLATE utf8mb4_unicode_ci,
  `data_execucao` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `sincronizado` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `fk_exec_prescricao` (`prescricao_id`),
  KEY `fk_exec_paciente` (`paciente_id`),
  CONSTRAINT `fk_exec_paciente` FOREIGN KEY (`paciente_id`) REFERENCES `pacientes` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_exec_prescricao` FOREIGN KEY (`prescricao_id`) REFERENCES `prescricoes` (`id`) ON DELETE CASCADE,
  CONSTRAINT `execucoes_chk_1` CHECK ((`nivel_dor` between 0 and 10))
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `execucoes`
--

LOCK TABLES `execucoes` WRITE;
/*!40000 ALTER TABLE `execucoes` DISABLE KEYS */;
INSERT INTO `execucoes` VALUES (1,1,1,5,'Senti tensao no inicio','2026-04-27 00:00:00',1),(2,2,1,4,'Mais leve hoje','2026-04-28 00:00:00',1),(3,1,1,2,'Otimo!','2026-04-29 00:00:00',1),(4,3,1,3,'Relaxante','2026-04-30 00:00:00',1),(5,2,1,1,'Quase sem dor','2026-05-01 00:00:00',1),(6,1,1,2,'Senti menos tensao hoje','2026-05-02 00:00:00',1),(7,4,1,2,'Bom','2026-05-02 00:00:00',1),(8,1,1,7,NULL,'2026-05-03 18:02:09',1),(9,1,1,0,NULL,'2026-05-03 18:14:26',1),(10,1,1,5,NULL,'2026-05-03 18:16:35',1),(11,1,1,8,NULL,'2026-05-03 18:22:44',1),(12,1,1,0,NULL,'2026-05-03 20:12:28',1),(13,1,1,8,NULL,'2026-05-07 22:33:23',1),(14,1,1,6,NULL,'2026-05-07 22:34:14',1),(15,1,1,10,NULL,'2026-05-09 18:48:48',1),(16,1,1,4,NULL,'2026-05-10 00:19:15',1);
/*!40000 ALTER TABLE `execucoes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-10  2:18:32
