"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Clock, Brain, CheckCircle } from "lucide-react"

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
}

interface AIQuizProps {
  quizType: "iq" | "skills"
  onQuizComplete?: (score: number) => void
}

export default function AIQuiz({ quizType, onQuizComplete }: AIQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(1800) // 30 minutes for IQ test
  const [isCompleted, setIsCompleted] = useState(false)
  const [questions, setQuestions] = useState<Question[]>([])

  // Sample questions - in real app, these would come from Gemini AI
  const sampleQuestions: Question[] =
    quizType === "iq"
      ? [
          {
            id: 1,
            question: "What comes next in the sequence: 2, 4, 8, 16, ?",
            options: ["24", "32", "30", "20"],
            correctAnswer: 1,
          },
          {
            id: 2,
            question: "If all roses are flowers and some flowers are red, which statement is definitely true?",
            options: ["All roses are red", "Some roses are red", "Some roses might be red", "No roses are red"],
            correctAnswer: 2,
          },
          {
            id: 3,
            question: "Complete the analogy: Book is to Reading as Fork is to ?",
            options: ["Kitchen", "Eating", "Metal", "Plate"],
            correctAnswer: 1,
          },
        ]
      : [
          {
            id: 1,
            question: "Which React hook is used for managing component state?",
            options: ["useEffect", "useState", "useContext", "useReducer"],
            correctAnswer: 1,
          },
          {
            id: 2,
            question: "What does API stand for?",
            options: [
              "Application Programming Interface",
              "Advanced Programming Integration",
              "Automated Program Interaction",
              "Application Process Integration",
            ],
            correctAnswer: 0,
          },
          {
            id: 3,
            question: "Which HTTP method is typically used to update existing data?",
            options: ["GET", "POST", "PUT", "DELETE"],
            correctAnswer: 2,
          },
        ]

  useEffect(() => {
    setQuestions(sampleQuestions)
  }, [quizType])

  useEffect(() => {
    if (quizType === "iq" && timeLeft > 0 && !isCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      handleQuizComplete()
    }
  }, [timeLeft, isCompleted, quizType])

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNextQuestion = () => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
    } else {
      handleQuizComplete()
    }
  }

  const handleQuizComplete = () => {
    setIsCompleted(true)
    const finalScore = Math.round((score / questions.length) * 10)
    onQuizComplete?.(finalScore)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  if (questions.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p>Loading quiz...</p>
        </CardContent>
      </Card>
    )
  }

  if (isCompleted) {
    const finalScore = Math.round((score / questions.length) * 10)
    return (
      <Card>
        <CardHeader className="text-center">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <CardTitle>Quiz Completed!</CardTitle>
          <CardDescription>{quizType === "iq" ? "IQ Assessment" : "Skills Assessment"} Results</CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="text-4xl font-bold text-blue-600">{finalScore}/10</div>
          <p className="text-gray-600">
            You scored {score} out of {questions.length} questions correctly
          </p>
          <Badge variant="outline" className="text-lg px-4 py-2">
            {finalScore >= 8 ? "Excellent" : finalScore >= 6 ? "Good" : "Needs Improvement"}
          </Badge>
        </CardContent>
      </Card>
    )
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="h-5 w-5" />
              <span>{quizType === "iq" ? "IQ Assessment" : "Skills Quiz"}</span>
            </CardTitle>
            <CardDescription>
              Question {currentQuestion + 1} of {questions.length}
            </CardDescription>
          </div>
          {quizType === "iq" && (
            <div className="flex items-center space-x-2 text-sm">
              <Clock className="h-4 w-4" />
              <span>{formatTime(timeLeft)}</span>
            </div>
          )}
        </div>
        <Progress value={progress} className="mt-4" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">{questions[currentQuestion].question}</h3>
          <div className="space-y-2">
            {questions[currentQuestion].options.map((option, index) => (
              <Button
                key={index}
                variant={selectedAnswer === index ? "default" : "outline"}
                className="w-full justify-start text-left h-auto p-4"
                onClick={() => handleAnswerSelect(index)}
              >
                <span className="mr-3 font-medium">{String.fromCharCode(65 + index)}.</span>
                {option}
              </Button>
            ))}
          </div>
        </div>
        <div className="flex justify-between">
          <Button
            variant="outline"
            disabled={currentQuestion === 0}
            onClick={() => setCurrentQuestion(currentQuestion - 1)}
          >
            Previous
          </Button>
          <Button onClick={handleNextQuestion} disabled={selectedAnswer === null}>
            {currentQuestion + 1 === questions.length ? "Complete Quiz" : "Next Question"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
