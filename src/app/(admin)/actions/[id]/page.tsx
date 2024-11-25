import { BASE_URL } from "@/services/api";
import getServerSession from "@/services/getServerSession";
import ActionQrCodeData from "@/components/Action/ActionQrCodeData";
import CloseActionButton from "@/components/Action/CloseActionButton";
import Custom404 from "@/app/not-found";

interface ActionParams {
  params: Promise<{
    id: string;
  }>;
}

const Actions: React.FC<ActionParams> = async ({ params }) => {
  const session = await getServerSession();

  if (!session || !session.isAdmin) {
    return Custom404();
  }

  const { id } = await params;
  const res = await fetch(BASE_URL + `/actions/${id}`);
  const { action } = await res.json();

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center px-8 py-24 md:px-24">
      <h1 className="mb-12 text-3xl font-bold text-primary lg:text-6xl">
        {action.name}
      </h1>
      <CloseActionButton id={id} action={action} />
      <ActionQrCodeData id={id} />
    </section>
  );
};

export default Actions;
