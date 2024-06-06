-- CreateTable
CREATE TABLE "Developer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "sexo" TEXT NOT NULL,
    "data_nascimento" DATETIME NOT NULL,
    "idade" INTEGER NOT NULL,
    "hobby" TEXT NOT NULL,
    "nivel_id" INTEGER NOT NULL,
    CONSTRAINT "Developer_nivel_id_fkey" FOREIGN KEY ("nivel_id") REFERENCES "Nivel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Nivel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nivel" TEXT NOT NULL
);
