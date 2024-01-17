/*
  Warnings:

  - Added the required column `forgot_Password_Expiry` to the `user_profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `forgot_Password_Token` to the `user_profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_profile" ADD COLUMN     "forgot_Password_Expiry" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "forgot_Password_Token" TEXT NOT NULL;
