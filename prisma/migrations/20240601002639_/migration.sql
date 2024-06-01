-- CreateEnum
CREATE TYPE "ListingType" AS ENUM ('sell', 'rent');

-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "listing_type" "ListingType";
