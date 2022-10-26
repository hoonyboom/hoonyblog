-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_parentId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_profileImage_fkey";

-- AlterTable
ALTER TABLE "Like" ALTER COLUMN "likedCount" SET DEFAULT 1;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_profileImage_fkey" FOREIGN KEY ("profileImage") REFERENCES "User"("image") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
