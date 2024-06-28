import { setActivePinia, createPinia } from 'pinia'
import { useRouter } from 'vue-router'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useQuiz } from '@/composables/useQuiz'
import { useGameStore } from '@/stores/useGameStore.js'
import { nextTick } from 'vue'

vi.mock('vue-router')

describe('useQuiz', () => {
  let routerMock

  beforeEach(() => {
    const pinia = createPinia()
    setActivePinia(pinia)

    routerMock = {
      push: vi.fn()
    }
    useRouter.mockReturnValue(routerMock)
  })

  it('should initialize refs and computed values correctly', () => {
    const {
      questions,
      currentQuestionIndex,
      currentQuestion,
      shuffledAnswers,
      selectedAnswer,
      isCorrect,
      buttonText,
      questionStatus,
      feedbackMessage
    } = useQuiz()

    expect(questions.value).toEqual([])
    expect(currentQuestionIndex.value).toBe(0)
    expect(currentQuestion.value).toBeUndefined()
    expect(shuffledAnswers.value).toEqual([])
    expect(selectedAnswer.value).toBeNull()
    expect(isCorrect.value).toBeNull()
    expect(buttonText.value).toBe('Finish') // Since no questions are initialized
    expect(questionStatus.value).toEqual([])
    expect(feedbackMessage.value).toBe('')
  })

  it('should update questions', async () => {
    const gameStore = useGameStore()
    const { questions } = useQuiz()
    const newQuestions = [
      {
        id: 1,
        question: 'Question 1',
        getRandomizedAnswerOptions: () => ['A', 'B', 'C', 'D'],
        correct_answer: 'A'
      }
    ]

    expect(questions.value).toEqual([])
    gameStore.setQuestions(newQuestions)

    await nextTick()

    expect(questions.value).toEqual(newQuestions)
  })

  it('should shuffle answers and reset selection on new question', async () => {
    const gameStore = useGameStore()
    const { shuffledAnswers, selectedAnswer, isCorrect } = useQuiz()
    const newQuestions = [
      {
        id: 1,
        question: 'Question 1',
        getRandomizedAnswerOptions: () => ['A', 'B', 'C', 'D'],
        correct_answer: 'A'
      }
    ]
    gameStore.setQuestions(newQuestions)
    await nextTick()

    expect(shuffledAnswers.value).toEqual(['A', 'B', 'C', 'D'])
    expect(selectedAnswer.value).toBeNull()
    expect(isCorrect.value).toBeNull()
  })

  it('should set selectedAnswer to given value and isCorrect to true when answer is correct', async () => {
    const gameStore = useGameStore()
    const { handleAnswerClick, selectedAnswer, isCorrect } = useQuiz()
    const newQuestions = [
      {
        id: 1,
        question: 'Question 1',
        getRandomizedAnswerOptions: () => ['A', 'B', 'C', 'D'],
        correct_answer: 'A'
      }
    ]

    gameStore.setQuestions(newQuestions)
    await nextTick()

    handleAnswerClick('A')
    await nextTick()

    expect(selectedAnswer.value).toBe('A')
    expect(isCorrect.value).toBe(true)
  })

  it('should update currentQuestionIndex and route to root when all questions answered', async () => {
    const gameStore = useGameStore()
    const { currentQuestionIndex, handleNextButtonClick } = useQuiz()
    const newQuestions = [
      {
        id: 1,
        question: 'Question 1',
        getRandomizedAnswerOptions: () => ['A', 'B', 'C', 'D'],
        correct_answer: 'A'
      },
      {
        id: 2,
        question: 'Question 2',
        getRandomizedAnswerOptions: () => ['E', 'F', 'G', 'H'],
        correct_answer: 'F'
      }
    ]

    gameStore.setQuestions(newQuestions)
    await nextTick()

    currentQuestionIndex.value = 0
    handleNextButtonClick()
    await nextTick()

    expect(currentQuestionIndex.value).toBe(1)

    handleNextButtonClick()
    await nextTick()

    expect(routerMock.push).toHaveBeenCalledWith('/')
  })

  it('should provide correct feedback message', async () => {
    const gameStore = useGameStore()
    const { selectedAnswer, isCorrect, feedbackMessage } = useQuiz()
    const newQuestions = [
      {
        id: 1,
        question: 'Question 1',
        getRandomizedAnswerOptions: () => ['A', 'B', 'C', 'D'],
        correct_answer: 'A'
      }
    ]

    gameStore.setQuestions(newQuestions)
    await nextTick()

    selectedAnswer.value = 'A'
    isCorrect.value = true

    expect(feedbackMessage.value).toBe('Correct!')

    selectedAnswer.value = 'B'
    isCorrect.value = false

    expect(feedbackMessage.value).toBe('Incorrect. The correct answer is: A')
  })
})
