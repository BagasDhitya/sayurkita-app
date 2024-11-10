/*
  Warnings:

  - You are about to drop the column `transaction_id` on the `Payments` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[transactionId]` on the table `Payments` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `transactionId` to the `Payments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "sayurkita"."Payments" DROP CONSTRAINT "Payments_transaction_id_fkey";

-- DropIndex
DROP INDEX "sayurkita"."Payments_transaction_id_key";

-- AlterTable
ALTER TABLE "sayurkita"."Payments" DROP COLUMN "transaction_id",
ADD COLUMN     "transactionId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Payments_transactionId_key" ON "sayurkita"."Payments"("transactionId");

-- AddForeignKey
ALTER TABLE "sayurkita"."Payments" ADD CONSTRAINT "Payments_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "sayurkita"."Transactions"("transaction_id") ON DELETE RESTRICT ON UPDATE CASCADE;
