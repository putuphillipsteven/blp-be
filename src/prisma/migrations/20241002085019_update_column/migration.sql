/*
  Warnings:

  - You are about to drop the column `product_group_id` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `product_image` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `product_status_id` on the `product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_product_group_id_fkey`;

-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_product_status_id_fkey`;

-- DropForeignKey
ALTER TABLE `stock` DROP FOREIGN KEY `Stock_product_id_fkey`;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `product_group_id`,
    DROP COLUMN `product_image`,
    DROP COLUMN `product_status_id`;
