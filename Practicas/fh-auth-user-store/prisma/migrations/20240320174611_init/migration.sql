-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN_ROLE', 'USER_ROLE');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "email_validated" BOOLEAN,
    "password" TEXT NOT NULL,
    "img" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER_ROLE',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
