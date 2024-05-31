/*
  Warnings:

  - A unique constraint covering the columns `[mapboxPlaceId]` on the table `Property` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `mapboxPlaceId` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "mapboxPlaceId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Property_mapboxPlaceId_key" ON "Property"("mapboxPlaceId");
