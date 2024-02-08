-- DropIndex
DROP INDEX `Order_Detail_orderId_fkey` ON `order_detail`;

-- AddForeignKey
ALTER TABLE `Order_Detail` ADD CONSTRAINT `Order_Detail_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
