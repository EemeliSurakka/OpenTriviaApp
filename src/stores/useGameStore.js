import { defineStore } from 'pinia';

export const useGameStore = defineStore('game', {
  state: () => ({
    questions: [],
  }),
  actions: {
    setQuestions(questions) {
      this.questions = questions;
    },
  },
});
