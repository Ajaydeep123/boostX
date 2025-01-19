/*
  Warnings:

  - Added the required column `assumeRoleArn` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Made the column `awsAccountId` on table `Account` required. This step will fail if there are existing NULL values in that column.
  - Made the column `externalId` on table `Account` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Account_externalId_key";

-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "assumeRoleArn" TEXT NOT NULL,
ALTER COLUMN "awsAccountId" SET NOT NULL,
ALTER COLUMN "externalId" SET NOT NULL;
