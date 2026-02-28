import { prisma } from "./db";

type Domain = "SE" | "ML" | "AI";

export async function getOrCreateDomainProgress(userId: string, domain: Domain) {
  let progress = await prisma.domainProgress.findUnique({
    where: { userId_domain: { userId, domain } },
  });
  if (!progress) {
    progress = await prisma.domainProgress.create({
      data: { userId, domain },
    });
  }
  return progress;
}

export async function ensureDomainProgressForUser(userId: string) {
  const domains: Domain[] = ["SE", "ML", "AI"];
  for (const domain of domains) {
    await getOrCreateDomainProgress(userId, domain);
  }
}
