-- Volcando estructura de base de datos para cfematicos
CREATE DATABASE IF NOT EXISTS `cfematicos`;
USE `cfematicos`;

-- Volcando estructura para tabla cfematicos.agencies
CREATE TABLE IF NOT EXISTS `agencies` (
  `id` char(1) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Índice 2` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla cfematicos.carecenters
CREATE TABLE IF NOT EXISTS `carecenters` (
  `id` int NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `agency_id` char(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Índice 2` (`id`),
  KEY `FK_carecenters_agencies` (`agency_id`),
  CONSTRAINT `FK_carecenters_agencies` FOREIGN KEY (`agency_id`) REFERENCES `agencies` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla cfematicos.cfematics
CREATE TABLE IF NOT EXISTS `cfematics` (
  `id` varchar(4) NOT NULL,
  `carecenter_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Índice 2` (`id`),
  KEY `FK_cfematics_carecenters` (`carecenter_id`),
  CONSTRAINT `FK_cfematics_carecenters` FOREIGN KEY (`carecenter_id`) REFERENCES `carecenters` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla cfematicos.orders
CREATE TABLE IF NOT EXISTS `orders` (
  `id` varchar(100) NOT NULL,
  `fecha` date NOT NULL,
  `urlFile` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `cfematico_id` varchar(4) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Índice 2` (`id`),
  KEY `FK_orders_cfematics` (`cfematico_id`),
  CONSTRAINT `FK_orders_cfematics` FOREIGN KEY (`cfematico_id`) REFERENCES `cfematics` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla cfematicos.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` varchar(100) NOT NULL,
  `nombre` varchar(25) NOT NULL,
  `aPaterno` varchar(25) NOT NULL,
  `aMaterno` varchar(25) NOT NULL,
  `roll` varchar(25) NOT NULL,
  `password` varchar(500) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- La exportación de datos fue deseleccionada.
