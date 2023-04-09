/*
  Warnings:

  - You are about to drop the column `quantitade` on the `faltas` table. All the data in the column will be lost.
  - Added the required column `quantidade` to the `faltas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `faltas` DROP COLUMN `quantitade`,
    ADD COLUMN `quantidade` INTEGER NOT NULL;
