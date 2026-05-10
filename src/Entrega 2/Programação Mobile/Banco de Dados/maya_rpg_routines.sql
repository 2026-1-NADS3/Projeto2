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
-- Temporary view structure for view `vw_dashboard_paciente`
--

DROP TABLE IF EXISTS `vw_dashboard_paciente`;
/*!50001 DROP VIEW IF EXISTS `vw_dashboard_paciente`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vw_dashboard_paciente` AS SELECT 
 1 AS `paciente_id`,
 1 AS `nome`,
 1 AS `total_exercicios`,
 1 AS `exercicios_hoje`,
 1 AS `dor_media_7d`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `vw_dashboard_paciente`
--

/*!50001 DROP VIEW IF EXISTS `vw_dashboard_paciente`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vw_dashboard_paciente` AS select `p`.`id` AS `paciente_id`,`u`.`nome` AS `nome`,(select count(0) from `prescricoes` where ((`prescricoes`.`paciente_id` = `p`.`id`) and (`prescricoes`.`ativa` = true))) AS `total_exercicios`,(select count(0) from `execucoes` where ((`execucoes`.`paciente_id` = `p`.`id`) and (cast(`execucoes`.`data_execucao` as date) = curdate()))) AS `exercicios_hoje`,(select round(avg(`execucoes`.`nivel_dor`),1) from `execucoes` where ((`execucoes`.`paciente_id` = `p`.`id`) and (`execucoes`.`data_execucao` >= (now() - interval 7 day)))) AS `dor_media_7d` from (`pacientes` `p` join `usuarios` `u` on((`u`.`id` = `p`.`usuario_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Dumping routines for database 'maya_rpg'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-10  2:18:33
