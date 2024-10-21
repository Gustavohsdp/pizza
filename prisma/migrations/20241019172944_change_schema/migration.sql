/*
  Warnings:

  - You are about to drop the `pizza_customizations` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `customizations` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `pizza_customizations` DROP FOREIGN KEY `pizza_customizations_customizeId_fkey`;

-- DropForeignKey
ALTER TABLE `pizza_customizations` DROP FOREIGN KEY `pizza_customizations_pizzaId_fkey`;

-- DropTable
DROP TABLE `pizza_customizations`;

-- CreateTable
CREATE TABLE `_PizzaCustomizations` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_PizzaCustomizations_AB_unique`(`A`, `B`),
    INDEX `_PizzaCustomizations_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `customizations_name_key` ON `customizations`(`name`);

-- AddForeignKey
ALTER TABLE `_PizzaCustomizations` ADD CONSTRAINT `_PizzaCustomizations_A_fkey` FOREIGN KEY (`A`) REFERENCES `customizations`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PizzaCustomizations` ADD CONSTRAINT `_PizzaCustomizations_B_fkey` FOREIGN KEY (`B`) REFERENCES `pizzas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
