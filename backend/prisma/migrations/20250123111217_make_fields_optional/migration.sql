/*
  Warnings:

  - The `category` column on the `Event` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "category",
ADD COLUMN     "category" "Category";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "email" DROP NOT NULL;
