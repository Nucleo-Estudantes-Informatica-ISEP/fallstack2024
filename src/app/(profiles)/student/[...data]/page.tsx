import { HttpError } from "@/types/HttpError";
import { getCompanies } from "@/lib/companies";
import { getStats, getTodayStats } from "@/lib/fetchStats";
import { fetchStudent } from "@/lib/fetchStudent";
import { fetchStudentActions } from "@/lib/fetchStudentActions";
import getStudentHistory from "@/lib/getStudentHistory";
import { isSaved } from "@/lib/savedStudents";
import { verifyJwt } from "@/services/authService";
import getServerSession from "@/services/getServerSession";
import CompanyViewProfileSectionContainer from "@/components/Companies/CompanyProfile/CompanyViewProfileSectionContainer";
import ProfileSectionContainer from "@/components/Profile/ProfileSectionContainer";
import PublicProfileSectionContainer from "@/components/Profile/PublicProfileSectionContainer";
import Custom404 from "@/app/not-found";

interface ProfileProps {
  params: Promise<{
    data: string[];
  }>;
}

const StudentPage: React.FC<ProfileProps> = async (props) => {
  const params = await props.params;
  const session = await getServerSession();

  if (!session) return Custom404();

  const {
    data: [code, preview],
  } = params;

  // if is preview, treat code as jwt for temp access
  const isPreview = preview === "preview";

  let student = null;
  if (isPreview) {
    const token = verifyJwt(code);
    if (!token) return Custom404();
    const { code: studentCode } = token as { code: string };
    student = await fetchStudent(studentCode);
  } else {
    student = await fetchStudent(code);
  }

  if (!student) return Custom404();

  // companies may access if it's their own profile
  if (
    session.student &&
    !session.student.code.match(student.code) &&
    !isPreview
  )
    return Custom404();

  const isSavedStudent = await isSaved(session.id, student.code);

  // companies may access if they saved the profile
  if (session.company && !isSavedStudent && !isPreview) return Custom404();

  const sanitizedInterests = student.user.interests.map(
    (interest) => interest.name
  );

  const globalStats = await getStats(student.code);
  const todayStats = await getTodayStats(student.id);

  const companies = await getCompanies();

  const history = await getStudentHistory(student.code);
  const actions = await fetchStudentActions(student.code);

  const totalCompanies = companies.length;
  let companiesLeft = totalCompanies;

  if (!(history instanceof HttpError))
    companiesLeft -= history.filter(
      (s) => s.savedBy.company !== null && !s.isSaved
    ).length;

  return (
    <section
      className={`${
        session && session.role === "COMPANY" ? "bg-company" : "bg-inherit"
      } flex size-full min-h-screen flex-col items-center`}
    >
      {session && session.company && session.role === "COMPANY" ? (
        <CompanyViewProfileSectionContainer
          interests={sanitizedInterests}
          student={student}
          company={session.company}
          token={code}
          isSavedStudent={isSavedStudent}
        />
      ) : !session || session.student?.code !== code ? (
        <PublicProfileSectionContainer
          interests={sanitizedInterests}
          student={student}
        />
      ) : (
        <ProfileSectionContainer
          interests={sanitizedInterests}
          student={student}
          globalStats={globalStats}
          todayStats={todayStats}
          companiesLeft={companiesLeft}
          historyData={history instanceof HttpError ? [] : history}
          actions={actions}
        />
      )}
    </section>
  );
};

export default StudentPage;
