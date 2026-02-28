-- CreateTable
CREATE TABLE "DomainProgress" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "domain" "Domain" NOT NULL,
    "currentDay" INTEGER NOT NULL DEFAULT 1,
    "currentStreak" INTEGER NOT NULL DEFAULT 0,
    "longestStreak" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "DomainProgress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DomainProgress_userId_domain_key" ON "DomainProgress"("userId", "domain");

-- Backfill: one DomainProgress per user per domain (copy from User for selectedDomain, else defaults)
INSERT INTO "DomainProgress" (id, "userId", domain, "currentDay", "currentStreak", "longestStreak")
SELECT gen_random_uuid()::text, id, 'SE',
  CASE WHEN "selectedDomain" = 'SE' THEN "currentDay" ELSE 1 END,
  CASE WHEN "selectedDomain" = 'SE' THEN "currentStreak" ELSE 0 END,
  CASE WHEN "selectedDomain" = 'SE' THEN "longestStreak" ELSE 0 END
FROM "User";
INSERT INTO "DomainProgress" (id, "userId", domain, "currentDay", "currentStreak", "longestStreak")
SELECT gen_random_uuid()::text, id, 'ML',
  CASE WHEN "selectedDomain" = 'ML' THEN "currentDay" ELSE 1 END,
  CASE WHEN "selectedDomain" = 'ML' THEN "currentStreak" ELSE 0 END,
  CASE WHEN "selectedDomain" = 'ML' THEN "longestStreak" ELSE 0 END
FROM "User";
INSERT INTO "DomainProgress" (id, "userId", domain, "currentDay", "currentStreak", "longestStreak")
SELECT gen_random_uuid()::text, id, 'AI',
  CASE WHEN "selectedDomain" = 'AI' THEN "currentDay" ELSE 1 END,
  CASE WHEN "selectedDomain" = 'AI' THEN "currentStreak" ELSE 0 END,
  CASE WHEN "selectedDomain" = 'AI' THEN "longestStreak" ELSE 0 END
FROM "User";

-- AddForeignKey
ALTER TABLE "DomainProgress" ADD CONSTRAINT "DomainProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AlterTable User: remove progress columns
ALTER TABLE "User" DROP COLUMN "currentDay";
ALTER TABLE "User" DROP COLUMN "currentStreak";
ALTER TABLE "User" DROP COLUMN "longestStreak";
