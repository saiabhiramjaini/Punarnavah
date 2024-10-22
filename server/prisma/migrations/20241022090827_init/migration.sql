-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WasteRequest" (
    "id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "requiredQuantity" INTEGER NOT NULL,
    "remainingQuantity" INTEGER NOT NULL,
    "quantityUnit" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "WasteRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contribution" (
    "id" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "pincode" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "wasteRequestId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Contribution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InnovativeProduct" (
    "id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,
    "materialsUsed" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "InnovativeProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InnovativeProdOrder" (
    "id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "mobile" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "pincode" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'processing',
    "innovativeProductId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "InnovativeProdOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SatisfiedWasteReqOrder" (
    "id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "mobile" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "pincode" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'processing',
    "satisfiedWasteReqId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "SatisfiedWasteReqOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BulkWaste" (
    "id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "quantityAvailable" INTEGER NOT NULL,
    "quantityUnit" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "BulkWaste_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BulkWasteOrder" (
    "id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "mobile" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "pincode" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'processing',
    "bulkWasteId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "BulkWasteOrder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "WasteRequest" ADD CONSTRAINT "WasteRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contribution" ADD CONSTRAINT "Contribution_wasteRequestId_fkey" FOREIGN KEY ("wasteRequestId") REFERENCES "WasteRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contribution" ADD CONSTRAINT "Contribution_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InnovativeProduct" ADD CONSTRAINT "InnovativeProduct_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InnovativeProdOrder" ADD CONSTRAINT "InnovativeProdOrder_innovativeProductId_fkey" FOREIGN KEY ("innovativeProductId") REFERENCES "InnovativeProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InnovativeProdOrder" ADD CONSTRAINT "InnovativeProdOrder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SatisfiedWasteReqOrder" ADD CONSTRAINT "SatisfiedWasteReqOrder_satisfiedWasteReqId_fkey" FOREIGN KEY ("satisfiedWasteReqId") REFERENCES "WasteRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SatisfiedWasteReqOrder" ADD CONSTRAINT "SatisfiedWasteReqOrder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BulkWasteOrder" ADD CONSTRAINT "BulkWasteOrder_bulkWasteId_fkey" FOREIGN KEY ("bulkWasteId") REFERENCES "BulkWaste"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BulkWasteOrder" ADD CONSTRAINT "BulkWasteOrder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
