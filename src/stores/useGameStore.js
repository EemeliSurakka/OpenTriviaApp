import { defineStore } from 'pinia';

export const useGameStore = defineStore('game', {
  state: () => ({
    questions: [],
  }),
  actions: {
    setQuestions(questions) {
      this.questions = questions;
    },
    setCorrectAnswer(questionId, answer) {
      const question = this.questions.find(q => q.id === questionId);
      if (question && answer === question.correct_answer) {
        return question.is_correct_answer = true;
      }
      return question.is_correct_answer = false;
    },
  },
});
