import { NextRequest, NextResponse } from "next/server";

import config from "@/config";
import prisma from "@/lib/prisma";
import { signJwt, verifyJwt } from "@/services/authService";
import getServerSession from "@/services/getServerSession";

interface ActionParams {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(req: NextRequest, props: ActionParams) {
  const { id } = await props.params;

  // round timestamp to the nearest actionQrCodeRefreshRate seconds
  const timestamp =
    Math.round(Date.now() / config.constants.actionQrCodeRefreshRateMs) *
    config.constants.actionQrCodeRefreshRateMs;

  const action = await prisma.action.findUnique({
    where: { id },
  });

  const qrCode =
    "action-" +
    signJwt(
      { id, timestamp },
      { expiresIn: config.constants.actionQrCodeRefreshRateMs * 2 }
    );

  return NextResponse.json({ action, qrCode });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  if (!session)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  if (!session.student)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { data } = await req.json();
  const decoded = verifyJwt(data) as {
    id: string;
    timestamp: number;
  };

  if (!decoded)
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });

  const { id, timestamp } = decoded;

  if (!id || !timestamp)
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });

  const action = await prisma.action.findUnique({
    where: { id },
  });

  if (!action)
    return NextResponse.json({ error: "Action not found" }, { status: 404 });

  if (!action.isLive)
    return NextResponse.json({ error: "Action not live" }, { status: 400 });

  // check if timestamp is valid
  const now = Date.now();
  if (now - timestamp > config.constants.actionQrCodeRefreshRateMs)
    return NextResponse.json({ error: "Invalid timestamp" }, { status: 400 });

  const student = await prisma.student.findUnique({
    where: { id: session.student.id },
  });

  if (!student)
    return NextResponse.json({ error: "Student not found" }, { status: 404 });

  await prisma.actionCompletion.create({
    data: {
      studentCode: session.student.code,
      actionId: id,
    },
  });

  return NextResponse.json({ message: "Action completed" });
}

export async function PATCH(request: NextRequest, props: ActionParams) {
  const { id } = await props.params;

  const action = await prisma.action.findUnique({
    where: { id },
  });

  if (!action)
    return NextResponse.json({ error: "Action not found" }, { status: 404 });

  await prisma.action.update({
    where: { id },
    data: {
      isLive: !action.isLive,
    },
  });

  return NextResponse.json({ message: "Action updated" });
}
