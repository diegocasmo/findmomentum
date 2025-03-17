/*
  Warnings:

  - The existing unique constraint on team_id and name will be modified to only apply to non-deleted categories.
*/
-- DropIndex
DROP INDEX "categories_team_id_name_deleted_at_key";

-- CreateIndex
CREATE UNIQUE INDEX "categories_team_id_name_where_not_deleted_key"
ON "categories"("team_id", "name")
WHERE "deleted_at" IS NULL;
