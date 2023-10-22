-- CreateTable
CREATE TABLE `Empresa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `razaoSocial` VARCHAR(50) NOT NULL,
    `cnpj` VARCHAR(14) NOT NULL,
    `cep` VARCHAR(8) NOT NULL,
    `cidade` VARCHAR(30) NOT NULL,
    `estado` VARCHAR(20) NOT NULL,
    `bairro` VARCHAR(20) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Licenca` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `numero` VARCHAR(10) NOT NULL,
    `orgaoAmbiental` VARCHAR(30) NOT NULL,
    `emissao` DATE NOT NULL,
    `validade` DATE NOT NULL,
    `empresaId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Licenca` ADD CONSTRAINT `Licenca_empresaId_fkey` FOREIGN KEY (`empresaId`) REFERENCES `Empresa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
