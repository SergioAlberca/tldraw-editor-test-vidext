-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT 'default',
    "data" JSONB NOT NULL,
    "updatedAt" DATETIME NOT NULL
);
