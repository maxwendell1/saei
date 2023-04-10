/*
  Warnings:

  - The primary key for the `turmas` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `turmas` table. The data in that column could be lost. The data in that column will be cast from `VarChar(3)` to `Int`.
  - A unique constraint covering the columns `[sigla]` on the table `turmas` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sigla` to the `turmas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `turmas` DROP PRIMARY KEY,
    ADD COLUMN `sigla` VARCHAR(3) NOT NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- CreateIndex
CREATE UNIQUE INDEX `turmas_sigla_key` ON `turmas`(`sigla`);
