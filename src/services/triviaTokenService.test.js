import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import axios from 'axios';
import { triviaTokenService } from './triviaTokenService';
import { TOKEN_EXPIRATION_HOURS, TOKEN_KEY, TOKEN_TIMESTAMP_KEY } from '@/utils/consts.js';

vi.mock('axios');

describe('triviaTokenService', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should return stored token if it exists and is not expired', async () => {
    const mockToken = 'mocked_token';
    const mockTimestamp = Date.now().toString(); // current time

    localStorage.setItem(TOKEN_KEY, mockToken);
    localStorage.setItem(TOKEN_TIMESTAMP_KEY, mockTimestamp);

    const result = await triviaTokenService();

    expect(result).toEqual({ token: mockToken, error: null });
  });

  it('should fetch a new token if there is no stored token', async () => {
    const newToken = 'new_token';

    axios.get.mockResolvedValue({ data: { token: newToken } });

    const result = await triviaTokenService();

    expect(result).toEqual({ token: newToken, error: null });
    expect(localStorage.getItem(TOKEN_KEY)).toBe(newToken);
  });

  it('should fetch a new token if the stored token is expired', async () => {
    const mockToken = 'mocked_token';
    const expiredTimestamp = (Date.now() - TOKEN_EXPIRATION_HOURS * 60 * 60 * 1000 - 1).toString(); // just over 3 hours ago
    const newToken = 'new_token';

    localStorage.setItem(TOKEN_KEY, mockToken);
    localStorage.setItem(TOKEN_TIMESTAMP_KEY, expiredTimestamp);

    axios.get.mockResolvedValue({ data: { token: newToken } });

    const result = await triviaTokenService();

    expect(result).toEqual({ token: newToken, error: null });
    expect(localStorage.getItem(TOKEN_KEY)).toBe(newToken);
  });

  it('should return an error if fetching a new token fails', async () => {
    axios.get.mockRejectedValue(new Error('Network Error'));

    const result = await triviaTokenService();

    expect(result).toEqual({ token: null, error: 'Failed to fetch a new token' });
  });
});
