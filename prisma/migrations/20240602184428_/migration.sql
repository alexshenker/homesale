-- CreateEnum
CREATE TYPE "ListingStatus" AS ENUM ('for_sale', 'for_rent', 'sold', 'pending', 'rented');

-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "acres" INTEGER,
ADD COLUMN     "listing_status" "ListingStatus";
