import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach } from 'vitest'
import { useGameStore } from '@/stores/useGameStore.js'

describe('useGameStore', () => {
  let store

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useGameStore()
  })

  it('should initialize with an empty questions array', () => {
    expect(store.questions).toEqual([])
  })

  it('should set questions correctly', () => {
    const questions = [
      { id: 1, question: 'What is 2 + 2?', correct_answer: '4' },
      { id: 2, question: 'What is the capital of France?', correct_answer: 'Paris' }
    ]

    store.setQuestions(questions)
    expect(store.questions).toEqual(questions)
  })

  it('should set is_correct_answer to true for correct answer', () => {
    const questions = [
      { id: 1, question: 'What is 2 + 2?', correct_answer: '4', is_correct_answer: false }
    ]

    store.setQuestions(questions)
    store.setCorrectAnswer(1, '4')
    expect(store.questions[0].is_correct_answer).toBe(true)
  })

  it('should set is_correct_answer to false for incorrect answer', () => {
    const questions = [
      { id: 1, question: 'What is 2 + 2?', correct_answer: '4', is_correct_answer: false }
    ]

    store.setQuestions(questions)
    store.setCorrectAnswer(1, '3')
    expect(store.questions[0].is_correct_answer).toBe(false)
  })

  it('should return false if question is not found', () => {
    const questions = [
      { id: 1, question: 'What is 2 + 2?', correct_answer: '4', is_correct_answer: false }
    ]

    store.setQuestions(questions)
    const result = store.setCorrectAnswer(2, '4')
    expect(result).toBe(false)
  })
})
