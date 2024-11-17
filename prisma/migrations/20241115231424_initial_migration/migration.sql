-- CreateTable
CREATE TABLE `_CompanyToInterest` (
    `A` INTEGER NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_CompanyToInterest_AB_unique`(`A`, `B`),
    INDEX `_CompanyToInterest_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_CompanyToInterest` ADD CONSTRAINT `_CompanyToInterest_A_fkey` FOREIGN KEY (`A`) REFERENCES `Company`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CompanyToInterest` ADD CONSTRAINT `_CompanyToInterest_B_fkey` FOREIGN KEY (`B`) REFERENCES `Interest`(`name`) ON DELETE CASCADE ON UPDATE CASCADE;
