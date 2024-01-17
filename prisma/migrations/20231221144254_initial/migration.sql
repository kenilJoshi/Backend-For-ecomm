/*
  Warnings:

  - You are about to drop the column `secureUrl` on the `profile` table. All the data in the column will be lost.
  - Added the required column `secure_url` to the `profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "profile" DROP COLUMN "secureUrl",
ADD COLUMN     "secure_url" TEXT NOT NULL;
