/*
  Warnings:

  - You are about to drop the column `profileImage` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Comment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_nickname_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_profileImage_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_userId_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "profileImage",
DROP COLUMN "userId";

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_nickname_fkey" FOREIGN KEY ("nickname") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
