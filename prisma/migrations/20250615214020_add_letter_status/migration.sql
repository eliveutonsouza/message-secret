-- CreateEnum
CREATE TYPE "LetterStatus" AS ENUM ('DRAFT', 'ACTIVE', 'ARCHIVED');

-- AlterTable
ALTER TABLE "letters" ADD COLUMN     "status" "LetterStatus" NOT NULL DEFAULT 'DRAFT';
