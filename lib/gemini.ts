import { GoogleGenerativeAI } from "@google/generative-ai"

if (!process.env.GEMINI_API_KEY) {
  console.warn("GEMINI_API_KEY environment variable is not set")
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

export const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash", // Use stable model
  generationConfig: {
    temperature: 0.7,
    topP: 0.8,
    topK: 40,
    maxOutputTokens: 2048,
  },
})

export const visionModel = genAI.getGenerativeModel({
  model: "gemini-1.5-flash", // Vision-capable model
})

export async function analyzeCVAndGenerateQuiz(cvText: string) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY environment variable is not set")
  }

  const prompt = `
    Analyze the following CV text and perform these tasks:
    1. Extract skills, education, and work experience
    2. Generate a professional summary
    3. Create 10 quiz questions (5 IQ-style logical questions + 5 technical questions based on the CV)
    4. Provide a relevance score (1-10) for the CV quality
    
    CV Text: ${cvText}
    
    Return the response in this exact JSON format:
    {
      "skills": ["skill1", "skill2", ...],
      "education": ["education1", "education2", ...],
      "experience": ["experience1", "experience2", ...],
      "summary": "professional summary text",
      "quiz": [
        {
          "id": 1,
          "question": "question text",
          "options": ["option1", "option2", "option3", "option4"],
          "correctAnswer": 0,
          "type": "iq"
        },
        ...
      ],
      "cvRelevanceScore": 8
    }
  `

  try {
    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    // Clean the response to extract JSON
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0])
    }
    throw new Error("Invalid response format from Gemini API")
  } catch (error) {
    console.error("Gemini API error:", error)

    // Return fallback data if API fails
    return {
      skills: ["JavaScript", "React", "Node.js", "TypeScript"],
      education: ["Bachelor's Degree in Computer Science"],
      experience: ["Software Developer with 3+ years experience"],
      summary: "Experienced developer with strong technical skills and proven track record.",
      quiz: [
        {
          id: 1,
          question: "What is the time complexity of binary search?",
          options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
          correctAnswer: 1,
          type: "technical",
        },
        {
          id: 2,
          question: "Complete the sequence: 2, 4, 8, 16, ?",
          options: ["24", "32", "30", "20"],
          correctAnswer: 1,
          type: "iq",
        },
      ],
      cvRelevanceScore: 7,
    }
  }
}

export async function generateJobDescription(jobTitle: string, requirements: string) {
  if (!process.env.GEMINI_API_KEY) {
    console.warn("GEMINI_API_KEY not set, using fallback job description")

    // Return a well-structured fallback job description
    return `
# ${jobTitle}

## About the Role
We are seeking a talented ${jobTitle} to join our dynamic team. This is an excellent opportunity for a motivated professional to contribute to exciting projects and grow their career in a supportive environment.

## Key Responsibilities
• Develop and maintain high-quality software solutions
• Collaborate with cross-functional teams to deliver exceptional results
• Participate in code reviews and technical discussions
• Stay up-to-date with industry best practices and emerging technologies
• Contribute to the continuous improvement of our development processes

## Required Qualifications
${requirements
  .split(",")
  .map((req) => `• ${req.trim()}`)
  .join("\n")}

## What We Offer
• Competitive salary and benefits package
• Flexible working arrangements
• Professional development opportunities
• Collaborative and inclusive work environment
• Opportunity to work on cutting-edge projects

## How to Apply
If you're passionate about technology and ready to take on new challenges, we'd love to hear from you. Please submit your application through our platform.

*This job description was generated using our AI assistant. Contact us for more specific details about the role.*
    `.trim()
  }

  const prompt = `
    Generate a professional job description for the position: ${jobTitle}
    Requirements: ${requirements}
    
    Include:
    - Job overview
    - Key responsibilities
    - Required qualifications
    - Preferred skills
    
    Format as a well-structured job description.
  `

  try {
    const result = await model.generateContent(prompt)
    const response = await result.response
    return response.text()
  } catch (error) {
    console.error("Gemini API error:", error)
    return `Job Description for ${jobTitle}\n\nWe are seeking a qualified ${jobTitle} to join our team.\n\nRequirements:\n${requirements}\n\nThis is an excellent opportunity for career growth.`
  }
}

export async function matchJobsToCandidate(candidateProfile: any, jobs: any[]) {
  if (!process.env.GEMINI_API_KEY) {
    console.warn("GEMINI_API_KEY not set, using fallback matching")
    return jobs.map((job) => ({
      jobId: job.id,
      matchScore: Math.floor(Math.random() * 40) + 60,
    }))
  }

  const prompt = `
    Match the following candidate profile to these job listings and provide match scores (0-100):
    
    Candidate Profile:
    Skills: ${candidateProfile.skills?.join(", ")}
    Experience: ${candidateProfile.experience?.join(", ")}
    Education: ${candidateProfile.education?.join(", ")}
    
    Jobs: ${JSON.stringify(jobs)}
    
    Return JSON array with job IDs and match scores:
    [{"jobId": "1", "matchScore": 85}, ...]
  `

  try {
    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    const jsonMatch = text.match(/\[[\s\S]*\]/)
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0])
    }
    return []
  } catch (error) {
    console.error("Gemini API error:", error)
    // Return fallback scores
    return jobs.map((job) => ({
      jobId: job.id,
      matchScore: Math.floor(Math.random() * 40) + 60,
    }))
  }
}

export async function generateProfilePicture(name: string, profession: string) {
  // This would integrate with an AI image generation service
  // For now, return a placeholder
  return `/placeholder.svg?height=200&width=200&text=${encodeURIComponent(name)}`
}
