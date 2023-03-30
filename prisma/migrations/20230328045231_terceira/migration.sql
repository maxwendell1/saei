/*
  Warnings:

  - You are about to drop the column `professorRegistro` on the `turmas` table. All the data in the column will be lost.
  - The primary key for the `usuarios` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `alunos` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[login]` on the table `usuarios` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `professorId` to the `turmas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `usuarios` table without a default value. This is not possible if the table is not empty.
  - Made the column `alunoRm` on table `usuarios` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `alunos` DROP FOREIGN KEY `alunos_turmaId_fkey`;

-- DropForeignKey
ALTER TABLE `turmas` DROP FOREIGN KEY `turmas_professorRegistro_fkey`;

-- DropForeignKey
ALTER TABLE `usuarios` DROP FOREIGN KEY `usuarios_alunoRm_fkey`;

-- DropIndex
DROP INDEX `professores_registro_key` ON `professores`;

-- DropIndex
DROP INDEX `turmas_id_key` ON `turmas`;

-- AlterTable
ALTER TABLE `turmas` DROP COLUMN `professorRegistro`,
    ADD COLUMN `professorId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `usuarios` DROP PRIMARY KEY,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `alunoRm` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `alunos`;

-- CreateTable
CREATE TABLE `aluno` (
    `rm` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,
    `ra` VARCHAR(10) NOT NULL,
    `endereco` VARCHAR(100) NOT NULL,
    `telFixo` VARCHAR(10) NOT NULL,
    `cel` VARCHAR(11) NOT NULL,
    `nota` INTEGER NOT NULL DEFAULT 2,
    `falta` INTEGER NOT NULL DEFAULT 3,
    `responsavel1` VARCHAR(100) NOT NULL,
    `responsavel2` VARCHAR(100) NOT NULL,
    `ocorrencia` VARCHAR(500),
    `turmaId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `aluno_ra_key`(`ra`),
    PRIMARY KEY (`rm`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `usuarios_login_key` ON `usuarios`(`login`);

-- AddForeignKey
ALTER TABLE `usuarios` ADD CONSTRAINT `usuarios_alunoRm_fkey` FOREIGN KEY (`alunoRm`) REFERENCES `aluno`(`rm`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `aluno` ADD CONSTRAINT `aluno_turmaId_fkey` FOREIGN KEY (`turmaId`) REFERENCES `turmas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `turmas` ADD CONSTRAINT `turmas_professorId_fkey` FOREIGN KEY (`professorId`) REFERENCES `professores`(`registro`) ON DELETE RESTRICT ON UPDATE CASCADE;
