/*
  Warnings:

  - A unique constraint covering the columns `[image]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `profileImage` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "profileImage" TEXT NOT NULL,
ADD COLUMN     "secret" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "User_image_key" ON "User"("image");

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_profileImage_fkey" FOREIGN KEY ("profileImage") REFERENCES "User"("image") ON DELETE RESTRICT ON UPDATE CASCADE;
