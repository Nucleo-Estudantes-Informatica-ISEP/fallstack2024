import React from "react";

import { BASE_URL } from "@/services/api";
import getServerSession from "@/services/getServerSession";
import CloseTalkButton from "@/components/CloseTalkButton";
import TalkQrCodeData from "@/components/TalkQrCodeData";

import Custom404 from "../../not-found";

interface TalkParams {
  params: Promise<{
    name: string;
  }>;
}

const Talk: React.FC<TalkParams> = async ({ params }) => {
  const session = await getServerSession();

  if (!session || !session.isAdmin) {
    return Custom404();
  }

  const { name } = await params;
  const res = await fetch(BASE_URL + `/talk/${name}`);
  const { talk } = await res.json();

  if (!talk) {
    return Custom404();
  }

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center px-8 py-24 md:px-24">
      <h1 className="mb-12 text-6xl font-bold text-primary">{name}</h1>
      <CloseTalkButton name={name} talk={talk} />
      <TalkQrCodeData name={name} />
    </section>
  );
};

export default Talk;
