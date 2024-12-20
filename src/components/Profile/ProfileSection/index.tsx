import { Action, Student, User } from "@prisma/client";
import Skeleton from "react-loading-skeleton";

import { ProfileData } from "@/types/ProfileData";

import ActionsSection from "../ActionsSection";
import BioSection from "../BioSection";
import InterestMatchingSection from "../InterestMatchingSection";
import InterestsSection from "../InterestsSection";
import OpenCvSection from "../OpenCvSection";

interface ProfileSectionProps {
  student: Student & { user: User };
  interests: string[];
  profile: ProfileData;
  actions: (Action & { done: boolean })[];
}

const ProfileSection: React.FC<ProfileSectionProps> = ({
  student,
  profile,
  actions,
}) => {
  return (
    <section className="flex w-full flex-col rounded-t-3xl bg-white py-4 md:rounded-md">
      <div className="mx-4 mb-12 flex flex-col gap-y-4 md:mx-12 md:flex-row">
        <div className="my-4 flex flex-col md:mb-0 md:w-1/2">
          <h2 className="text-center text-xl font-semibold text-gray-600 md:text-left">
            Nome
          </h2>
          <p className="text-center text-2xl font-bold text-black md:text-left md:text-3xl">
            {student.name}
          </p>
        </div>
        <div className="mt-4 flex flex-col md:w-1/2">
          <h2 className="text-center text-xl font-semibold text-gray-600 md:text-left">
            Ano
          </h2>
          <p className="text-center text-2xl font-bold text-black md:text-left md:text-3xl">
            {student.year}
          </p>
        </div>
      </div>

      {profile.bio && <BioSection bio={profile.bio} />}

      {student.cv && (
        <OpenCvSection student={student} text={"Abrir o meu CV"} />
      )}

      {profile.interests !== undefined ? (
        <InterestsSection userInterests={profile.interests} />
      ) : (
        <Skeleton height={40} />
      )}

      <ActionsSection actions={actions} />

      <InterestMatchingSection userId={student.userId} />
    </section>
  );
};

export default ProfileSection;
