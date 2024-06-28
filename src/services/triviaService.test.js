import { describe, it, expect, beforeEach, vi } from 'vitest';
import axios from 'axios';
import { triviaService, fetchNewToken } from './triviaService.js';

vi.mock('axios');

const API_URL = 'https://opentdb.com/api.php?amount=10';
const TOKEN_URL = 'https://opentdb.com/api_token.php?command=request';

describe('triviaService', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('should fetch new token and store it if not present in localStorage', async () => {
    const mockTokenResponse = { data: { token: 'newToken123' } };
    const mockTriviaResponse = { data: { results: ['question1', 'question2'] } };

    axios.get.mockImplementation((url) => {
      if (url === TOKEN_URL) {
        return Promise.resolve(mockTokenResponse);
      } else if (url.startsWith(API_URL)) {
        return Promise.resolve(mockTriviaResponse);
      }
    });

    const result = await triviaService('easy');

    expect(localStorage.getItem('trivia_token')).toBe('newToken123');
    expect(result).toEqual(['question1', 'question2']);
  });

  it('should fetch trivia questions with the existing token in localStorage', async () => {
    localStorage.setItem('trivia_token', 'existingToken456');
    localStorage.setItem('trivia_token_timestamp', Date.now().toString());

    const mockTriviaResponse = { data: { results: ['question1', 'question2'] } };

    axios.get.mockResolvedValue(mockTriviaResponse);

    const result = await triviaService('medium');

    expect(localStorage.getItem('trivia_token')).toBe('existingToken456');
    expect(result).toEqual(['question1', 'question2']);
  });

  it('should fetch a new token if the existing token is expired', async () => {
    localStorage.setItem('trivia_token', 'expiredToken789');
    const expiredTimestamp = Date.now() - (4 * 60 * 60 * 1000); // 4 hours ago
    localStorage.setItem('trivia_token_timestamp', expiredTimestamp.toString());

    const mockNewTokenResponse = { data: { token: 'newToken123' } };
    const mockTriviaResponse = { data: { results: ['question1', 'question2'] } };

    axios.get.mockImplementation((url) => {
      if (url === TOKEN_URL) {
        return Promise.resolve(mockNewTokenResponse);
      } else if (url.startsWith(API_URL)) {
        return Promise.resolve(mockTriviaResponse);
      }
    });

    const result = await triviaService('hard');

    expect(localStorage.getItem('trivia_token')).toBe('newToken123');
    expect(result).toEqual(['question1', 'question2']);
  });

  it('should handle error if fetching new token fails', async () => {
    axios.get.mockRejectedValue('Network Error');

    await expect(fetchNewToken()).rejects.toThrow('Failed to fetch a new token');
  });

  it('should handle error if fetching trivia questions fails', async () => {
    localStorage.setItem('trivia_token', 'existingToken456');
    localStorage.setItem('trivia_token_timestamp', Date.now().toString());

    axios.get.mockRejectedValue('Network Error');

    const result = await triviaService('medium');

    expect(result).toEqual([]);
  });
});
