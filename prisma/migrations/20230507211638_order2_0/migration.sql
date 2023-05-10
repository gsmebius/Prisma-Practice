-- DropForeignKey
ALTER TABLE "orderDetail" DROP CONSTRAINT "orderDetail_orderId_fkey";

-- AddForeignKey
ALTER TABLE "orderDetail" ADD CONSTRAINT "orderDetail_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
