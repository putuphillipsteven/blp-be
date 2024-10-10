-- DropForeignKey
ALTER TABLE `transaction_detail` DROP FOREIGN KEY `Transaction_Detail_cart_id_fkey`;

-- AlterTable
ALTER TABLE `transaction_detail` MODIFY `cart_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Transaction_Detail` ADD CONSTRAINT `Transaction_Detail_cart_id_fkey` FOREIGN KEY (`cart_id`) REFERENCES `Cart`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
