export function validateEnvironment() {
  const requiredEnvVars = {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  }

  const missingVars = Object.entries(requiredEnvVars)
    .filter(([key, value]) => !value)
    .map(([key]) => key)

  if (missingVars.length > 0) {
    console.error("Missing required environment variables:", missingVars)
    return {
      isValid: false,
      missingVars,
      message: `Please set the following environment variables: ${missingVars.join(", ")}`,
    }
  }

  return {
    isValid: true,
    missingVars: [],
    message: "All environment variables are configured",
  }
}
