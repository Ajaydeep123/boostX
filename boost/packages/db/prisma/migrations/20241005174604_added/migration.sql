/*
  Warnings:

  - You are about to drop the column `externalId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[externalId]` on the table `Account` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "RoleType" AS ENUM ('READONLY', 'FULLACCESS');

-- DropIndex
DROP INDEX "User_externalId_key";

-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "externalId" TEXT,
ADD COLUMN     "roleType" "RoleType" NOT NULL DEFAULT 'READONLY';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "externalId";

-- CreateIndex
CREATE UNIQUE INDEX "Account_externalId_key" ON "Account"("externalId");
