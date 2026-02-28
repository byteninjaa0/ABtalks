-- CreateEnum
CREATE TYPE "Domain" AS ENUM ('SE', 'ML', 'AI');

-- AlterTable User: add selectedDomain
ALTER TABLE "User" ADD COLUMN "selectedDomain" "Domain" NOT NULL DEFAULT 'SE';

-- AlterTable Challenge: add domain, replace unique
ALTER TABLE "Challenge" ADD COLUMN "domain" "Domain" NOT NULL DEFAULT 'SE';
DROP INDEX IF EXISTS "Challenge_dayNumber_key";
CREATE UNIQUE INDEX "Challenge_dayNumber_domain_key" ON "Challenge"("dayNumber", "domain");

-- AlterTable Problem: add domain
ALTER TABLE "Problem" ADD COLUMN "domain" "Domain" NOT NULL DEFAULT 'SE';
