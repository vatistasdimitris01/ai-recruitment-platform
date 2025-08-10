import { type NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

export async function GET(request: NextRequest) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        {
          error: "API key not configured",
          message: "Please set GEMINI_API_KEY environment variable",
        },
        { status: 500 },
      )
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    const result = await model.generateContent("Say hello")
    const response = await result.response
    const text = response.text()

    return NextResponse.json({
      success: true,
      message: "Gemini API is working correctly",
      response: text,
    })
  } catch (error: any) {
    console.error("Gemini API test error:", error)
    return NextResponse.json(
      {
        error: "API test failed",
        message: error.message || "Unknown error",
        details: error.toString(),
      },
      { status: 500 },
    )
  }
}
