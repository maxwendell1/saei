/*
  Warnings:

  - Made the column `ocorrencia` on table `aluno` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `aluno` MODIFY `ocorrencia` VARCHAR(500) NOT NULL;
