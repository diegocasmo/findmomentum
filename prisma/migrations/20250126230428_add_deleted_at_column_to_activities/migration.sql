-- AlterTable
ALTER TABLE "activities" ADD COLUMN     "deleted_at" TIMESTAMPTZ;

-- CreateIndex
CREATE INDEX "activities_deleted_at_idx" ON "activities"("deleted_at");
