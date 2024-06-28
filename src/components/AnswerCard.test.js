import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AnswerCard from '@/components/AnswerCard.vue'
import { sanitizeHTML } from '@/utils/utils.js'

describe('AnswerCard.vue', () => {
  it('renders the sanitized answer', () => {
    const answer = '<b>Test Answer</b>'
    const sanitizedAnswer = sanitizeHTML(answer)
    const wrapper = mount(AnswerCard, {
      props: { answer }
    })

    expect(wrapper.html()).toContain(sanitizedAnswer)
  })

  it('applies correct class when wasCorrectAnswer is true', () => {
    const wrapper = mount(AnswerCard, {
      props: { wasCorrectAnswer: true }
    })

    expect(wrapper.find('[class*="correct"]').exists()).toBe(true)
  })

  it('applies incorrect class when wasCorrectAnswer is false', () => {
    const wrapper = mount(AnswerCard, {
      props: { wasCorrectAnswer: false }
    })

    expect(wrapper.find('[class*="incorrect"]').exists()).toBe(true)
  })

  it('does not apply correct or incorrect class when wasCorrectAnswer is null', () => {
    const wrapper = mount(AnswerCard, {
      props: { wasCorrectAnswer: null }
    })

    expect(wrapper.find('[class*="correct"]').exists()).toBe(false)
    expect(wrapper.find('[class*="incorrect"]').exists()).toBe(false)
  })
})
