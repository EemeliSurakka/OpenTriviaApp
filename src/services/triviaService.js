import axios from 'axios';

const API_URL = 'https://opentdb.com/api.php?amount=10';
const TOKEN_URL = 'https://opentdb.com/api_token.php?command=request';
const TOKEN_KEY = 'trivia_token';
const TOKEN_TIMESTAMP_KEY = 'trivia_token_timestamp';
const TOKEN_EXPIRATION_HOURS = 3;

export const triviaService = async (difficulty = 'medium') => {
  try {
    const token = await triviaTokenService();
    const response = await axios.get(`${API_URL}&token=${token}&difficulty=${difficulty}`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching trivia questions:', error);
    return [];
  }
};

const triviaTokenService = async () => {
  let token = getStoredToken();

  if (!token || isTokenExpired()) {
    token = await fetchNewToken();
    if (!token) {
      throw new Error('Failed to fetch a new token');
    }
  }

  return token;
}

const getStoredToken = () => {
  return localStorage.getItem(TOKEN_KEY);
}

const setStoredToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(TOKEN_TIMESTAMP_KEY, Date.now().toString());
}

const isTokenExpired = () => {
  const tokenTimestamp = localStorage.getItem(TOKEN_TIMESTAMP_KEY);
  if (!tokenTimestamp) {
    return true;
  }
  const tokenAge = (Date.now() - parseInt(tokenTimestamp, 10)) / (1000 * 60 * 60);
  return tokenAge >= TOKEN_EXPIRATION_HOURS;
}

export const fetchNewToken = async () => {
  try {
    const response = await axios.get(TOKEN_URL);
    const token = response.data.token;
    setStoredToken(token);
    return token;
  } catch (error) {
    console.error('Error fetching new token:', error);
    throw new Error('Failed to fetch a new token');
  }
}
