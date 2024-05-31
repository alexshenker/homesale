/*
  Warnings:

  - You are about to drop the `PropertyAddress` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[street_address,apartment,zipCode,zipCodeExt,city,state]` on the table `Property` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `city` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street_address` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zipCode` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zipCodeExt` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PropertyAddress" DROP CONSTRAINT "PropertyAddress_propertyId_fkey";

-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "apartment" TEXT,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "state" "States" NOT NULL,
ADD COLUMN     "street_address" TEXT NOT NULL,
ADD COLUMN     "zipCode" VARCHAR(5) NOT NULL,
ADD COLUMN     "zipCodeExt" VARCHAR(4) NOT NULL;

-- DropTable
DROP TABLE "PropertyAddress";

-- CreateIndex
CREATE UNIQUE INDEX "Property_street_address_apartment_zipCode_zipCodeExt_city_s_key" ON "Property"("street_address", "apartment", "zipCode", "zipCodeExt", "city", "state");
