/*
  Warnings:

  - You are about to drop the `aluno` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `usuarios` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `senha` to the `professores` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuario` to the `professores` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `professores` ADD COLUMN `cel` VARCHAR(11) NULL,
    ADD COLUMN `senha` VARCHAR(20) NOT NULL,
    ADD COLUMN `telFixo` VARCHAR(10) NULL,
    ADD COLUMN `usuario` VARCHAR(30) NOT NULL;

-- DropTable
DROP TABLE `aluno`;

-- DropTable
DROP TABLE `usuarios`;

-- CreateTable
CREATE TABLE `admin` (
    `id` INTEGER NOT NULL,
    `usuario` VARCHAR(100) NOT NULL,
    `senha` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `admin_usuario_key`(`usuario`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `alunos` (
    `rm` INTEGER NOT NULL AUTO_INCREMENT,
    `usuario` VARCHAR(30) NOT NULL,
    `senha` VARCHAR(20) NOT NULL,
    `nome` VARCHAR(100) NOT NULL,
    `nascimento` DATETIME(0) NOT NULL,
    `ra` VARCHAR(10) NULL,
    `endereco` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NULL,
    `telFixo` VARCHAR(10) NULL,
    `cel` VARCHAR(11) NULL,
    `responsavel1` VARCHAR(100) NOT NULL,
    `responsavel2` VARCHAR(100) NULL,

    UNIQUE INDEX `alunos_ra_key`(`ra`),
    PRIMARY KEY (`rm`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bimestres` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ano` INTEGER NOT NULL DEFAULT 4,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `disciplinas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `valor` DECIMAL(3, 1) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
