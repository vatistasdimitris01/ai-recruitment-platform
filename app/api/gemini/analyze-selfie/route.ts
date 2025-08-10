import { type NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { geminiRateLimiter } from "@/lib/rate-limiter"
import { apiCache } from "@/lib/cache"
import { mockSelfieAnalysis } from "@/lib/mock-ai-service"
import crypto from "crypto"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

export async function POST(request: NextRequest) {
  try {
    const { imageData } = await request.json()

    if (!imageData) {
      return NextResponse.json({ error: "Image data is required" }, { status: 400 })
    }

    // Create a hash of the image for caching
    const imageHash = crypto.createHash("md5").update(imageData).digest("hex")
    const cacheKey = `selfie_analysis_${imageHash}`

    // Check cache first
    const cachedResult = apiCache.get(cacheKey)
    if (cachedResult) {
      return NextResponse.json(cachedResult)
    }

    // Check rate limit
    const clientId = request.headers.get("x-forwarded-for") || "anonymous"
    if (!geminiRateLimiter.isAllowed(clientId)) {
      const retryAfter = geminiRateLimiter.getRetryAfter(clientId)

      console.log("Rate limit exceeded, using mock analysis")

      // Use mock analysis when rate limited
      const mockResult = mockSelfieAnalysis(imageData)

      return NextResponse.json(
        {
          ...mockResult,
          isMockAnalysis: true,
          retryAfter: Math.ceil(retryAfter / 1000),
        },
        {
          status: 200,
          headers: {
            "Retry-After": Math.ceil(retryAfter / 1000).toString(),
          },
        },
      )
    }

    // Check if API key is configured
    if (!process.env.GEMINI_API_KEY) {
      console.log("No API key configured, using mock analysis")
      const mockResult = mockSelfieAnalysis(imageData)
      return NextResponse.json({
        ...mockResult,
        isMockAnalysis: true,
      })
    }

    // Remove data URL prefix if present
    const base64Image = imageData.replace(/^data:image\/[a-z]+;base64,/, "")

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    const prompt = `
      Analyze this selfie image and provide the following information:
      1. Is there a human face clearly visible in the image?
      2. Does the person appear to be alive/real (not a photo of a photo, screen, or static image)?
      3. Estimate the person's age - are they 18 years old or older?
      4. Provide a confidence score (0-100) for your analysis
      5. If possible, provide an estimated age range

      Look for signs of liveness such as:
      - Natural lighting and shadows on the face
      - Realistic skin texture and features
      - Proper depth and dimension (not flat like a photo)
      - Natural eye reflection and pupil response
      - Realistic facial proportions

      For age estimation, consider:
      - Facial maturity and bone structure
      - Skin texture and aging signs
      - Overall facial development
      - Eye area maturity

      Respond in this exact JSON format:
      {
        "faceDetected": boolean,
        "isLive": boolean,
        "isAdult": boolean,
        "estimatedAge": number,
        "confidence": number,
        "reasoning": "brief explanation of the analysis"
      }
    `

    const imagePart = {
      inlineData: {
        data: base64Image,
        mimeType: "image/jpeg",
      },
    }

    const result = await model.generateContent([prompt, imagePart])
    const response = await result.response
    const text = response.text()

    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      const analysis = JSON.parse(jsonMatch[0])

      // Cache the result for 5 minutes
      apiCache.set(cacheKey, analysis, 300000)

      return NextResponse.json(analysis)
    }

    // Fallback to mock analysis if JSON parsing fails
    console.log("Failed to parse Gemini response, using mock analysis")
    const mockResult = mockSelfieAnalysis(imageData)
    return NextResponse.json({
      ...mockResult,
      isMockAnalysis: true,
    })
  } catch (error: any) {
    console.error("Selfie analysis error:", error)

    // Handle specific quota exceeded error
    if (error.message?.includes("429") || error.message?.includes("quota")) {
      console.log("Quota exceeded, using mock analysis")
      const { imageData } = await request.json()
      const mockResult = mockSelfieAnalysis(imageData)

      return NextResponse.json(
        {
          ...mockResult,
          isMockAnalysis: true,
          quotaExceeded: true,
        },
        {
          status: 200,
          headers: {
            "Retry-After": "60", // Suggest retry after 60 seconds
          },
        },
      )
    }

    // For any other error, use mock analysis
    try {
      const { imageData } = await request.json()
      const mockResult = mockSelfieAnalysis(imageData)

      return NextResponse.json({
        ...mockResult,
        isMockAnalysis: true,
        error: "API temporarily unavailable",
      })
    } catch {
      return NextResponse.json(
        {
          faceDetected: false,
          isLive: false,
          isAdult: false,
          estimatedAge: 0,
          confidence: 0,
          reasoning: "Failed to analyze image",
          error: "Analysis failed",
        },
        { status: 500 },
      )
    }
  }
}
