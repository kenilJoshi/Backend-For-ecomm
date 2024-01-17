-- AlterTable
ALTER TABLE "user_profile" ALTER COLUMN "forgot_Password_Expiry" SET DEFAULT ('0000-00-00 00:00:00'),
ALTER COLUMN "forgot_Password_Expiry" SET DATA TYPE TIMESTAMP(0);
