-- CreateTable
CREATE TABLE "product" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "description" VARCHAR NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);
