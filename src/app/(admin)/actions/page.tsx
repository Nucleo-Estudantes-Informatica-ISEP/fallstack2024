import Link from "next/link";

import { fetchActions } from "@/lib/fetchActions";
import getServerSession from "@/services/getServerSession";
import Custom404 from "@/app/not-found";

const actions: React.FC = async () => {
  const session = await getServerSession();
  if (!session || !session.isAdmin) {
    return Custom404();
  }

  const actions = await fetchActions();

  return (
    <section className="flex min-h-screen w-full flex-col items-center justify-center">
      <div className="overflow-x-scroll rounded-lg bg-white shadow-md">
        <table className="w-full table-auto border-collapse overflow-x-scroll">
          <thead className="bg-gray-200 text-sm uppercase text-gray-700">
            <tr>
              <th className="px-2 py-3 text-left">Name</th>
              <th className="px-2 py-3 text-left">Points</th>
              <th className="px-2 py-3 text-left">Alt Text</th>
              <th className="px-2 py-3 text-left">Live</th>
              <th className="px-2 py-3 text-left">Visible</th>
              <th className="px-2 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-base text-gray-600">
            {actions.map((action) => (
              <tr
                key={action.id}
                className="border-b transition-colors hover:bg-gray-100"
              >
                <td className="px-2 py-4">{action.name}</td>
                <td className="px-2 py-4">{action.points}</td>
                <td className="px-2 py-4">{action.altText || "N/A"}</td>
                <td className="px-2 py-4">{action.isLive ? "Yes" : "No"}</td>
                <td className="px-2 py-4">{action.isVisible ? "Yes" : "No"}</td>
                <td className="px-2 py-4">
                  <Link
                    href={`/actions/${action.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default actions;
