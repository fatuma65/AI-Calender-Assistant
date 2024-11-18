-- AlterTable
ALTER TABLE "Analytics" ALTER COLUMN "recurrencePatternSummary" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "location" DROP NOT NULL,
ALTER COLUMN "recurrencePattern" DROP NOT NULL;

-- AlterTable
ALTER TABLE "LocationData" ALTER COLUMN "location" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Reminder" ALTER COLUMN "reminderMethod" DROP NOT NULL,
ALTER COLUMN "status" DROP NOT NULL;

-- AlterTable
ALTER TABLE "UserPreferences" ALTER COLUMN "notificationPreference" DROP NOT NULL,
ALTER COLUMN "colorCodingPreferences" DROP NOT NULL,
ALTER COLUMN "recurrencePatternSummary" DROP NOT NULL;
