/*
  Warnings:

  - You are about to drop the column `defaultEventDuration` on the `UserPreferences` table. All the data in the column will be lost.
  - You are about to drop the column `notificationPreference` on the `UserPreferences` table. All the data in the column will be lost.
  - Added the required column `eventDuration` to the `UserPreferences` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Theme" AS ENUM ('DARK', 'LIGHT', 'SYSTEM');

-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "endTime" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "UserPreferences" DROP COLUMN "defaultEventDuration",
DROP COLUMN "notificationPreference",
ADD COLUMN     "eventDuration" INTEGER NOT NULL,
ADD COLUMN     "notifications" JSONB,
ADD COLUMN     "preferredMeetingTimes" JSONB,
ADD COLUMN     "theme" "Theme",
ADD COLUMN     "timeZone" TEXT,
ADD COLUMN     "workingHours" JSONB;
