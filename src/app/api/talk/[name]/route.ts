import { NextRequest, NextResponse } from "next/server";

import config from "@/config";
import prisma from "@/lib/prisma";
import { signJwt, verifyJwt } from "@/services/authService";
import getServerSession from "@/services/getServerSession";

interface TalkParams {
  params: Promise<{
    name: string;
  }>;
}

export async function GET(req: NextRequest, props: TalkParams) {
  const { name } = await props.params;

  // round timestamp to the nearest talkQrCodeRefreshRate seconds
  const timestamp =
    Math.round(Date.now() / config.constants.talkQrCodeRefreshRateMs) *
    config.constants.talkQrCodeRefreshRateMs;

  const talk = await prisma.talk.findUnique({
    where: { companyName: name },
  });

  const qrCode = "talk-" + signJwt({ name, timestamp }, { expiresIn: 10 * 60 }); //expires in 10 minutes
  console.log({ qrCode });

  return NextResponse.json({ talk, qrCode });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data } = await req.json();
  const { name, timestamp } = verifyJwt(data) as {
    name: string;
    timestamp: number;
  };

  const talk = await prisma.talk.findUnique({
    where: { companyName: name },
  });

  if (!talk)
    return NextResponse.json({ error: "Talk not found" }, { status: 404 });

  if (!talk.isLive)
    return NextResponse.json({ error: "Talk not live" }, { status: 400 });

  // check if timestamp is valid
  const now = Date.now();
  if (now - timestamp > config.constants.talkQrCodeRefreshRateMs)
    return NextResponse.json({ error: "Invalid timestamp" }, { status: 400 });

  const student = await prisma.student.findUnique({
    where: { id: session.student?.id },
    include: { talks: true },
  });

  if (!student)
    return NextResponse.json({ error: "Student not found" }, { status: 404 });

  if (student.talks.find((t) => t.companyName === name))
    return NextResponse.json({ error: "Already checked in" }, { status: 400 });

  await prisma.student.update({
    where: { id: session.student?.id },
    data: {
      talks: {
        connect: { companyName: name },
      },
    },
  });

  return NextResponse.json({ success: true });
}

export async function PATCH(req: NextRequest, props: TalkParams) {
  const params = await props.params;
  const session = await getServerSession();
  if (!session || !session.isAdmin)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { name } = params;

  const talk = await prisma.talk.findUnique({
    where: { companyName: name },
  });

  if (!talk)
    return NextResponse.json({ error: "Talk not found" }, { status: 404 });

  await prisma.talk.update({
    where: { companyName: name },
    data: { isLive: !talk.isLive },
  });
}
