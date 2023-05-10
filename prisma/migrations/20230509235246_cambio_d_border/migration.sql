/*
  Warnings:

  - You are about to drop the column `orderDetailId` on the `order` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_orderDetailId_fkey";

-- AlterTable
ALTER TABLE "order" DROP COLUMN "orderDetailId";

-- AddForeignKey
ALTER TABLE "orderDetail" ADD CONSTRAINT "orderDetail_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
