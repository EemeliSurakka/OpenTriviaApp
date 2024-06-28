import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import FeedbackMessage from '@/components/FeedbackMessage.vue'

const mockClasses = {
  feedbackMessage: 'feedbackMessage',
  correct: 'correct',
  incorrect: 'incorrect'
}

describe('FeedbackMessage.vue', () => {
  it('renders message when passed', () => {
    const wrapper = mount(FeedbackMessage, {
      props: { message: 'Test message', isCorrect: true },
      global: {
        mocks: {
          $style: mockClasses
        }
      }
    })
    expect(wrapper.html()).toContain('Test message')
  })

  it('applies correct class when isCorrect is true', () => {
    const wrapper = mount(FeedbackMessage, {
      props: { message: 'Test message', isCorrect: true },
      global: {
        mocks: {
          $style: mockClasses
        }
      }
    })
    const pElement = wrapper.find('p')
    expect(pElement.classes()).toContain(mockClasses.correct)
    expect(pElement.classes()).not.toContain(mockClasses.incorrect)
  })

  it('applies incorrect class when isCorrect is false', () => {
    const wrapper = mount(FeedbackMessage, {
      props: { message: 'Test message', isCorrect: false },
      global: {
        mocks: {
          $style: mockClasses
        }
      }
    })
    const pElement = wrapper.find('p')
    expect(pElement.classes()).toContain(mockClasses.incorrect)
    expect(pElement.classes()).not.toContain(mockClasses.correct)
  })
})
