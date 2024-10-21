/*
  Warnings:

  - Added the required column `google_drive_link` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `transaction` ADD COLUMN `google_drive_link` VARCHAR(191) NOT NULL;
