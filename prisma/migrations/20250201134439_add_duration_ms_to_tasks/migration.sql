/*
  Warnings:

  - Added the required column `duration_ms` to the `tasks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tasks" ADD COLUMN     "duration_ms" INTEGER NOT NULL;
