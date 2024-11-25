import { Company, Interest } from "@prisma/client";

import prisma from "./prisma";

export async function fetchInterestMatchingCompanies(
  userId: string
): Promise<{ company: Company; matchingInterests: Interest[] }[]> {
  const companies = await prisma.company.findMany({
    include: {
      user: {
        include: {
          interests: true,
        },
      },
    },
  });

  const userInterests = await prisma.interest.findMany({
    where: {
      Users: {
        some: {
          id: userId,
        },
      },
    },
    select: {
      id: true,
      name: true,
    },
  });

  return companies
    .map((company) => {
      const matchingInterests = company.user.interests.filter((interest) =>
        userInterests.some((userInterest) => userInterest.id === interest.id)
      );

      console.log(company.name, matchingInterests);

      return {
        company,
        matchingInterests,
      };
    })
    .sort((a, b) => b.matchingInterests.length - a.matchingInterests.length)
    .slice(0, 3);
}
