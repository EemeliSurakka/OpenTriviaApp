import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import { describe, it, expect, vi } from 'vitest'
import SetupView from '@/views/SetupView.vue'

describe('SetupView', () => {
  vi.mock('@/composables/useInitGame.js', () => ({
    useInitGame: () => ({
      loading: ref(false),
      error: ref(null),
      startGame: vi.fn()
    })
  }))

  it('renders the component', () => {
    const wrapper = mount(SetupView)
    expect(wrapper.find('h1').text()).toBe('Trivia Night')
    expect(wrapper.find('label').text()).toBe('Select Difficulty:')
    expect(wrapper.findAll('option').length).toBe(3)
    expect(wrapper.find('button').text()).toBe('Start')
  })

  it('enables the start button when not loading', () => {
    const wrapper = mount(SetupView)
    const button = wrapper.find('button')
    expect(button.attributes('disabled')).toBeUndefined()
  })

  it('disables the start button when loading', async () => {
    const wrapper = mount(SetupView, {
      global: {
        mocks: {
          loading: ref(true)
        }
      }
    })
    const button = wrapper.find('button')
    expect(button.attributes('disabled')).toBeDefined()
  })
})
