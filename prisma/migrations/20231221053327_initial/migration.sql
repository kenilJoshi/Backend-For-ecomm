/*
  Warnings:

  - The `id` column on the `profile` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `picture_id` to the `profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "profile" ADD COLUMN     "picture_id" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "profile_pkey" PRIMARY KEY ("id");
