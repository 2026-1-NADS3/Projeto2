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
-- Table structure for table `prescricoes`
--

DROP TABLE IF EXISTS `prescricoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prescricoes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `paciente_id` int NOT NULL,
  `exercicio_id` int NOT NULL,
  `profissional_id` int NOT NULL,
  `frequencia` varchar(80) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `orientacoes` text COLLATE utf8mb4_unicode_ci,
  `data_inicio` date NOT NULL,
  `data_fim` date DEFAULT NULL,
  `ativa` tinyint(1) NOT NULL DEFAULT '1',
  `criada_em` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_presc_paciente` (`paciente_id`),
  KEY `fk_presc_exercicio` (`exercicio_id`),
  KEY `fk_presc_profissional` (`profissional_id`),
  CONSTRAINT `fk_presc_exercicio` FOREIGN KEY (`exercicio_id`) REFERENCES `exercicios` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_presc_paciente` FOREIGN KEY (`paciente_id`) REFERENCES `pacientes` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_presc_profissional` FOREIGN KEY (`profissional_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prescricoes`
--

LOCK TABLES `prescricoes` WRITE;
/*!40000 ALTER TABLE `prescricoes` DISABLE KEYS */;
INSERT INTO `prescricoes` VALUES (1,1,1,1,'3x ao dia','Realizar pela manha, tarde e noite','2026-04-25',NULL,1,'2026-05-02 19:00:52'),(2,1,2,1,'2x ao dia','Antes de dormir e ao acordar','2026-04-25',NULL,1,'2026-05-02 19:00:52'),(3,1,3,1,'1x ao dia','Antes de dormir','2026-04-27',NULL,1,'2026-05-02 19:00:52'),(4,1,4,1,'2x na semana','Em dias alternados','2026-04-27',NULL,1,'2026-05-02 19:00:52');
/*!40000 ALTER TABLE `prescricoes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-10  2:18:31
