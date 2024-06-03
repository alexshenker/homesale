-- AlterEnum
ALTER TYPE "ListingStatus" ADD VALUE 'off_market';

-- DropIndex
DROP INDEX "Property_listing_type_street_address_apartment_zipCode_zipC_key";

-- AlterTable
ALTER TABLE "Property" ADD COLUMN     "listing_status_last_updated" TIMESTAMP(3),
ADD COLUMN     "published_last" TIMESTAMP(3);
