/*
  Warnings:

  - You are about to drop the column `sellerId` on the `Property` table. All the data in the column will be lost.
  - Added the required column `ownerId` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "Pets" ADD VALUE 'All';

-- DropForeignKey
ALTER TABLE "Property" DROP CONSTRAINT "Property_sellerId_fkey";

-- AlterTable
ALTER TABLE "Property" DROP COLUMN "sellerId",
ADD COLUMN     "ownerId" TEXT NOT NULL,
ADD COLUMN     "pets" "Pets",
ALTER COLUMN "leaseDurationMonths" DROP NOT NULL,
ALTER COLUMN "propertyType" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
