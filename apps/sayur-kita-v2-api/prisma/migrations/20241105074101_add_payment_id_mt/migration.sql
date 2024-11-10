/*
  Warnings:

  - Added the required column `payment_id_MT` to the `Payments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sayurkita"."Payments" ADD COLUMN     "payment_id_MT" TEXT NOT NULL;
