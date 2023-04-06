/*
  Warnings:

  - You are about to drop the column `usuario` on the `alunos` table. All the data in the column will be lost.
  - You are about to drop the column `usuario` on the `professores` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `alunos` DROP COLUMN `usuario`;

-- AlterTable
ALTER TABLE `professores` DROP COLUMN `usuario`;
