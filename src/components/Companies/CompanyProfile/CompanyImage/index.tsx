"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Image from "next/image";
import { Company } from "@prisma/client";
import { motion } from "framer-motion";

import { ProfileData } from "@/types/ProfileData";

interface UserImageProps {
  company: Company;
  hidden?: boolean;
  editable?: boolean;
  setProfile?: Dispatch<SetStateAction<ProfileData>>;
}

const CompanyImage: React.FC<UserImageProps> = ({ company }) => {
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    const getImage = async (company: Company) => {
      if (!company.avatar) return "/assets/images/companies/armis_logo.png";

      setImage(
        image ? company.avatar : "/assets/images/companies/armis_logo.png"
      );
    };

    getImage(company);
  }, [company, image]);

  return (
    <motion.div
      initial="initial"
      whileHover="hover"
      className="relative my-8 flex size-full flex-col items-center"
    >
      <Image
        width={400}
        height={400}
        src={
          company.avatar?.trim() || "/assets/images/companies/diamond/armis_logo.png"
        }
        alt="profile image"
        className="size-3/4 drop-shadow-[0px_0px_20px_#c0c0c0]"
      />
    </motion.div>
  );
};

export default CompanyImage;
