-- DropIndex
DROP INDEX "tasks_activity_id_position_created_at_idx";

-- CreateIndex
CREATE INDEX "tasks_activity_id_position_idx" ON "tasks"("activity_id", "position");
