import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import AnswerCard from '@/components/AnswerCard.vue'
import { sanitizeHTML } from '@/utils/utils.js'

vi.mock('@/utils/utils.js', () => ({
  sanitizeHTML: vi.fn((html) => html.replace(/#039;/g, "'"))
}))
const answer = '<b>Test #039;Answer#039;</b>'

const mockClasses = {
  correct: 'correct',
  incorrect: 'incorrect'
}

describe('AnswerCard.vue', () => {
  it('renders the sanitized answer', () => {
    const sanitizedAnswer = sanitizeHTML(answer)
    const wrapper = mount(AnswerCard, {
      props: { answer },
      global: {
        mocks: {
          $style: mockClasses
        }
      }
    })

    expect(wrapper.html()).toContain(sanitizedAnswer)
    expect(wrapper.html()).not.toContain('<b>Test #039;Answer#039;</b>')
  })

  it('applies correct class when wasCorrectAnswer is true', () => {
    const wrapper = mount(AnswerCard, {
      props: { answer, wasCorrectAnswer: true }
    })

    expect(wrapper.find('[class*="correct"]').exists()).toBe(true)
  })

  it('applies incorrect class when wasCorrectAnswer is false', () => {
    const wrapper = mount(AnswerCard, {
      props: { answer, wasCorrectAnswer: false },
      global: {
        mocks: {
          $style: mockClasses
        }
      }
    })

    expect(wrapper.find('[class*="incorrect"]').exists()).toBe(true)
  })
})
