/*
  Warnings:

  - You are about to drop the `user_likes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "user_likes" DROP CONSTRAINT "user_likes_tweetId_fkey";

-- DropForeignKey
ALTER TABLE "user_likes" DROP CONSTRAINT "user_likes_userId_fkey";

-- DropTable
DROP TABLE "user_likes";

-- CreateTable
CREATE TABLE "likes" (
    "id" SERIAL NOT NULL,
    "userId" UUID,
    "tweetId" UUID,

    CONSTRAINT "likes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_tweetId_fkey" FOREIGN KEY ("tweetId") REFERENCES "tweet"("id") ON DELETE SET NULL ON UPDATE CASCADE;
