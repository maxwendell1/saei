/*
  Warnings:

  - The primary key for the `usuarios` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `alunoRm` to the `usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `usuarios` DROP PRIMARY KEY,
    ADD COLUMN `alunoRm` INTEGER,
    MODIFY `login` VARCHAR(191) NOT NULL,
    MODIFY `email` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`login`);

-- CreateTable
CREATE TABLE `alunos` (
    `nome` VARCHAR(100) NOT NULL,
    `rm` INTEGER NOT NULL AUTO_INCREMENT,
    `ra` VARCHAR(10) NOT NULL,
    `endereco` VARCHAR(100) NOT NULL,
    `telFixo` VARCHAR(10) NOT NULL,
    `cel` VARCHAR(11) NOT NULL,
    `nota` INTEGER NOT NULL DEFAULT 2,
    `falta` INTEGER NOT NULL DEFAULT 3,
    `responsavel1` VARCHAR(100) NOT NULL,
    `responsavel2` VARCHAR(100) NOT NULL,
    `ocorrencia` VARCHAR(500) NOT NULL,
    `turmaId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `alunos_rm_key`(`rm`),
    UNIQUE INDEX `alunos_ra_key`(`ra`),
    PRIMARY KEY (`rm`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `professores` (
    `nome` VARCHAR(100) NOT NULL,
    `endereco` VARCHAR(100) NOT NULL,
    `registro` INTEGER NOT NULL AUTO_INCREMENT,

    UNIQUE INDEX `professores_registro_key`(`registro`),
    PRIMARY KEY (`registro`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `turmas` (
    `id` VARCHAR(3) NOT NULL,
    `professorRegistro` INTEGER NULL,

    UNIQUE INDEX `turmas_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `usuarios` ADD CONSTRAINT `usuarios_alunoRm_fkey` FOREIGN KEY (`alunoRm`) REFERENCES `alunos`(`rm`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `alunos` ADD CONSTRAINT `alunos_turmaId_fkey` FOREIGN KEY (`turmaId`) REFERENCES `turmas`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `turmas` ADD CONSTRAINT `turmas_professorRegistro_fkey` FOREIGN KEY (`professorRegistro`) REFERENCES `professores`(`registro`) ON DELETE SET NULL ON UPDATE CASCADE;
