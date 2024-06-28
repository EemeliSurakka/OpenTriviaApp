import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import QuizQuestionComponent from '@/components/QuizQuestion.vue'
import QuizQuestionClass from '@/classes/QuizQuestion.js'
import { sanitizeHTML } from '@/utils/utils.js'
import mockQuestions from '@/mocks/questions.js'

const { category, correct_answer, difficulty, incorrect_answers, question, type } = mockQuestions[0]
const quizQuestion = new QuizQuestionClass(
  category,
  correct_answer,
  difficulty,
  incorrect_answers,
  question,
  type
)

describe('QuizQuestion', () => {
  it('renders the question correctly', () => {
    const wrapper = mount(QuizQuestionComponent, {
      props: { quizQuestion }
    })

    expect(wrapper.find('h2').html()).toContain(sanitizeHTML(quizQuestion.question))
  })

  it('renders the slot content correctly', () => {
    const wrapper = mount(QuizQuestionComponent, {
      props: { quizQuestion },
      slots: {
        default: '<div class="answer">Answer 1</div><div class="answer">Answer 2</div>'
      }
    })

    const answers = wrapper.findAll('.answer')
    expect(answers.length).toBe(2)
    expect(answers[0].text()).toBe('Answer 1')
    expect(answers[1].text()).toBe('Answer 2')
  })
})
