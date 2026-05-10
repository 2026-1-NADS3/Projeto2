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
-- Table structure for table `exercicios`
--

DROP TABLE IF EXISTS `exercicios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exercicios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descricao` text COLLATE utf8mb4_unicode_ci,
  `instrucoes` text COLLATE utf8mb4_unicode_ci,
  `duracao_minutos` int DEFAULT NULL,
  `video_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `imagem_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `categoria_id` int DEFAULT NULL,
  `tags` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ativo` tinyint(1) NOT NULL DEFAULT '1',
  `criado_em` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_exercicios_categoria` (`categoria_id`),
  CONSTRAINT `fk_exercicios_categoria` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exercicios`
--

LOCK TABLES `exercicios` WRITE;
/*!40000 ALTER TABLE `exercicios` DISABLE KEYS */;
INSERT INTO `exercicios` VALUES (1,'Alongamento Cervical','Exercicio para alivio de tensao no pescoco e melhora da postura cervical','Sente-se com a coluna ereta\nIncline a cabeca lentamente para o lado direito\nMantenha por 20 segundos\nRepita para o lado esquerdo\nExecute 3 repeticoes de cada lado',5,'https://example.com/videos/alongamento_cervical.mp4',NULL,1,NULL,1,'2026-05-02 19:00:52'),(2,'Ponte Glutea','Fortalecimento de gluteos e estabilizacao lombar','Deite-se de costas com os joelhos flexionados\nEleve o quadril ate formar uma linha reta\nMantenha por 5 segundos\nRetorne lentamente\nFaca 3 series de 10 repeticoes',8,'https://example.com/videos/ponte_glutea.mp4',NULL,2,NULL,1,'2026-05-02 19:00:52'),(3,'Respiracao Diafragmatica','Exercicio de respiracao para relaxamento e oxigenacao','Sente-se confortavelmente\nInspire pelo nariz por 4 segundos\nSegure por 2 segundos\nExpire pela boca por 6 segundos\nRepita por 5 minutos',5,'https://example.com/videos/respiracao.mp4',NULL,3,NULL,1,'2026-05-02 19:00:52'),(4,'Mobilidade de Quadril','Melhora da amplitude articular do quadril','Em pe, pernas afastadas\nFlexione o tronco lateralmente\nGire suavemente o quadril\n10 repeticoes para cada lado',6,'https://example.com/videos/mobilidade_quadril.mp4',NULL,4,NULL,1,'2026-05-02 19:00:52');
/*!40000 ALTER TABLE `exercicios` ENABLE KEYS */;
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
