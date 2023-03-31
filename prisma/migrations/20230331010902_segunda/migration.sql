/*
  Warnings:

  - The primary key for the `usuarios` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[login]` on the table `usuarios` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id` to the `usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `usuarios` DROP PRIMARY KEY,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `login` VARCHAR(191) NOT NULL,
    MODIFY `email` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- CreateTable
CREATE TABLE `aluno` (
    `rm` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,
    `ra` VARCHAR(10) NULL,
    `endereco` VARCHAR(100) NOT NULL,
    `telFixo` VARCHAR(10) NULL,
    `cel` VARCHAR(11) NULL,
    `nota` INTEGER NULL DEFAULT 2,
    `falta` INTEGER NULL DEFAULT 3,
    `responsavel1` VARCHAR(100) NOT NULL,
    `responsavel2` VARCHAR(100) NULL,
    `ocorrencia` VARCHAR(500) NULL,

    UNIQUE INDEX `aluno_ra_key`(`ra`),
    PRIMARY KEY (`rm`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `turmas` (
    `id` VARCHAR(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `professores` (
    `registro` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,
    `endereco` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`registro`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `usuarios_login_key` ON `usuarios`(`login`);
