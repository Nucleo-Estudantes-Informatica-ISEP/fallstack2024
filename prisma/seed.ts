import { PrismaClient, Role, Tier } from "@prisma/client";

import { hashPassword } from "../src/services/authService";

const prisma = new PrismaClient();

async function seedInterests() {
  const interests = await prisma.interest.findMany();
  if (interests.length > 0) {
    console.log("⚠️ Interests already seeded");
    return;
  }

  await prisma.interest.createMany({
    data: [
      { name: "Artificial Intelligence" },
      { name: "Data Science" },
      { name: "Mobile Development" },
      { name: "Web Development" },
      { name: "Devops" },
      { name: "Cyber Security" },
      { name: "Game Development" },
      { name: "Cloud Computing" },
      { name: "Machine Learning" },
      { name: "Blockchain" },
      { name: "Internet of Things" },
      { name: "Quantum Computing" },
      { name: "Augmented Reality" },
      { name: "Virtual Reality" },
      { name: "Big Data" },
      { name: "Robotics" },
      { name: "Networking" },
      { name: "Database Management" },
      { name: "Software Development" },
    ],
  });
  console.log("✅ Interests seeded");
}

async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL as string;
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (user) {
    console.log("⚠️ User already seeded");
    return user;
  }

  const password = await hashPassword(process.env.ADMIN_PASSWORD as string);

  const newUser = await prisma.user.create({
    data: {
      email,
      password,
      role: Role.COMPANY,
      isAdmin: true,
    },
  });

  console.log("✅ User seeded");

  return newUser;
}

async function seedStudent() {
  const email = "student@test.pt";
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (user) {
    console.log("⚠️ Student already seeded");
    return user;
  }

  const password = await hashPassword(process.env.ADMIN_PASSWORD as string);

  const newUser = await prisma.user.create({
    data: {
      email,
      password,
      role: Role.STUDENT,
    },
  });

  await prisma.student.create({
    data: {
      userId: newUser.id,
      name: "Student",
      year: "3",
      code: "A123",
    },
  });

  console.log("✅ Student seeded");

  return newUser;
}

async function seedCompanies(userId: number) {
  const companies = await prisma.company.findMany();
  if (companies.length > 0) {
    console.log("⚠️ Companies already seeded");
    return companies[0];
  }

  const company = await prisma.company.create({
    data: {
      name: "Company1",
      userId: userId,
      tier: Tier.DIAMOND,
    },
  });

  console.log("✅ Company seeded");

  return company;
}

async function seedTalks(companyName: string) {
  const talks = await prisma.talk.findMany();
  if (talks.length > 0) {
    console.log("️⚠️ Talks already seeded");
    return;
  }

  await prisma.talk.create({
    data: {
      startTime: new Date(),
      companyName,
    },
  });

  console.log("✅ Talk seeded");
}

async function seedActions() {
  const actions = await prisma.action.findMany();
  if (actions.length > 0) {
    console.log("⚠️ Actions already seeded");
    return;
  }

  await prisma.action.createMany({
    data: [
      {
        name: "Upload CV",
        description: "Faz o upload do teu CV",
        points: 2,
      },
      {
        name: "Palestra 1",
        description: "Assiste à palestra 1",
        points: 5,
      },
      {
        name: "Palestra 2",
        description: "Assiste à palestra 2",
        points: 5,
      },
      {
        name: "Palestra 3",
        description: "Assiste à palestra 3",
        points: 10,
      },
      {
        name: "Entrevista com o Teixeira",
        description: "Assiste à palestra 3",
        altText: "0x31r4",
        points: 10,
      },
    ],
  });

  console.log("✅ Actions seeded");
}

async function main() {
  await seedInterests();
  await seedStudent();
  const user = await seedAdmin();
  const company = await seedCompanies(user.id);
  await seedTalks(company.name);
  await seedActions();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
