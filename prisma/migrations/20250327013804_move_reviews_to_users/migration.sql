/*
  Warnings:

  - You are about to drop the column `userId` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `vehicleId` on the `Review` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipientId` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_userId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_vehicleId_fkey";

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "userId",
DROP COLUMN "vehicleId",
ADD COLUMN     "authorId" INTEGER NOT NULL,
ADD COLUMN     "recipientId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
