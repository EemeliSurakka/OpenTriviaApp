import axios from 'axios';
import { triviaTokenService } from '@/services/triviaTokenService.js'
import { API_URL } from '@/utils/consts.js'


export const triviaService = async (difficulty = 'medium', tokenService = triviaTokenService) => {
  try {
    const { token } = await tokenService();

    const url = token ? `${API_URL}&token=${token}&difficulty=${difficulty}` : `${API_URL}&difficulty=${difficulty}`;

    const response = await axios.get(url);
    return { data: response.data.results, error: null };
  } catch (error) {
    return { data: [], error: 'Failed to fetch trivia questions' };
  }
};

