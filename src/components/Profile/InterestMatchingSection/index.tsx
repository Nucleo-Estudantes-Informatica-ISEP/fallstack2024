import { useEffect, useState } from "react";
import Image from "next/image";
import { Company, Interest } from "@prisma/client";

interface InterestMatchingSectionProps {
  userId: string;
}

const InterestMatchingSection: React.FC<InterestMatchingSectionProps> = ({
  userId,
}) => {
  const [companies, setCompanies] = useState<
    { company: Company; matchingInterests: Interest[] }[]
  >([]);

  useEffect(() => {
    async function getInterestMatchingCompanies(userId: string) {
      const data = await fetch("/api/interests/matching/" + userId);

      if (!data.ok) {
        console.error("Failed to fetch matching companies");
        return;
      }

      const { companies: interestingCompanies } = await data.json();
      setCompanies(interestingCompanies);
    }

    getInterestMatchingCompanies(userId);
  }, [userId]);

  return (
    <section className="my-4 flex flex-col flex-wrap space-y-5 px-12">
      <h3 className="text-left text-xl font-bold text-gray-600">
        Top 3 Empresa baseado nos seus interesses
      </h3>
      {companies?.length > 0 ? (
        <ul className="space-y-4">
          {companies.map(({ company, matchingInterests }) => (
            <li
              key={company.id}
              className="flex items-center rounded-lg bg-white p-4 shadow transition-shadow hover:shadow-lg"
            >
              <div className="mr-4 shrink-0">
                {company.avatar ? (
                  <Image
                    src={company.avatar}
                    alt={`${company.name} logo`}
                    className="size-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex size-12 items-center justify-center rounded-full bg-gray-300 text-sm text-gray-600">
                    Logo
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900">
                  {company.name}
                </h3>
                <p className="text-sm text-gray-600">
                  Matching Interests:{" "}
                  <span className="font-semibold text-gray-800">
                    {matchingInterests
                      .map((interest) => interest.name)
                      .join(", ")}
                  </span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-600">
          No matching companies found.
        </p>
      )}
    </section>
  );
};

export default InterestMatchingSection;
