import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import AnswersTracker from '@/components/AnswersTracker.vue'

const mockStyles = {
  container: 'container',
  ball: 'ball',
  unanswered: 'unanswered',
  correct: 'correct',
  incorrect: 'incorrect',
  current: 'current'
}

describe('AnswersTracker', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(AnswersTracker, {
      props: {
        questions: [{ id: 1 }, { id: 2 }, { id: 3 }],
        questionStatus: [true, false, null],
        currentQuestionIndex: 2
      },
      global: {
        mocks: {
          $style: mockStyles
        }
      }
    })
  })

  it('renders the correct number of question balls', () => {
    const balls = wrapper.findAll(`.${mockStyles.ball}`)
    expect(balls.length).toBe(3)
  })

  it('applies the correct classes based on questionStatus and currentQuestionIndex', () => {
    const balls = wrapper.findAll(`.${mockStyles.ball}`)
    // Previous questions
    expect(balls[0].classes()).toContain(mockStyles.correct)
    expect(balls[1].classes()).toContain(mockStyles.incorrect)
    // Current question
    expect(balls[2].classes()).toContain(mockStyles.unanswered)
    expect(balls[2].classes()).toContain(mockStyles.current)
  })
})
