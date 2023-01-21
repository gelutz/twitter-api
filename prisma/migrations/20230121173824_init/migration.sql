-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL DEFAULT (concat('usr_', gen_random_uuid()))::TEXT,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);
