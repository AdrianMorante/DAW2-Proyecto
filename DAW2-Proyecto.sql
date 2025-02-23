DROP DATABASE IF EXISTS dawii_proyecto;
CREATE DATABASE dawii_proyecto;
USE dawii_proyecto;

CREATE TABLE usuario (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE empleado (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    puesto VARCHAR(50) NOT NULL,
    salario DECIMAL(10,2) NOT NULL,
    fecha_ingreso DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO usuario (nombre, email, password) VALUES 
('Diego Garcia', 'diego@hotmail.com', '$2a$10$Sku8tAYLOI5l/FEG73a4M.BNaHGHoGRLqLj0zuzD5/MOtRqV5cH7u');

INSERT INTO empleado (nombre, apellido, puesto, salario) VALUES
('Ana', 'Flores', 'Desarrollador', 2500.00),
('Carlos', 'López', 'Analista', 2800.00),
('Luisa', 'Fernández', 'Gerente', 3500.00);

select * from empleado;
select * from usuario;