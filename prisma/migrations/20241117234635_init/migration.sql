/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Interest` will be added. If there are existing duplicate values, this will fail.
  - Made the column `userId` on table `Interest` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Interest` DROP FOREIGN KEY `Interest_userId_fkey`;

-- AlterTable
ALTER TABLE `Interest` MODIFY `userId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `_InterestToStudent` (
    `A` VARCHAR(191) NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_InterestToStudent_AB_unique`(`A`, `B`),
    INDEX `_InterestToStudent_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Interest_userId_key` ON `Interest`(`userId`);

-- AddForeignKey
ALTER TABLE `Interest` ADD CONSTRAINT `Interest_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_InterestToStudent` ADD CONSTRAINT `_InterestToStudent_A_fkey` FOREIGN KEY (`A`) REFERENCES `Interest`(`name`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_InterestToStudent` ADD CONSTRAINT `_InterestToStudent_B_fkey` FOREIGN KEY (`B`) REFERENCES `Student`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
