/*
  Warnings:

  - You are about to drop the `_InterestToStudent` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_InterestToStudent` DROP FOREIGN KEY `_InterestToStudent_A_fkey`;

-- DropForeignKey
ALTER TABLE `_InterestToStudent` DROP FOREIGN KEY `_InterestToStudent_B_fkey`;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `interestName` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `_InterestToStudent`;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_interestName_fkey` FOREIGN KEY (`interestName`) REFERENCES `Interest`(`name`) ON DELETE SET NULL ON UPDATE CASCADE;
