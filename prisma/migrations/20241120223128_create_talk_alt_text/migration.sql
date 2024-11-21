/*
  Warnings:

  - You are about to drop the `_CompanyToInterest` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_CompanyToInterest` DROP FOREIGN KEY `_CompanyToInterest_A_fkey`;

-- DropForeignKey
ALTER TABLE `_CompanyToInterest` DROP FOREIGN KEY `_CompanyToInterest_B_fkey`;

-- AlterTable
ALTER TABLE `Action` ADD COLUMN `altText` VARCHAR(191) NULL,
    ADD COLUMN `isRevealed` BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE `_CompanyToInterest`;
