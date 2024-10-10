-- DropIndex
DROP INDEX `Stock_product_id_fkey` ON `stock`;

-- AlterTable
ALTER TABLE `product_category` ADD COLUMN `parent_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Product_Category` ADD CONSTRAINT `Product_Category_parent_id_fkey` FOREIGN KEY (`parent_id`) REFERENCES `Product_Category`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
