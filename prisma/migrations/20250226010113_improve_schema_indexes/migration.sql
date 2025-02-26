-- DropIndex
DROP INDEX "activities_completedAt_idx";

-- DropIndex
DROP INDEX "activities_deleted_at_idx";

-- DropIndex
DROP INDEX "activities_team_id_idx";

-- DropIndex
DROP INDEX "activities_user_id_idx";

-- DropIndex
DROP INDEX "tasks_activity_id_idx";

-- DropIndex
DROP INDEX "tasks_completed_at_idx";

-- DropIndex
DROP INDEX "tasks_deleted_at_idx";

-- DropIndex
DROP INDEX "time_entries_task_id_idx";

-- DropIndex
DROP INDEX "user_teams_role_idx";

-- DropIndex
DROP INDEX "user_teams_team_id_idx";

-- DropIndex
DROP INDEX "user_teams_user_id_idx";

-- CreateIndex
CREATE INDEX "activities_user_id_deleted_at_completedAt_idx" ON "activities"("user_id", "deleted_at", "completedAt");

-- CreateIndex
CREATE INDEX "activities_team_id_deleted_at_idx" ON "activities"("team_id", "deleted_at");

-- CreateIndex
CREATE INDEX "tasks_activity_id_deleted_at_completed_at_idx" ON "tasks"("activity_id", "deleted_at", "completed_at");

-- CreateIndex
CREATE INDEX "tasks_activity_id_created_at_idx" ON "tasks"("activity_id", "created_at");

-- CreateIndex
CREATE INDEX "time_entries_task_id_stopped_at_idx" ON "time_entries"("task_id", "stopped_at");

-- CreateIndex
CREATE INDEX "user_teams_user_id_role_idx" ON "user_teams"("user_id", "role");

-- CreateIndex
CREATE INDEX "verification_tokens_identifier_expires_idx" ON "verification_tokens"("identifier", "expires");
