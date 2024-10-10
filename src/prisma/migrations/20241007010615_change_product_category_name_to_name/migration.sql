/*
  Warnings:

  - You are about to drop the column `product_category_name` on the `product_category` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `product_category` DROP COLUMN `product_category_name`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL DEFAULT 'Product Category';
