-- AlterTable
ALTER TABLE "letters" ADD COLUMN     "accessPassword" TEXT,
ADD COLUMN     "expiresAt" TIMESTAMP(3),
ADD COLUMN     "isPublic" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "maxViews" INTEGER,
ADD COLUMN     "viewCount" INTEGER NOT NULL DEFAULT 0;
