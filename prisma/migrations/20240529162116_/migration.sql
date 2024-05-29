-- CreateEnum
CREATE TYPE "Pets" AS ENUM ('No', 'Cats', 'SmallDogs', 'LargeDogs');

-- CreateEnum
CREATE TYPE "NamePrefix" AS ENUM ('Mr', 'Mrs', 'Ms', 'Miss', 'Dr', 'Rev', 'Sir');

-- CreateEnum
CREATE TYPE "NameSuffix" AS ENUM ('Jr', 'Sr', 'II', 'III', 'IV');

-- CreateEnum
CREATE TYPE "PropertyTypes" AS ENUM ('apartment', 'condo', 'coop', 'house', 'multi_family_home', 'duplex', 'triplex', 'townhouse', 'land', 'commercial_property', 'industrial_property');

-- CreateEnum
CREATE TYPE "Amenities" AS ENUM ('Laundry_Washer', 'Laundry_Dryer', 'Cooling_Central', 'Cooling_WallUnit', 'Cooling_WindowUnit', 'Heating_Baseboard', 'Heating_ForcedAir', 'Heating_HeatPump', 'Heating_WallUnit', 'Appliances_Dishwasher', 'Appliances_Refrigerator', 'Appliances_Microwave', 'Appliances_Oven', 'Appliances_ElectricStove', 'Appliances_GasStove', 'Outdoor_Balcony', 'Outdoor_Deck', 'Outdoor_Rooftop', 'Outdoor_Patio', 'Outdoor_Waterfront', 'Outdoor_Beachfront', 'Storage_BicycleStorage', 'Storage_StorageSpace', 'Accessibility_Elevator', 'Accessibility_DisabilityAccessible', 'Other_Garage', 'Other_Pool', 'Other_Gym', 'Other_ChildrensPlayroom', 'Other_EVChargingStation', 'Other_Doorman');

-- CreateEnum
CREATE TYPE "Utilities" AS ENUM ('water', 'electric', 'gas', 'internet', 'cable', 'heating', 'airConditioning');

-- CreateEnum
CREATE TYPE "States" AS ENUM ('AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY', 'DC', 'AS', 'GU', 'MP', 'PR', 'VI');

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonalInfo" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "firstName" TEXT,
    "middleName" TEXT,
    "lastName" TEXT,
    "prefix" "NamePrefix",
    "suffix" "NameSuffix",
    "cellNumber" TEXT,

    CONSTRAINT "PersonalInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Property" (
    "id" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,
    "hiddenFromView" BOOLEAN NOT NULL DEFAULT false,
    "price" DOUBLE PRECISION,
    "rent" DOUBLE PRECISION,
    "leaseDurationMonths" INTEGER NOT NULL,
    "description" TEXT,
    "propertyType" "PropertyTypes" NOT NULL,
    "amenities" "Amenities"[],
    "otherAmenities" TEXT,
    "utilities" "Utilities"[],
    "otherUtilities" TEXT,
    "squareFeet" INTEGER,
    "bedrooms" INTEGER,
    "bathrooms" DOUBLE PRECISION,
    "numberOfFloors" INTEGER,
    "basement" BOOLEAN,
    "yearBuilt" INTEGER,
    "lastRoofReplacementDate" TIMESTAMP(3),
    "dateAvailable" TIMESTAMP(3),
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PropertyAddress" (
    "id" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "street_address" TEXT NOT NULL,
    "apartment" TEXT,
    "zipCode" VARCHAR(5) NOT NULL,
    "zipCodeExt" VARCHAR(4) NOT NULL,
    "city" TEXT NOT NULL,
    "state" "States" NOT NULL,

    CONSTRAINT "PropertyAddress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PersonalInfo_userId_key" ON "PersonalInfo"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PersonalInfo_cellNumber_key" ON "PersonalInfo"("cellNumber");

-- CreateIndex
CREATE UNIQUE INDEX "PropertyAddress_propertyId_key" ON "PropertyAddress"("propertyId");

-- CreateIndex
CREATE UNIQUE INDEX "PropertyAddress_street_address_apartment_zipCode_zipCodeExt_key" ON "PropertyAddress"("street_address", "apartment", "zipCode", "zipCodeExt", "city", "state");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonalInfo" ADD CONSTRAINT "PersonalInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "Property_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PropertyAddress" ADD CONSTRAINT "PropertyAddress_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
