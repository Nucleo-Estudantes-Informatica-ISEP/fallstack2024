"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { SavedStudentWithSavedBy } from "@/types/SavedStudentWithSavedBy";
import { BASE_URL } from "@/services/api";
import PrimaryButton from "@/components/PrimaryButton";
import InterestSelector from "@/components/Profile/InterestSelector";

import HistorySection from "../../HistorySection";

interface StatsProps {
  stats: number[];
  students: number;
  history: SavedStudentWithSavedBy[];
  interests: string[];
  userId: number;
}

const CompanyStatsSection: React.FC<StatsProps> = ({
  stats,
  students,
  history,
  interests,
  userId,
}) => {
  const totalScans = stats[0];
  const totalSaves = stats[1];
  const studentsLeft = students - totalScans;
  const [companyInterests, setInterests] = useState<string[]>(interests);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSave() {
    const res = await fetch(`${BASE_URL}/user`, {
      method: "PATCH",
      body: JSON.stringify({
        interests: companyInterests,
      }),
    });

    if (res.status === 200) {
      setIsLoading(false);
      swal("Perfil atualizado com sucesso!");
    } else {
      setIsLoading(false);
      swal("Ocorreu um erro ao atualizar o teu perfil...");
    }

    router.refresh();
  }

  return (
    <section className="flex w-full flex-col items-center justify-center rounded-t-3xl bg-white p-4 md:rounded-md md:p-8">
      <h1 className="mx-auto my-6 w-1/2 text-center  text-2xl font-extrabold uppercase text-black md:my-2">
        Visão Geral
      </h1>
      <div className="mb-6 grid w-full grid-cols-1 items-center justify-center gap-y-4 md:my-6 md:grid-cols-3">
        <div className="flex flex-col items-center gap-y-2 md:gap-y-4">
          <p className="mt-4 text-4xl font-bold text-black">{totalScans}</p>
          <h2 className="text-center  font-semibold leading-6 text-gray-600 md:text-xl">
            {totalScans === 1 ? "Scan" : "Scans"}
          </h2>
        </div>
        <div className="flex flex-col items-center gap-y-2 md:gap-y-4 md:border-x-4">
          <p className="mt-4 text-4xl font-bold text-black">{totalSaves}</p>
          <h2 className=" text-center  font-semibold leading-6 text-gray-600 md:text-xl">
            {totalSaves === 1 ? "Gravação de Perfil" : "Gravações de Perfil"}
          </h2>
        </div>
        <div className="flex flex-col items-center gap-y-2 md:gap-y-4">
          <p className="mt-4 text-4xl font-bold text-black">{studentsLeft}</p>
          <h2 className="text-center  font-semibold leading-6 text-gray-600 md:text-xl">
            Alunos Restantes
          </h2>
        </div>
      </div>
      <h1 className="mx-auto my-6 w-1/2 text-center font-poppins text-2xl font-extrabold uppercase text-black md:my-2 md:mb-4">
        Interesses
      </h1>
      <InterestSelector
        userInterests={companyInterests}
        setUserInterests={setInterests}
      />
      <PrimaryButton
        onClick={handleSave}
        loading={isLoading}
        className="mt-4 px-12 py-2 text-lg"
      >
        Guardar
      </PrimaryButton>
      <HistorySection historyData={history} isCompany />
    </section>
  );
};

export default CompanyStatsSection;
