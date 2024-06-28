export default class QuizQuestion {
  /**
   * @param {string} category
   * @param {string} correct_answer
   * @param {string} difficulty
   * @param {string[]} incorrect_answers
   * @param {string} question
   * @param {string} type
   */
  constructor(category, correct_answer, difficulty, incorrect_answers, question, type) {
    this.category = category;
    this.correct_answer = correct_answer;
    this.difficulty = difficulty;
    this.incorrect_answers = incorrect_answers;
    this.question = question;
    this.type = type;
    this.is_correct_answer = null; // Value is null when not yet answered.
  }

  /**
   * Check if a given answer is correct.
   * @param {string} answer
   * @returns {boolean}
   */
  checkAnswer(answer) {
    this.is_correct_answer = (answer === this.correct_answer);
    return this.is_correct_answer;
  }
}
