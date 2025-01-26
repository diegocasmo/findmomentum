-- AlterTable
ALTER TABLE "activities" ADD COLUMN     "completedAt" TIMESTAMPTZ;

-- CreateIndex
CREATE INDEX "activities_completedAt_idx" ON "activities"("completedAt");
