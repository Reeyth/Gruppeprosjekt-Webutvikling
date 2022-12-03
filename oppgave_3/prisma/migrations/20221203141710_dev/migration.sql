-- CreateTable
CREATE TABLE "Employee" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "rules" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Day" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "weekId" INTEGER NOT NULL,
    "lunchId" INTEGER NOT NULL,
    CONSTRAINT "Day_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Day_weekId_fkey" FOREIGN KEY ("weekId") REFERENCES "Week" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Day_lunchId_fkey" FOREIGN KEY ("lunchId") REFERENCES "Lunch" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Week" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Lunch" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Overwrite" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "employee" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee_id_key" ON "Employee"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Day_id_key" ON "Day"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Week_id_key" ON "Week"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Week_name_key" ON "Week"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Lunch_id_key" ON "Lunch"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Lunch_name_key" ON "Lunch"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Overwrite_id_key" ON "Overwrite"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Overwrite_employee_key" ON "Overwrite"("employee");
