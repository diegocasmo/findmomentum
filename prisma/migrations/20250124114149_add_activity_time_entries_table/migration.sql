/*
  Warnings:

  - Added the required column `duration_ms` to the `activities` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "activities" ADD COLUMN     "duration_ms" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "time_entries" (
    "id" TEXT NOT NULL,
    "activity_id" TEXT NOT NULL,
    "started_at" TIMESTAMPTZ NOT NULL,
    "elapsed_ms" INTEGER,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ,

    CONSTRAINT "time_entries_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "time_entries" ADD CONSTRAINT "time_entries_activity_id_fkey" FOREIGN KEY ("activity_id") REFERENCES "activities"("id") ON DELETE CASCADE ON UPDATE CASCADE;
