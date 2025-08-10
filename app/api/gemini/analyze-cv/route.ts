import { type NextRequest, NextResponse } from "next/server"
import { analyzeCVAndGenerateQuiz } from "@/lib/gemini"

export async function POST(request: NextRequest) {
  try {
    const { cvText } = await request.json()

    if (!cvText) {
      return NextResponse.json({ error: "CV text is required" }, { status: 400 })
    }

    const analysis = await analyzeCVAndGenerateQuiz(cvText)

    return NextResponse.json(analysis)
  } catch (error) {
    console.error("CV analysis error:", error)
    return NextResponse.json({ error: "Failed to analyze CV" }, { status: 500 })
  }
}
