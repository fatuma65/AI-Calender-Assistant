-- CreateEnum
CREATE TYPE "Category" AS ENUM ('WORK', 'PERSONAL', 'SCHOOL', 'BUSINESS', 'CHURCH');

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "password" DROP NOT NULL;
