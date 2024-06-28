import axios from 'axios'
import {
  TOKEN_URL,
  TOKEN_EXPIRATION_HOURS,
  TOKEN_TIMESTAMP_KEY,
  TOKEN_KEY
} from '@/utils/consts.js'

export const triviaTokenService = async () => {
  let token = getStoredToken()

  if (!token || isTokenExpired()) {
    const { token: newToken, error: fetchError } = await fetchNewToken()
    if (fetchError) {
      return { token: null, error: fetchError }
    }
    token = newToken
  }

  return { token, error: null }
}

const getStoredToken = () => {
  return localStorage.getItem(TOKEN_KEY)
}

const setStoredToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem(TOKEN_TIMESTAMP_KEY, Date.now().toString())
}

const isTokenExpired = () => {
  const tokenTimestamp = localStorage.getItem(TOKEN_TIMESTAMP_KEY)
  if (!tokenTimestamp) {
    return true
  }
  const tokenAge = (Date.now() - parseInt(tokenTimestamp, 10)) / (1000 * 60 * 60)
  return tokenAge >= TOKEN_EXPIRATION_HOURS
}

const fetchNewToken = async () => {
  try {
    const response = await axios.get(TOKEN_URL)
    const token = response.data.token
    setStoredToken(token)
    return { token, error: null }
  } catch (error) {
    return { token: null, error: 'Failed to fetch a new token' }
  }
}
