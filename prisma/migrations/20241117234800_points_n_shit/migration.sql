-- DropForeignKey
ALTER TABLE `Interest` DROP FOREIGN KEY `Interest_userId_fkey`;

-- AlterTable
ALTER TABLE `Interest` MODIFY `userId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Interest` ADD CONSTRAINT `Interest_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
