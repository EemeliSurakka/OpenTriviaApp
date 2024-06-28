import { describe, it, expect } from 'vitest';
import QuizQuestion from './QuizQuestion';

describe('QuizQuestion', () => {
  it('should create an instance with the correct properties', () => {
    const category = 'Science';
    const correct_answer = 'H2O';
    const difficulty = 'easy';
    const incorrect_answers = ['CO2', 'N2', 'O2'];
    const question = 'What is the chemical formula for water?';
    const type = 'multiple';

    const quizQuestion = new QuizQuestion(category, correct_answer, difficulty, incorrect_answers, question, type);

    expect(quizQuestion.category).toBe(category);
    expect(quizQuestion.correct_answer).toBe(correct_answer);
    expect(quizQuestion.difficulty).toBe(difficulty);
    expect(quizQuestion.incorrect_answers).toEqual(incorrect_answers);
    expect(quizQuestion.question).toBe(question);
    expect(quizQuestion.type).toBe(type);
    expect(quizQuestion.is_correct_answer).toBe(null);
  });

  it('should correctly evaluate the given answer', () => {
    const quizQuestion = new QuizQuestion(
      'Science',
      'H2O',
      'easy',
      ['CO2', 'N2', 'O2'],
      'What is the chemical formula for water?',
      'multiple'
    );

    const result = quizQuestion.checkAnswer('H2O');
    expect(result).toBe(true);
    expect(quizQuestion.is_correct_answer).toBe(true);

    const resultFalse = quizQuestion.checkAnswer('CO2');
    expect(resultFalse).toBe(false);
    expect(quizQuestion.is_correct_answer).toBe(false);
  });
});
