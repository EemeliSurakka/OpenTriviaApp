import { v4 as uuidv4 } from 'uuid';

/**
 * Represents a single quiz question.
 * @class
 * @property {string} id
 * @property {string} category
 * @property {string} correct_answer
 * @property {string} difficulty
 * @property {string[]} incorrect_answers
 * @property {string} question
 * @property {string} type
 * @property {boolean|null} is_correct_answer
 * @method getRandomizedAnswerOptions
 */
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
    this.id = uuidv4();
    this.category = category;
    this.correct_answer = correct_answer;
    this.difficulty = difficulty;
    this.incorrect_answers = incorrect_answers;
    this.question = question;
    this.type = type;
    this.is_correct_answer = null; // Value is null when not yet answered.
  }

  /**
   * Get all possible answers in randomized order.
   * @returns {string[]}
   */
  getRandomizedAnswerOptions() {
    return [this.correct_answer, ...this.incorrect_answers]
      .sort(() => Math.random() - 0.5);
  }
}
