/*
  Warnings:

  - You are about to drop the column `date` on the `transaction` table. All the data in the column will be lost.
  - You are about to drop the column `avatar` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `branch_id` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `full_name` on the `user` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_branch_id_fkey`;

-- AlterTable
ALTER TABLE `transaction` DROP COLUMN `date`,
    ADD COLUMN `cashier_id` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `deleted_at` DATETIME(3) NULL,
    ADD COLUMN `updated_at` DATETIME(3) NULL,
    MODIFY `user_id` INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `avatar`,
    DROP COLUMN `branch_id`,
    DROP COLUMN `full_name`,
    ADD COLUMN `avatar_url` VARCHAR(191) NULL,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `deleted_at` DATETIME(3) NULL,
    ADD COLUMN `first_name` VARCHAR(191) NOT NULL DEFAULT 'First Name',
    ADD COLUMN `last_name` VARCHAR(191) NULL,
    ADD COLUMN `phone_number` VARCHAR(191) NOT NULL DEFAULT '081234567890',
    ADD COLUMN `second_phone_number` VARCHAR(191) NULL,
    ADD COLUMN `updated_at` DATETIME(3) NULL,
    MODIFY `password` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_cashier_id_fkey` FOREIGN KEY (`cashier_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
