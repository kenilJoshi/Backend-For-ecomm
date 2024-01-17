-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
