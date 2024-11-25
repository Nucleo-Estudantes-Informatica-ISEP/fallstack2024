import prisma from "./prisma";

export async function fetchScans() {
  return await prisma.savedStudent.findMany({
    distinct: ["studentId"],
    select: {
      id: true,
      studentId: true,
      createdAt: true,
      student: {
        select: {
          name: true,
          user: {
            select: {
              email: true,
            },
          },
        },
      },
    },
    where: {
      savedBy: {
        email: {
          equals: "info@nei-isep.org",
        },
      },
    },
  });
}
