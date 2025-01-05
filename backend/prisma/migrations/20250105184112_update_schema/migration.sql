/*
  Warnings:

  - The values [Email,Push,Sms] on the enum `ReminderMethod` will be removed. If these variants are still used in the database, this will fail.
  - The values [Pending,Sent,Dismissed] on the enum `ReminderStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [High,Meduim,Low] on the enum `TensityLevels` will be removed. If these variants are still used in the database, this will fail.
  - You are about to alter the column `title` on the `Event` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(2200)`.
  - You are about to alter the column `email` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `firstname` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `lastname` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `password` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ReminderMethod_new" AS ENUM ('EMAIL', 'PUSH', 'SMS');
ALTER TABLE "Reminder" ALTER COLUMN "reminderMethod" TYPE "ReminderMethod_new" USING ("reminderMethod"::text::"ReminderMethod_new");
ALTER TYPE "ReminderMethod" RENAME TO "ReminderMethod_old";
ALTER TYPE "ReminderMethod_new" RENAME TO "ReminderMethod";
DROP TYPE "ReminderMethod_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "ReminderStatus_new" AS ENUM ('PENDING', 'SENT', 'CANCELLED');
ALTER TABLE "Reminder" ALTER COLUMN "status" TYPE "ReminderStatus_new" USING ("status"::text::"ReminderStatus_new");
ALTER TYPE "ReminderStatus" RENAME TO "ReminderStatus_old";
ALTER TYPE "ReminderStatus_new" RENAME TO "ReminderStatus";
DROP TYPE "ReminderStatus_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "TensityLevels_new" AS ENUM ('HIGH', 'MEDIUM', 'LOW');
ALTER TABLE "Event" ALTER COLUMN "tensityLevel" TYPE "TensityLevels_new" USING ("tensityLevel"::text::"TensityLevels_new");
ALTER TYPE "TensityLevels" RENAME TO "TensityLevels_old";
ALTER TYPE "TensityLevels_new" RENAME TO "TensityLevels";
DROP TYPE "TensityLevels_old";
COMMIT;

-- AlterTable
ALTER TABLE "Analytics" ALTER COLUMN "date" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "eventDurationSummary" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "title" SET DATA TYPE VARCHAR(2200);

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "email" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "firstname" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "lastname" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "password" SET DATA TYPE VARCHAR(100);
