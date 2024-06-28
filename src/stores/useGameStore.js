import { defineStore } from 'pinia'

export const useGameStore = defineStore('game', {
  state: () => ({
    questions: []
  }),
  actions: {
    setQuestions(questions) {
      this.questions = questions
    },
    setCorrectAnswer(questionId, answer) {
      const question = this.questions.find((q) => q.id === questionId)

      if (!question) {
        // Question not found. This should not happen.
        return false
      }

      question.is_correct_answer = answer === question.correct_answer
      return question.is_correct_answer
    }
  }
})
