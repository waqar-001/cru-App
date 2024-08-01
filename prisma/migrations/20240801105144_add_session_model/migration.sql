/*
  Warnings:

  - You are about to drop the column `sessionToken` on the `Session` table. All the data in the column will be lost.
  - The `userId` column on the `Session` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `accessToken` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shop` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropIndex
DROP INDEX "Session_sessionToken_key";

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "sessionToken",
ADD COLUMN     "accessToken" TEXT NOT NULL,
ADD COLUMN     "accountOwner" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "collaborator" BOOLEAN DEFAULT false,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "emailVerified" BOOLEAN DEFAULT false,
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "isOnline" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "locale" TEXT,
ADD COLUMN     "scope" TEXT,
ADD COLUMN     "shop" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" BIGINT,
ALTER COLUMN "expires" DROP NOT NULL;

-- DropTable
DROP TABLE "User";
