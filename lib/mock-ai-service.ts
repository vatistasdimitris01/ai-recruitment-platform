export interface MockAnalysisResult {
  faceDetected: boolean
  isLive: boolean
  isAdult: boolean
  estimatedAge: number
  confidence: number
  reasoning: string
}

export function mockSelfieAnalysis(imageData: string): MockAnalysisResult {
  // Simple heuristic analysis based on image properties
  const imageSize = imageData.length
  const hasValidFormat = imageData.startsWith("data:image/")

  // Simulate realistic analysis with some randomness
  const baseConfidence = hasValidFormat ? 75 : 30
  const randomFactor = Math.random() * 20 - 10 // -10 to +10
  const confidence = Math.max(0, Math.min(100, baseConfidence + randomFactor))

  // Simulate face detection based on image size (larger images more likely to have faces)
  const faceDetected = imageSize > 50000 && hasValidFormat

  // Simulate liveness detection (assume most real captures are live)
  const isLive = faceDetected && confidence > 60

  // Simulate age detection (assume most users are adults, but add some variance)
  const ageRandomness = Math.random()
  const estimatedAge = ageRandomness > 0.1 ? Math.floor(Math.random() * 40) + 20 : Math.floor(Math.random() * 5) + 16
  const isAdult = estimatedAge >= 18

  return {
    faceDetected,
    isLive,
    isAdult,
    estimatedAge,
    confidence: Math.round(confidence),
    reasoning: faceDetected
      ? `Face detected with ${confidence.toFixed(0)}% confidence. Estimated age: ${estimatedAge} years.`
      : "No clear face detected in the image. Please ensure good lighting and face the camera directly.",
  }
}
