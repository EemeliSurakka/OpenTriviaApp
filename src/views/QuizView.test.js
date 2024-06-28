import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import QuizView from '@/views/QuizView.vue'
import { useQuiz } from '@/composables/useQuiz.js'
import QuizQuestion from '@/classes/QuizQuestion.js'

vi.mock('@/composables/useQuiz.js')

const mockQuestions = [
  new QuizQuestion(1, '4', 'easy', ['3', '2', '1'], 'What is 2+2?', 'easy'),
  new QuizQuestion(2, '3', 'easy', ['3', '2', '1'], 'What is 1+2?', 'easy')
]

const mockClasses = {
  nextButton: 'nextButton',
  header: 'header',
  difficulty: 'difficulty'
}

describe('QuizView', () => {
  let quizMock
  let wrapper

  beforeEach(() => {
    quizMock = {
      questions: mockQuestions,
      currentQuestionIndex: 0,
      currentQuestion: mockQuestions[0],
      shuffledAnswers: ['4', '3', '2', '1'],
      selectedAnswer: null,
      isCorrect: null,
      handleAnswerClick: vi.fn(),
      handleNextButtonClick: vi.fn(),
      buttonText: 'Next',
      questionStatus: ['correct', 'incorrect'],
      feedbackMessage: ''
    }
    useQuiz.mockReturnValue(quizMock)

    wrapper = mount(QuizView, {
      global: {
        mocks: {
          $style: mockClasses
        }
      }
    })
  })

  it('renders the component', () => {
    expect(wrapper.findComponent({ name: 'AnswersTracker' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'QuizQuestion' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'AnswerCard' }).exists()).toBe(true)
    expect(wrapper.find('.nextButton').exists()).toBe(false) // Not visible because no answer
    expect(wrapper.find('.header').exists()).toBe(true)
    expect(wrapper.find('.difficulty').exists()).toBe(true)
  })

  it('displays answers', async () => {
    const answerCards = wrapper.findAllComponents({ name: 'AnswerCard' })
    expect(answerCards).toHaveLength(4)
  })

  it('shows feedback message and next button when an answer is selected', async () => {
    quizMock.selectedAnswer = '4'
    quizMock.isCorrect = true
    quizMock.feedbackMessage = 'Correct!'

    wrapper = mount(QuizView, {
      global: {
        mocks: {
          $style: mockClasses
        }
      }
    })

    expect(wrapper.findComponent({ name: 'FeedbackMessage' }).exists()).toBe(true)
    expect(wrapper.find('.nextButton').exists()).toBe(true)
    expect(wrapper.find('.nextButton').text()).toBe('Next')
  })

  it('calls handleNextButtonClick when the next button is clicked', async () => {
    quizMock.selectedAnswer = '4'
    quizMock.isCorrect = true
    quizMock.feedbackMessage = 'Correct!'

    wrapper = mount(QuizView, {
      global: {
        mocks: {
          $style: mockClasses
        }
      }
    })

    const nextButton = wrapper.find('.nextButton')
    await nextButton.trigger('click')
    expect(quizMock.handleNextButtonClick).toHaveBeenCalledTimes(1)
  })
})
