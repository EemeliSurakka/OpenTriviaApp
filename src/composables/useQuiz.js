import { ref, computed, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '@/stores/useGameStore'

export function useQuiz() {
  const router = useRouter()
  const gameStore = useGameStore()

  const questions = ref([])
  const currentQuestionIndex = ref(0)
  const currentQuestion = computed(() => questions.value[currentQuestionIndex.value])
  const shuffledAnswers = ref([])
  const selectedAnswer = ref(null)
  const isCorrect = ref(null)
  const answeredQuestions = ref([])

  const buttonText = computed(() => {
    return currentQuestionIndex.value < questions.value.length - 1 ? 'Next Question' : 'Finish'
  })

  const questionStatus = computed(() => {
    return questions.value.map((question) => {
      const answered = answeredQuestions.value.find((q) => q.id === question.id)
      return answered ? answered.correct : null
    })
  })

  const feedbackMessage = computed(() => {
    if (selectedAnswer.value === null) return ''
    if (isCorrect.value) {
      return 'Correct!'
    } else {
      return `Incorrect. The correct answer is: ${currentQuestion.value.correct_answer}`
    }
  })

  watchEffect(() => {
    questions.value = gameStore.questions
    if (currentQuestionIndex.value === questions.value.length) {
      router.push('/')
    }
  })

  watchEffect(() => {
    const newQuestion = currentQuestion.value
    if (newQuestion) {
      shuffledAnswers.value = newQuestion.getRandomizedAnswerOptions()
      selectedAnswer.value = null
      isCorrect.value = null
    }
  })

  const handleAnswerClick = (answer) => {
    if (selectedAnswer.value === null) {
      const questionId = currentQuestion.value.id
      const correct = gameStore.setCorrectAnswer(questionId, answer)
      isCorrect.value = correct
      answeredQuestions.value.push({ id: questionId, correct })
      selectedAnswer.value = answer
    }
  }

  const handleNextButtonClick = () => {
    if (currentQuestionIndex.value < questions.value.length - 1) {
      currentQuestionIndex.value += 1
    } else {
      router.push('/')
    }
  }

  return {
    questions,
    currentQuestionIndex,
    currentQuestion,
    shuffledAnswers,
    selectedAnswer,
    isCorrect,
    handleAnswerClick,
    handleNextButtonClick,
    buttonText,
    questionStatus,
    feedbackMessage
  }
}
