-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "team_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "deleted_at" TIMESTAMPTZ,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activity_categories" (
    "id" TEXT NOT NULL,
    "activity_id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ,

    CONSTRAINT "activity_categories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "categories_user_id_team_id_deleted_at_idx" ON "categories"("user_id", "team_id", "deleted_at");

-- CreateIndex
CREATE UNIQUE INDEX "categories_team_id_name_deleted_at_key" ON "categories"("team_id", "name", "deleted_at");

-- CreateIndex
CREATE INDEX "activity_categories_activity_id_category_id_idx" ON "activity_categories"("activity_id", "category_id");

-- CreateIndex
CREATE UNIQUE INDEX "activity_categories_activity_id_category_id_key" ON "activity_categories"("activity_id", "category_id");

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity_categories" ADD CONSTRAINT "activity_categories_activity_id_fkey" FOREIGN KEY ("activity_id") REFERENCES "activities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity_categories" ADD CONSTRAINT "activity_categories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
