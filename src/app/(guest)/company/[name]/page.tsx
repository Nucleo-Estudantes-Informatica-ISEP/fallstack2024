import React from "react";

import CompanyPageSection from "@/components/Companies/CompanyPageSection";
import Custom404 from "@/app/not-found";
import findCompanyByName from "@/utils/CompanyByName";

interface CompanySearchProps {
  params: Promise<{
    name: string;
  }>;
}

const CompanyPage: React.FC<CompanySearchProps> = async (props0) => {
  const params = await props0.params;
  const company = findCompanyByName(params.name);

  if (company === null || company.tier === "Silver") return Custom404();

  const companyProps = company.props;
  const modalInformation = companyProps.modalInformation;

  if (modalInformation === undefined) return Custom404();

  return (
    <section className="flex size-full flex-col items-center">
      <CompanyPageSection
        company={company}
        modalInformation={modalInformation}
      />
    </section>
  );
};

export default CompanyPage;
