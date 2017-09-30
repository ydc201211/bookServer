-- MySQL dump 10.13  Distrib 5.7.12, for Win64 (x86_64)
--
-- Host: localhost    Database: book
-- ------------------------------------------------------
-- Server version	5.7.17-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `book_keys`
--

DROP TABLE IF EXISTS `book_keys`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `book_keys` (
  `kid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `kCode` varchar(45) NOT NULL,
  `kCreateTime` varchar(45) NOT NULL,
  `kEnable` int(11) NOT NULL,
  PRIMARY KEY (`kid`),
  UNIQUE KEY `kid_UNIQUE` (`kid`),
  UNIQUE KEY `code_UNIQUE` (`kCode`)
) ENGINE=InnoDB AUTO_INCREMENT=104 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book_keys`
--

LOCK TABLES `book_keys` WRITE;
/*!40000 ALTER TABLE `book_keys` DISABLE KEYS */;
INSERT INTO `book_keys` VALUES (1,'C1aJ89','2017-8-29 10:27:30',1),(2,'D8b67F','2017-9-27 10:27:01',1),(3,'gH187K','2017-9-27 10:28:01',0),(4,'OwhfCf','2017-9-28 13:56:22',1),(5,'EAnYMG','2017-9-28 13:56:22',1),(6,'ozylHF','2017-9-28 13:56:22',1),(7,'PALm7J','2017-9-28 13:56:22',1),(8,'6eDxxn','2017-9-28 13:56:22',1),(9,'8LO4br','2017-9-28 13:56:22',1),(10,'2P4v3w','2017-9-28 13:56:22',1),(11,'xZDXqp','2017-9-28 13:56:22',1),(12,'JtsNxL','2017-9-28 13:56:22',1),(13,'OVK3qC','2017-9-28 13:56:22',1),(14,'sHNa2g','2017-9-28 13:56:22',1),(15,'24WfXH','2017-9-28 13:56:22',1),(16,'BSZHYf','2017-9-28 13:56:22',1),(17,'ZJ7Gz6','2017-9-28 13:56:22',1),(18,'Y3LiYM','2017-9-28 13:56:22',1),(19,'4e6EX8','2017-9-28 13:56:22',1),(20,'9QNWBx','2017-9-28 13:56:22',1),(21,'ALAiaK','2017-9-28 13:56:22',1),(22,'8xLqdg','2017-9-28 13:56:22',1),(23,'5N3fPk','2017-9-28 13:56:22',1),(24,'Ai42zh','2017-9-28 13:56:22',1),(25,'iKJY45','2017-9-28 13:56:22',1),(26,'U4Guyk','2017-9-28 13:56:22',1),(27,'lumazU','2017-9-28 13:56:22',1),(28,'LDbmPc','2017-9-28 13:56:22',1),(29,'0RgOrE','2017-9-28 13:56:22',1),(30,'v3wAeJ','2017-9-28 13:56:22',1),(31,'pJCa42','2017-9-28 13:56:22',1),(32,'feavZU','2017-9-28 13:56:22',1),(33,'kYgFJ4','2017-9-28 13:56:22',1),(34,'KFPWdc','2017-9-28 13:56:22',1),(35,'oLwtQl','2017-9-28 13:56:22',1),(36,'Lt7Uxy','2017-9-28 13:56:22',1),(37,'nYCbN5','2017-9-28 13:56:22',1),(38,'d0GFjO','2017-9-28 13:56:22',1),(39,'HuR3hZ','2017-9-28 13:56:22',1),(40,'euAVl0','2017-9-28 13:56:22',1),(41,'ZstOml','2017-9-28 13:56:22',1),(42,'rbFfV9','2017-9-28 13:56:22',1),(43,'itlQGC','2017-9-28 13:56:22',1),(44,'GQJAsD','2017-9-28 13:56:22',1),(45,'vfIZdT','2017-9-28 13:56:22',1),(46,'jHU4Qf','2017-9-28 13:56:22',1),(47,'b2CktC','2017-9-28 13:56:22',1),(48,'sEWpfZ','2017-9-28 13:56:22',1),(49,'Ze3HzB','2017-9-28 13:56:22',1),(50,'JyuHRM','2017-9-28 13:56:22',1),(51,'quQfog','2017-9-28 13:56:22',1),(52,'9802t9','2017-9-28 13:56:22',1),(53,'u7K299','2017-9-28 13:56:22',1),(54,'O6yizb','2017-9-28 13:56:22',1),(55,'jUmxma','2017-9-28 13:56:22',1),(56,'IxjoKw','2017-9-28 13:56:22',1),(57,'TEK5LZ','2017-9-28 13:56:22',1),(58,'iL7zqt','2017-9-28 13:56:22',1),(59,'4j2WKC','2017-9-28 13:56:22',1),(60,'wSWU7e','2017-9-28 13:56:22',1),(61,'AeoPdL','2017-9-28 13:56:22',1),(62,'2z50MP','2017-9-28 13:56:22',1),(63,'C4rNzM','2017-9-28 13:56:22',1),(64,'ODRIrW','2017-9-28 13:56:22',1),(65,'w2qJI3','2017-9-28 13:56:22',1),(66,'b4c4Jd','2017-9-28 13:56:22',1),(67,'VpKT2A','2017-9-28 13:56:22',1),(68,'wsCuZR','2017-9-28 13:56:22',1),(69,'ctgCLj','2017-9-28 13:56:22',1),(70,'ljuVog','2017-9-28 13:56:22',1),(71,'dQSRJe','2017-9-28 13:56:22',1),(72,'TmTmeq','2017-9-28 13:56:22',1),(73,'3STXvN','2017-9-28 13:56:22',1),(74,'khaij8','2017-9-28 13:56:22',1),(75,'qt2Wz7','2017-9-28 13:56:22',1),(76,'AYj47k','2017-9-28 13:56:22',1),(77,'MmGPrR','2017-9-28 13:56:22',1),(78,'7MODaW','2017-9-28 13:56:22',1),(79,'t5c7gs','2017-9-28 13:56:22',1),(80,'43kWtz','2017-9-28 13:56:22',1),(81,'Na2KRt','2017-9-28 13:56:22',1),(82,'wsASvz','2017-9-28 13:56:22',1),(83,'k8KqbY','2017-9-28 13:56:22',1),(84,'Jqu3xA','2017-9-28 13:56:22',1),(85,'rYDQxq','2017-9-28 13:56:22',1),(86,'aOoiE5','2017-9-28 13:56:22',1),(87,'U6omBc','2017-9-28 13:56:22',1),(88,'jKJUhg','2017-9-28 13:56:22',1),(89,'cF9UEp','2017-9-28 13:56:22',1),(90,'R89Gsj','2017-9-28 13:56:22',1),(91,'WFf8Fl','2017-9-28 13:56:22',1),(92,'mFyyIF','2017-9-28 13:56:22',1),(93,'rmnDTa','2017-9-28 13:56:22',1),(94,'mNLdyA','2017-9-28 13:56:22',1),(95,'vQc6sO','2017-9-28 13:56:22',1),(96,'BrRJdX','2017-9-28 13:56:22',1),(97,'tXEHe7','2017-9-28 13:56:22',1),(98,'ZG2z5f','2017-9-28 13:56:22',1),(99,'4rxTAW','2017-9-28 13:56:22',1);
/*!40000 ALTER TABLE `book_keys` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-09-30 14:02:16
