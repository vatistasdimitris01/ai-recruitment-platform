import { type NextRequest, NextResponse } from "next/server"
import { generateJobDescription } from "@/lib/gemini"

export async function POST(request: NextRequest) {
  try {
    const { jobTitle, requirements } = await request.json()

    if (!jobTitle || !requirements) {
      return NextResponse.json({ error: "Job title and requirements are required" }, { status: 400 })
    }

    const description = await generateJobDescription(jobTitle, requirements)

    return NextResponse.json({ description })
  } catch (error) {
    console.error("Job generation error:", error)
    return NextResponse.json({ error: "Failed to generate job description" }, { status: 500 })
  }
}
