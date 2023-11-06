-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 06-11-2023 a las 01:33:31
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.1.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `zundada`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `boleta`
--

CREATE TABLE `boleta` (
  `idBoleta` int(11) NOT NULL,
  `tipo` varchar(40) NOT NULL,
  `precio` int(11) NOT NULL,
  `idUsuarioBoleta` int(11) NOT NULL,
  `idEventoBoleta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `boleta`
--

INSERT INTO `boleta` (`idBoleta`, `tipo`, `precio`, `idUsuarioBoleta`, `idEventoBoleta`) VALUES
(1, 'General', 20000, 1, 1),
(2, 'General', 10000, 2, 1),
(3, 'Preferecial', 0, 3, 3),
(4, 'VIP', 30000, 4, 4),
(5, 'Preferecial', 15000, 5, 5),
(6, 'Preferencial', 0, 6, 6),
(7, 'General', 0, 7, 7),
(8, 'General', 5000, 8, 8),
(9, 'General', 10000, 9, 9),
(10, 'General', 0, 10, 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `idCliente` int(11) NOT NULL,
  `Cedula` int(11) NOT NULL,
  `idUsuarioCliente` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`idCliente`, `Cedula`, `idUsuarioCliente`) VALUES
(1, 1000000001, 1),
(2, 1000000002, 2),
(3, 1000000003, 3),
(4, 1000000004, 4),
(5, 1000000005, 5),
(6, 1000000006, 6),
(7, 1000000007, 7),
(8, 1000000008, 8),
(9, 1000000009, 9),
(10, 1000000010, 10),
(11, 0, 25),
(12, 123, 27),
(13, 123456, 28),
(14, 123, 29),
(15, 123, 30),
(16, 123, 32),
(17, 23, 34);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evento`
--

CREATE TABLE `evento` (
  `idEvento` int(11) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `lugar` varchar(60) NOT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `numeroboletas` int(11) NOT NULL,
  `Bdisponibles` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `evento`
--

INSERT INTO `evento` (`idEvento`, `nombre`, `lugar`, `fecha`, `hora`, `numeroboletas`, `Bdisponibles`) VALUES
(1, 'Hallowen fest', 'Lugar1', '2023-11-01', '17:30:00', 50, 10),
(2, 'Weekfest', 'Lugar2', '2023-11-12', '18:30:00', 20, 15),
(3, 'Parranda', 'Lugar3', '2023-11-13', '20:00:00', 100, 5),
(4, 'Portfiesta', 'Lugar4', '2023-11-14', '10:30:00', 150, 8),
(5, 'Juernes Freud', 'Lugar5', '2023-11-15', '12:30:00', 250, 100),
(6, 'Nombre6', 'Lugar6', '2023-11-16', '16:00:00', 50, 15),
(7, 'Nombre7', 'Lugar7', '2023-11-17', '16:30:00', 150, 120),
(8, 'Nombre8', 'Lugar8', '2023-11-18', '15:30:00', 100, 35),
(9, 'Nombre9', 'Lugar9', '2023-11-19', '10:00:00', 120, 33),
(10, 'Nombre10', 'Lugar10', '2023-11-20', '09:30:00', 80, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `organizador`
--

CREATE TABLE `organizador` (
  `idOrganizador` int(11) NOT NULL,
  `organizacion` varchar(60) NOT NULL,
  `telefono` bigint(20) NOT NULL,
  `idUsuarioOrganizacion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `organizador`
--

INSERT INTO `organizador` (`idOrganizador`, `organizacion`, `telefono`, `idUsuarioOrganizacion`) VALUES
(1, 'Luisa Postres', 3000000001, 11),
(2, 'Andres Carne de Res', 3000000002, 12),
(3, 'Biblioteca Unal', 3000000003, 13),
(4, 'Grupo Teologia Javeriana', 3000000004, 14),
(5, 'Jugatorio UN', 3000000005, 16),
(6, 'Cultura Andes', 3000000006, 17),
(7, 'Grupo de Teatro U militar', 3000000007, 18),
(8, 'Grupo de Musica Distrital', 3000000008, 19),
(9, 'Bienestar UN', 3000000009, 20),
(10, 'Danza Arabe UN', 3000000010, 15);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('R1kZf4tu9-t7s5nZZFyIysemkvjcsOr6', 1699239583, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":34},\"flash\":{}}'),
('hK9O4V9Nh-p0JvxPB1eZrgD4W4kVP4i8', 1699317122, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"passport\":{\"user\":1},\"flash\":{}}');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `idUsuario` int(11) NOT NULL,
  `Nombre` varchar(40) NOT NULL,
  `Usuario` varchar(20) NOT NULL,
  `Clave` varchar(40) NOT NULL,
  `Correo` varchar(200) NOT NULL,
  `Rol` enum('Administrador','Organizador','Cliente') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`idUsuario`, `Nombre`, `Usuario`, `Clave`, `Correo`, `Rol`) VALUES
(1, 'Ana', 'ana_12', 'Contrasela1', 'anamaria@gmail.com', 'Cliente'),
(2, 'Amanda', 'user123', 'Contrasela2', 'amandacastro@gmail.com', 'Cliente'),
(3, 'Miranda', 'mLozano', 'Contrasela3', 'mirandela@gmail.com', 'Cliente'),
(4, 'Josefina', 'Josefa', 'Contrasela4', 'Josefina@gmail.com', 'Cliente'),
(5, 'Ricardo', 'RichardM', 'Contrasela5', 'ricardino@gmail.com', 'Cliente'),
(6, 'Nicolas', 'nico', 'Contrasela6', 'nichrora@gmail.com', 'Cliente'),
(7, 'Lux', 'Luxuria', 'Contrasela7', 'luxkarina@gmail.com', 'Cliente'),
(8, 'Jeremy', 'jr_jeremy', 'Contrasela8', 'candanceamor@gmail.com', 'Cliente'),
(9, 'Edwin', 'edmolano', 'Contrasela9', 'edwardillo@gmail.com', 'Cliente'),
(10, 'Rosa Maria', 'tristejoker', 'Contrasela10', 'charada@gmail.com', 'Cliente'),
(11, 'Luisa Fernanda', 'cecine', 'Contrasela11', 'LuisaPostres@gmail.com', 'Organizador'),
(12, 'Andres Rodriguez', 'naitoon', 'Contrasela12', 'AndresCarnedeRes@gmail.com', 'Organizador'),
(13, 'Henry Enrique', 'mancer', 'Contrasela13', 'Bibliotecaunal@gmail.com', 'Organizador'),
(14, 'Carlos Roman', 'acilu', 'Contrasela14', 'TeologiaJaveriana@gmail.com', 'Organizador'),
(15, 'Katerina Sahara', 'lbuenoelfeoyyo', 'Contrasela15', 'DanzaArabeUn@gmail.com', 'Organizador'),
(16, 'Fernando Soler', 'instaguedon', 'Contrasela16', 'JugatorioUN@gmail.com', 'Organizador'),
(17, 'Luna Bermon', 'palacinkascafe', 'Contrasela17', 'CulturaAndes@gmail.com', 'Organizador'),
(18, 'Dafne Herrera', 'cicadas', 'Contrasela18', 'TeatroEscuelaMilitar@gmail.com', 'Organizador'),
(19, 'Diego Rojas', 'hawthornegrill', 'Contrasela19', 'MusicaDistrital@gmail.com', 'Organizador'),
(20, 'Javier Arevalo', 'monkscafes', 'Contrasela20', 'EmprendimientosUN@gmail.com', 'Organizador'),
(21, 'Laura', 'alefit', 'Contrasela21', 'Laurachan@gmail.com', 'Administrador'),
(25, 'Laura Paez', 'Laura', '$2a$10$GEobUXUJfqslFYTgGEwTmOTghuCWeePaN', 'lolaloa', 'Cliente'),
(27, 'pepito perez', 'Pepito', '$2a$10$QSA4XwEeZvwmJhVjRnCfFe7g3VgbOSgUF', 'pepe@gmail.com', 'Cliente'),
(28, 'prueba3', 'Prueba', '$2a$10$.ozaFa04TxI5CmfmfiJ0GOBKzepGmJuuu', 'pruebas@gmail.com', 'Cliente'),
(29, 'Administrador', 'Admin', '$2a$10$8PaBddte/jtBlGarlMDPNeFYzPdWriu4c', 'pruebas@gmail.com', 'Cliente'),
(30, 'Laura', 'l', '$2a$10$.5XLSsBG1qDRfFZ0Y7pLPuqKEjdPeE4iy', 'aleja@unal.edu.co', 'Cliente'),
(31, 'prueba12', 'PRUEBA', '123', 'aleja', 'Cliente'),
(32, '123', 'Perry', 'perrys', 'sdsfl@gmail.com', 'Cliente'),
(33, '123', 'Perry', 'perrys', 'sdsfl@gmail.com', 'Cliente'),
(34, 'alonso Fonseca', 'alonso', '123', '123', 'Cliente');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `boleta`
--
ALTER TABLE `boleta`
  ADD PRIMARY KEY (`idBoleta`),
  ADD KEY `idUsuarioBoleta` (`idUsuarioBoleta`),
  ADD KEY `idEventoBoleta` (`idEventoBoleta`);

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`idCliente`),
  ADD KEY `idUsuarioCliente` (`idUsuarioCliente`);

--
-- Indices de la tabla `evento`
--
ALTER TABLE `evento`
  ADD PRIMARY KEY (`idEvento`);

--
-- Indices de la tabla `organizador`
--
ALTER TABLE `organizador`
  ADD PRIMARY KEY (`idOrganizador`),
  ADD KEY `idUsuarioOrganizacion` (`idUsuarioOrganizacion`);

--
-- Indices de la tabla `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`idUsuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `boleta`
--
ALTER TABLE `boleta`
  MODIFY `idBoleta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `idCliente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `evento`
--
ALTER TABLE `evento`
  MODIFY `idEvento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `organizador`
--
ALTER TABLE `organizador`
  MODIFY `idOrganizador` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `boleta`
--
ALTER TABLE `boleta`
  ADD CONSTRAINT `boleta_ibfk_1` FOREIGN KEY (`idUsuarioBoleta`) REFERENCES `usuario` (`idUsuario`),
  ADD CONSTRAINT `boleta_ibfk_2` FOREIGN KEY (`idEventoBoleta`) REFERENCES `evento` (`idEvento`);

--
-- Filtros para la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD CONSTRAINT `cliente_ibfk_1` FOREIGN KEY (`idUsuarioCliente`) REFERENCES `usuario` (`idUsuario`);

--
-- Filtros para la tabla `organizador`
--
ALTER TABLE `organizador`
  ADD CONSTRAINT `organizador_ibfk_1` FOREIGN KEY (`idUsuarioOrganizacion`) REFERENCES `usuario` (`idUsuario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
