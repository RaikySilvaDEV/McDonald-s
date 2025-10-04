/*
  Warnings:

  - A unique constraint covering the columns `[name,restaurantId]` on the table `MenuCategory` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,menuCategoryId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "MenuCategory_name_restaurantId_key" ON "MenuCategory"("name", "restaurantId");

-- CreateIndex
CREATE UNIQUE INDEX "Product_name_menuCategoryId_key" ON "Product"("name", "menuCategoryId");
