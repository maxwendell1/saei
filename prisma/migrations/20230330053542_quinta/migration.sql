-- AlterTable
ALTER TABLE `aluno` MODIFY `ra` VARCHAR(10) NULL,
    MODIFY `telFixo` VARCHAR(10) NULL,
    MODIFY `cel` VARCHAR(11) NULL,
    MODIFY `nota` INTEGER NULL DEFAULT 2,
    MODIFY `falta` INTEGER NULL DEFAULT 3,
    MODIFY `responsavel2` VARCHAR(100) NULL,
    MODIFY `ocorrencia` VARCHAR(500) NULL;
