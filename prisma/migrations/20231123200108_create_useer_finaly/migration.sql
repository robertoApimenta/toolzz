-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "status" BOOLEAN DEFAULT true,
ADD COLUMN     "updatedAt" TIMESTAMP(3);
