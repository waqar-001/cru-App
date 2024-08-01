-- CreateTable
CREATE TABLE "MyRecords" (
    "id" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "isOnline" BOOLEAN NOT NULL DEFAULT false,
    "Class" TEXT,
    "userId" BIGINT,
    "email" TEXT,

    CONSTRAINT "MyRecords_pkey" PRIMARY KEY ("id")
);
