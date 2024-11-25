import { NextRequest, NextResponse } from "next/server";

import { fetchInterestMatchingCompanies } from "@/lib/fetchInterestMatchingCompanies";

interface MatchingInterestParams {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  request: NextRequest,
  { params }: MatchingInterestParams
) {
  const { id: userId } = await params;

  const interestingCompanies = await fetchInterestMatchingCompanies(userId);

  return NextResponse.json(interestingCompanies);
}
