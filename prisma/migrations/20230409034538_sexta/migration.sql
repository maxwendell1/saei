/*
  Warnings:

  - You are about to drop the column `nascimento` on the `alunos` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nome]` on the table `disciplinas` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `alunos` DROP COLUMN `nascimento`;

-- AlterTable
ALTER TABLE `bimestres` ALTER COLUMN `ano` DROP DEFAULT;

-- CreateTable
CREATE TABLE `faltas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `quantitade` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ocorrencias` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data` VARCHAR(10) NOT NULL,
    `assunto` VARCHAR(40) NOT NULL,
    `descricao` VARCHAR(200) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `disciplinas_nome_key` ON `disciplinas`(`nome`);
