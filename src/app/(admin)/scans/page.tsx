import { fetchScans } from "@/lib/fetchScans";
import getServerSession from "@/services/getServerSession";
import ExcelButton from "@/components/ExcelButton";
import PrimaryButton from "@/components/PrimaryButton";
import Custom404 from "@/app/not-found";

const scans: React.FC = async () => {
  const session = await getServerSession();
  if (!session || !session.isAdmin) {
    return Custom404();
  }

  const scans = await fetchScans();

  return (
    <section className="flex min-h-screen w-full flex-col items-center justify-center px-8 py-24 md:px-24">
      <div className="overflow-x-auto rounded-lg bg-white shadow-md">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-gray-200 text-sm uppercase text-gray-700">
            <tr>
              <th className="px-6 py-3 text-left">Id</th>
              <th className="px-6 py-3 text-left">Student Id</th>
              <th className="px-6 py-3 text-left">Student Name</th>
              <th className="px-6 py-3 text-left">Student Email</th>
              <th className="px-6 py-3 text-left">Created At</th>
            </tr>
          </thead>
          <tbody className="text-base text-gray-600">
            {scans.map((scan) => (
              <tr
                key={scan.id}
                className="border-b transition-colors hover:bg-gray-100"
              >
                <td className="px-6 py-4">{scan.id}</td>
                <td className="px-6 py-4">{scan.studentId}</td>
                <td className="px-6 py-4">{scan.student.name}</td>
                <td className="px-6 py-4">{scan.student.user.email}</td>
                <td className="px-6 py-4">{scan.createdAt.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ExcelButton className="mt-4" data={scans} />
    </section>
  );
};

export default scans;
