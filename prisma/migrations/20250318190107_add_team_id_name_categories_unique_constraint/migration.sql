/*
  Warnings:

  - You are about to drop the column `deleted_at` on the `categories` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[team_id,name]` on the table `categories` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "categories_user_id_team_id_deleted_at_idx";

-- AlterTable
ALTER TABLE "categories" DROP COLUMN "deleted_at";

-- CreateIndex
CREATE INDEX "categories_user_id_team_id_idx" ON "categories"("user_id", "team_id");

-- CreateIndex
CREATE UNIQUE INDEX "categories_team_id_name_key" ON "categories"("team_id", "name");
