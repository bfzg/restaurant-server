-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `openid` VARCHAR(191) NULL,
    `name` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `sex` ENUM('MAN', 'WOMAN', 'ET') NOT NULL,
    `avatar` VARCHAR(191) NULL,
    `city` VARCHAR(191) NULL,
    `status` ENUM('GENERAL_USER', 'ADMIN_USER', 'SUPER_ADMIN_USER') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Address` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `address_detail` VARCHAR(191) NOT NULL,
    `sex` ENUM('MAN', 'WOMAN', 'ET') NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Dish` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL,
    `price` DOUBLE NOT NULL,
    `old_price` DOUBLE NULL,
    `spec` VARCHAR(191) NOT NULL,
    `category_id` VARCHAR(191) NULL,
    `image` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `tag` VARCHAR(191) NULL,
    `month_saled` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Categroy` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `sort` INTEGER NOT NULL,
    `status` BOOLEAN NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order` (
    `id` VARCHAR(191) NOT NULL,
    `play_method` ENUM('WEICHAT', 'ALIPAY', 'CASH') NOT NULL,
    `quantity` INTEGER NOT NULL,
    `address_id` VARCHAR(191) NOT NULL,
    `total_price` DOUBLE NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `shipping_fee` DOUBLE NOT NULL,
    `status` ENUM('PAYMENT_SUCCESS', 'PAYMENT_FAILED', 'PAYMENT_PENDING', 'PAYMENT_WAITINGF', 'SUCCESS', 'CABCEL', 'DELIVERING', 'RECEIVED') NOT NULL,
    `tableware_status` INTEGER NOT NULL,
    `estimated_delivery_time` VARCHAR(191) NULL,
    `remark` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order_Detail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `orderId` VARCHAR(191) NULL,
    `dish_id` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Order_Detail` ADD CONSTRAINT `Order_Detail_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
