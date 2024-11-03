-- DropForeignKey
ALTER TABLE "Quiz" DROP CONSTRAINT "Quiz_creatorId_fkey";

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("clerkId") ON DELETE CASCADE ON UPDATE CASCADE;
