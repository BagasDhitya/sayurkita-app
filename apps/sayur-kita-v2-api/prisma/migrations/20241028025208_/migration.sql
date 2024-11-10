/*
  Warnings:

  - You are about to drop the column `oauth_token` on the `Users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[googleId]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "sayurkita"."Users" DROP COLUMN "oauth_token",
ADD COLUMN     "access_token" TEXT,
ADD COLUMN     "googleId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Users_googleId_key" ON "sayurkita"."Users"("googleId");
