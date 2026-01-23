-- AlterTable
ALTER TABLE "activities" ADD COLUMN     "bookmarked_at" TIMESTAMPTZ;

-- CreateIndex
CREATE INDEX "activities_user_id_deleted_at_bookmarked_at_idx" ON "activities"("user_id", "deleted_at", "bookmarked_at");
