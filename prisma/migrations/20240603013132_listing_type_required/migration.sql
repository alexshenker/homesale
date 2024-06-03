/*
  Warnings:

  - A unique constraint covering the columns `[listing_type,street_address,apartment,zipCode,zipCodeExt,city,state]` on the table `Property` will be added. If there are existing duplicate values, this will fail.
  - Made the column `listing_type` on table `Property` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Property_street_address_apartment_zipCode_zipCodeExt_city_s_key";

-- AlterTable
ALTER TABLE "Property" ALTER COLUMN "listing_type" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Property_listing_type_street_address_apartment_zipCode_zipC_key" ON "Property"("listing_type", "street_address", "apartment", "zipCode", "zipCodeExt", "city", "state");
