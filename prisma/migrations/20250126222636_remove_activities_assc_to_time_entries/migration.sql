/*
  Warnings:

  - You are about to drop the column `activity_id` on the `time_entries` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "time_entries" DROP CONSTRAINT "time_entries_activity_id_fkey";

-- DropIndex
DROP INDEX "time_entries_activity_id_idx";

-- AlterTable
ALTER TABLE "time_entries" DROP COLUMN "activity_id";
