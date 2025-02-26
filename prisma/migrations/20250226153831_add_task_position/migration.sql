/*
  Warnings:

  - A unique constraint covering the columns `[activity_id,position]` on the table `tasks` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "tasks_activity_id_created_at_idx";

-- AlterTable
ALTER TABLE "tasks" ADD COLUMN     "position" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- UpdateData
WITH ranked_tasks AS (
  SELECT
    id,
    activity_id,
    ROW_NUMBER() OVER (PARTITION BY activity_id ORDER BY created_at) as row_num
  FROM "tasks"
)
UPDATE "tasks"
SET position = ranked_tasks.row_num
FROM ranked_tasks
WHERE "tasks".id = ranked_tasks.id;

-- CreateIndex
CREATE INDEX "tasks_activity_id_position_created_at_idx" ON "tasks"("activity_id", "position", "created_at");

-- CreateIndex
CREATE UNIQUE INDEX "tasks_activity_id_position_key" ON "tasks"("activity_id", "position");
