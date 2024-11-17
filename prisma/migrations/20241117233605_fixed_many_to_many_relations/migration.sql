/*
  Warnings:

  - You are about to drop the column `studentId` on the `Action` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Interest` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `Talk` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Action` DROP FOREIGN KEY `Action_studentId_fkey`;

-- DropForeignKey
ALTER TABLE `Interest` DROP FOREIGN KEY `Interest_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Talk` DROP FOREIGN KEY `Talk_studentId_fkey`;

-- AlterTable
ALTER TABLE `Action` DROP COLUMN `studentId`;

-- AlterTable
ALTER TABLE `Interest` DROP COLUMN `userId`;

-- AlterTable
ALTER TABLE `Talk` DROP COLUMN `studentId`;

-- CreateTable
CREATE TABLE `_ActionToStudent` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ActionToStudent_AB_unique`(`A`, `B`),
    INDEX `_ActionToStudent_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_StudentToTalk` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_StudentToTalk_AB_unique`(`A`, `B`),
    INDEX `_StudentToTalk_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_InterestToUser` (
    `A` VARCHAR(191) NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_InterestToUser_AB_unique`(`A`, `B`),
    INDEX `_InterestToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ActionToStudent` ADD CONSTRAINT `_ActionToStudent_A_fkey` FOREIGN KEY (`A`) REFERENCES `Action`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ActionToStudent` ADD CONSTRAINT `_ActionToStudent_B_fkey` FOREIGN KEY (`B`) REFERENCES `Student`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_StudentToTalk` ADD CONSTRAINT `_StudentToTalk_A_fkey` FOREIGN KEY (`A`) REFERENCES `Student`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_StudentToTalk` ADD CONSTRAINT `_StudentToTalk_B_fkey` FOREIGN KEY (`B`) REFERENCES `Talk`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_InterestToUser` ADD CONSTRAINT `_InterestToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `Interest`(`name`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_InterestToUser` ADD CONSTRAINT `_InterestToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
