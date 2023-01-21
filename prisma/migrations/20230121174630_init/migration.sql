/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Post";

-- CreateTable
CREATE TABLE "post" (
    "id" UUID NOT NULL,

    CONSTRAINT "post_pkey" PRIMARY KEY ("id")
);
