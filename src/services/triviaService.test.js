import { describe, it, expect, vi } from 'vitest'
import axios from 'axios'
import { triviaService } from '@/services/triviaService'

vi.mock('axios')

describe('triviaService', () => {
  const mockTokenService = vi.fn()

  it('fetches trivia questions successfully with a token', async () => {
    mockTokenService.mockResolvedValueOnce({ token: 'test-token', error: null })
    axios.get.mockResolvedValueOnce({ data: { results: [{ question: 'Test question?' }] } })

    const { data, error } = await triviaService('easy', mockTokenService)

    expect(data).toEqual([{ question: 'Test question?' }])
    expect(error).toBeNull()
    expect(axios.get).toHaveBeenCalledWith(
      'https://opentdb.com/api.php?amount=10&token=test-token&difficulty=easy'
    )
  })

  it('handles token fetch failure by making the query without the token', async () => {
    mockTokenService.mockResolvedValueOnce({ token: null, error: 'Token fetch failed' })
    axios.get.mockResolvedValueOnce({ data: { results: [{ question: 'Test question?' }] } })

    const { data, error } = await triviaService('medium', mockTokenService)

    expect(data).toEqual([{ question: 'Test question?' }])
    expect(error).toBeNull()
    expect(axios.get).toHaveBeenCalledWith(
      'https://opentdb.com/api.php?amount=10&difficulty=medium'
    )
  })

  it('handles API request failure', async () => {
    mockTokenService.mockResolvedValueOnce({ token: 'test-token', error: null })
    axios.get.mockRejectedValueOnce('API request failed')

    const { data, error } = await triviaService('medium', mockTokenService)

    expect(data).toEqual([])
    expect(error).toBe('Failed to fetch trivia questions')
  })
})
