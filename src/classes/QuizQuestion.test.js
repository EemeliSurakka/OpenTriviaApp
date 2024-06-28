import { describe, it, expect } from 'vitest'
import QuizQuestion from './QuizQuestion'
import mockQuestions from '@/mocks/questions.js'

describe('QuizQuestion', () => {
  const mockQuestion = mockQuestions[0]
  const quizQuestion = new QuizQuestion(
    mockQuestion.category,
    mockQuestion.correct_answer,
    mockQuestion.difficulty,
    mockQuestion.incorrect_answers,
    mockQuestion.question,
    mockQuestion.type
  )

  it('should create an instance with the correct properties', () => {
    expect(quizQuestion.category).toBe(mockQuestion.category)
    expect(quizQuestion.correct_answer).toBe(mockQuestion.correct_answer)
    expect(quizQuestion.difficulty).toBe(mockQuestion.difficulty)
    expect(quizQuestion.incorrect_answers).toEqual(mockQuestion.incorrect_answers)
    expect(quizQuestion.question).toBe(mockQuestion.question)
    expect(quizQuestion.type).toBe(mockQuestion.type)
    expect(quizQuestion.is_correct_answer).toBe(null)
  })

  it('should return randomized answer options including the correct and incorrect answers', () => {
    const originalOptions = [mockQuestion.correct_answer, ...mockQuestion.incorrect_answers]
    let differentOrderFound = false

    for (let i = 0; i < 5; i++) {
      const answerOptions = quizQuestion.getRandomizedAnswerOptions()

      // Check if all answer options are present
      expect(answerOptions).toContain(mockQuestion.correct_answer)
      mockQuestion.incorrect_answers.forEach((incorrect_answer) => {
        expect(answerOptions).toContain(incorrect_answer)
      })

      expect(answerOptions.length).toBe(mockQuestion.incorrect_answers.length + 1)

      // Check if the order is different from the original at least once
      if (!differentOrderFound) {
        for (let j = 0; j < answerOptions.length; j++) {
          if (answerOptions[j] !== originalOptions[j]) {
            differentOrderFound = true
            break
          }
        }
      }
    }

    expect(differentOrderFound).toBe(true)
  })
})
