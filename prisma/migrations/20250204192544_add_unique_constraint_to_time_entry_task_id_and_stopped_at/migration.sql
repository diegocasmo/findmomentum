/*
  Warnings:

  - A unique constraint covering the columns `[task_id,stopped_at]` on the table `time_entries` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "time_entries_task_id_stopped_at_key" ON "time_entries"("task_id", "stopped_at");
