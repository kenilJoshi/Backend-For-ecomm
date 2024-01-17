/*
  Warnings:

  - You are about to alter the column `forgot_Password_Token` on the `user_profile` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "user_profile" ALTER COLUMN "forgot_Password_Token" SET DATA TYPE VARCHAR(255);
