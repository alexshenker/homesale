/*
  Warnings:

  - You are about to drop the column `hiddenFromView` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `lastRoofReplacementDate` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `ownerId` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `rent` on the `Property` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[HOA_bylaws_document_src]` on the table `Property` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[primaryPhoto]` on the table `Property` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[video]` on the table `Property` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[Deed_src]` on the table `Property` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `creatorId` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Property" DROP CONSTRAINT "Property_ownerId_fkey";

-- AlterTable
ALTER TABLE "Property" DROP COLUMN "hiddenFromView",
DROP COLUMN "lastRoofReplacementDate",
DROP COLUMN "ownerId",
DROP COLUMN "price",
DROP COLUMN "rent",
ADD COLUMN     "Deed_src" TEXT,
ADD COLUMN     "HOA_bylaws_document_src" TEXT,
ADD COLUMN     "HOA_monthly_fee" DOUBLE PRECISION,
ADD COLUMN     "Owner_ID_back_src" TEXT,
ADD COLUMN     "Owner_ID_front_src" TEXT,
ADD COLUMN     "Owner_first" TEXT,
ADD COLUMN     "Owner_last" TEXT,
ADD COLUMN     "Owner_middle" TEXT,
ADD COLUMN     "annual_property_tax" DOUBLE PRECISION,
ADD COLUMN     "creatorId" TEXT NOT NULL,
ADD COLUMN     "creator_confirmed_management_permission" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "creator_confirmed_management_permission_on_date" TIMESTAMP(3),
ADD COLUMN     "lastRoofReplacementYear" INTEGER,
ADD COLUMN     "photos" TEXT[],
ADD COLUMN     "primaryPhoto" TEXT,
ADD COLUMN     "published" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "rentPrice" DOUBLE PRECISION,
ADD COLUMN     "salePrice" DOUBLE PRECISION,
ADD COLUMN     "video" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Property_HOA_bylaws_document_src_key" ON "Property"("HOA_bylaws_document_src");

-- CreateIndex
CREATE UNIQUE INDEX "Property_primaryPhoto_key" ON "Property"("primaryPhoto");

-- CreateIndex
CREATE UNIQUE INDEX "Property_video_key" ON "Property"("video");

-- CreateIndex
CREATE UNIQUE INDEX "Property_Deed_src_key" ON "Property"("Deed_src");

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
