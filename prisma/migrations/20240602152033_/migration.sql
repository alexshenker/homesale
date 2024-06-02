/*
  Warnings:

  - The values [No,All] on the enum `Pets` will be removed. If these variants are still used in the database, this will fail.
  - Changed the column `pets` on the `Property` table from a scalar field to a list field. If there are non-null values in that column, this step will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Pets_new" AS ENUM ('None', 'Cats', 'SmallDogs', 'LargeDogs');
ALTER TABLE "Property" ALTER COLUMN "pets" TYPE "Pets_new"[] USING ("pets"::text::"Pets_new"[]);
ALTER TYPE "Pets" RENAME TO "Pets_old";
ALTER TYPE "Pets_new" RENAME TO "Pets";
DROP TYPE "Pets_old";
COMMIT;

-- AlterTable
ALTER TABLE "Property" ALTER COLUMN "pets" SET DATA TYPE "Pets"[];
