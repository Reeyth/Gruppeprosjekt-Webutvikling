-- CreateTable
CREATE TABLE "employee" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "rules" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "employee_id_key" ON "employee"("id");
