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
-- Table structure for table `notificacoes`
--

DROP TABLE IF EXISTS `notificacoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notificacoes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `tipo` enum('LEMBRETE_EXERCICIO','CONSULTA','PROGRESSO','SISTEMA') COLLATE utf8mb4_unicode_ci NOT NULL,
  `titulo` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mensagem` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `lida` tinyint(1) NOT NULL DEFAULT '0',
  `criada_em` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_notif_usuario` (`usuario_id`),
  CONSTRAINT `fk_notif_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notificacoes`
--

LOCK TABLES `notificacoes` WRITE;
/*!40000 ALTER TABLE `notificacoes` DISABLE KEYS */;
INSERT INTO `notificacoes` VALUES (1,3,'LEMBRETE_EXERCICIO','Lembrete de Exercicio','Hora de fazer o Alongamento Cervical - 3x ao dia',1,'2026-05-02 19:00:52'),(2,3,'CONSULTA','Consulta amanha','Voce tem consulta com Dra. Maya as 10:00',1,'2026-05-02 19:00:52'),(3,3,'PROGRESSO','Otimo progresso!','Voce completou 5 exercicios esta semana',1,'2026-05-02 19:00:52'),(4,3,'SISTEMA','Bem-vinda!','Seu plano de exercicios esta disponivel',1,'2026-05-02 19:00:52'),(5,1,'CONSULTA','Novo agendamento','Novo agendamento em 2026-05-13 as 10:00',0,'2026-05-07 22:34:31'),(6,2,'CONSULTA','Novo agendamento','Novo agendamento em 2026-05-13 as 10:00',0,'2026-05-07 22:34:31'),(8,1,'CONSULTA','Novo agendamento','Novo agendamento em 2026-05-09 as 11:00',0,'2026-05-09 18:48:01'),(9,2,'CONSULTA','Novo agendamento','Novo agendamento em 2026-05-09 as 11:00',0,'2026-05-09 18:48:01'),(11,1,'CONSULTA','Novo agendamento','Novo agendamento em 2026-05-16 as 08:30',0,'2026-05-09 18:48:33'),(12,2,'CONSULTA','Novo agendamento','Novo agendamento em 2026-05-16 as 08:30',0,'2026-05-09 18:48:33'),(14,1,'CONSULTA','Novo agendamento','Novo agendamento em 2026-05-09 as 15:00',0,'2026-05-09 21:06:16'),(15,2,'CONSULTA','Novo agendamento','Novo agendamento em 2026-05-09 as 15:00',0,'2026-05-09 21:06:16'),(17,1,'CONSULTA','Novo agendamento','Novo agendamento em 2026-05-15 as 15:00',0,'2026-05-10 00:18:49'),(18,2,'CONSULTA','Novo agendamento','Novo agendamento em 2026-05-15 as 15:00',0,'2026-05-10 00:18:49');
/*!40000 ALTER TABLE `notificacoes` ENABLE KEYS */;
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
