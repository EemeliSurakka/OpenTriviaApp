import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useInitGame } from '@/composables/useInitGame'
import { triviaService } from '@/services/triviaService'
import { useGameStore } from '@/stores/useGameStore'
import { useRouter } from 'vue-router'

vi.mock('@/services/triviaService')
vi.mock('@/stores/useGameStore')
vi.mock('vue-router')

describe('useInitGame', () => {
  let gameStoreMock
  let routerMock
  let startNewGame

  beforeEach(() => {
    gameStoreMock = {
      setQuestions: vi.fn(),
      questions: []
    }
    useGameStore.mockReturnValue(gameStoreMock)

    routerMock = {
      push: vi.fn()
    }
    useRouter.mockReturnValue(routerMock)

    const { startGame } = useInitGame()
    startNewGame = startGame
  })

  it('should initialize loading and error as refs', () => {
    const { loading, error } = useInitGame()
    expect(loading.value).toBe(false)
    expect(error.value).toBe(null)
  })

  it('should navigate to /quiz if questions are set and no error', async () => {
    triviaService.mockResolvedValue({ data: [], error: null })
    gameStoreMock.questions = [{}]

    await startNewGame('easy')

    expect(routerMock.push).toHaveBeenCalledWith('/quiz')
  })

  it('should not navigate to /quiz if there is an error', async () => {
    triviaService.mockResolvedValue({ data: null, error: 'Service Error' })

    await startNewGame('easy')

    expect(routerMock.push).not.toHaveBeenCalled()
  })

  it('should not navigate to /quiz if no questions are set', async () => {
    triviaService.mockResolvedValue({ data: [], error: null })
    gameStoreMock.questions = []

    await startNewGame('easy')

    expect(routerMock.push).not.toHaveBeenCalled()
  })
})
