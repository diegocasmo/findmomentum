-- AlterTable
ALTER TABLE "activities" ADD COLUMN     "source_activity_id" TEXT;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_source_activity_id_fkey" FOREIGN KEY ("source_activity_id") REFERENCES "activities"("id") ON DELETE SET NULL ON UPDATE CASCADE;
