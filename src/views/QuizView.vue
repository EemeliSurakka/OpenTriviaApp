<template>
  <div :class="$style.quiz">
    <div :class="$style.header">
      <p>Answered Questions:</p>
      <AnswersTracker
        :questions="questions"
        :questionStatus="questionStatus"
        :currentQuestionIndex="currentQuestionIndex"
      />
    </div>
    <p :class="$style.difficulty">
      Difficulty:
      {{
        currentQuestion?.difficulty?.charAt(0)?.toUpperCase() +
        currentQuestion?.difficulty?.slice(1)
      }}
    </p>
    <QuizQuestion v-if="currentQuestion" :quizQuestion="currentQuestion">
      <AnswerCard
        :answer="answer"
        v-for="answer in shuffledAnswers"
        :key="answer"
        :wasCorrectAnswer="selectedAnswer === answer ? isCorrect : null"
        @click="handleAnswerClick(answer)"
      />
      <FeedbackMessage :message="feedbackMessage" :isCorrect="isCorrect" />
      <button
        v-if="selectedAnswer !== null"
        :class="$style.nextButton"
        @click="handleNextButtonClick"
      >
        {{ buttonText }}
      </button>
    </QuizQuestion>
  </div>
</template>

<script setup>
import { useQuiz } from '@/composables/useQuiz.js'
import QuizQuestion from '@/components/QuizQuestion.vue'
import AnswerCard from '@/components/AnswerCard.vue'
import AnswersTracker from '@/components/AnswersTracker.vue'
import FeedbackMessage from '@/components/FeedbackMessage.vue' // Import the new component

const {
  questions,
  currentQuestionIndex,
  currentQuestion,
  shuffledAnswers,
  selectedAnswer,
  isCorrect,
  handleAnswerClick,
  handleNextButtonClick,
  buttonText,
  questionStatus,
  feedbackMessage
} = useQuiz()
</script>

<style module>
.quiz {
  padding-top: 10rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100%;

  @media (max-width: 800px) {
    padding-top: 1.5rem;
  }
}

.header {
  margin-bottom: 1rem;
  font-size: 1.25rem;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.difficulty {
  font-size: 1rem;
  color: salmon;
  margin-bottom: 1rem;

  @media (max-width: 800px) {
    margin-bottom: 0;
  }
}

.nextButton {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.nextButton:hover {
  background-color: #0056b3;
}
</style>
