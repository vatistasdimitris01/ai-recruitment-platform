import { type NextRequest, NextResponse } from "next/server"
import { matchJobsToCandidate } from "@/lib/gemini"

export async function POST(request: NextRequest) {
  try {
    const { candidateProfile, jobs } = await request.json()

    if (!candidateProfile || !jobs) {
      return NextResponse.json({ error: "Candidate profile and jobs are required" }, { status: 400 })
    }

    const matches = await matchJobsToCandidate(candidateProfile, jobs)

    return NextResponse.json({ matches })
  } catch (error) {
    console.error("Job matching error:", error)
    return NextResponse.json({ error: "Failed to match jobs" }, { status: 500 })
  }
}
