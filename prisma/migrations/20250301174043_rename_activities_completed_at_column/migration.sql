-- 1. Add new column
ALTER TABLE "activities" ADD COLUMN "completed_at" TIMESTAMPTZ;

-- 2. Copy data
UPDATE "activities" SET "completed_at" = "completedAt";

-- 3. Create index on new column concurrently
CREATE INDEX "activities_user_id_deleted_at_completed_at_idx"
ON "activities"("user_id", "deleted_at", "completed_at");

-- 4. Drop old column
ALTER TABLE "activities" DROP COLUMN "completedAt";
