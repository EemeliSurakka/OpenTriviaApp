<template>
  <div :class="$style.quiz">
    <div :class="$style.header">
      <p>Answered Questions:</p>
      <AnswersTracker :questions="questions" :questionStatus="questionStatus" :currentQuestionIndex="currentQuestionIndex" />
    </div>
    <p :class="$style.difficulty">
      Difficulty: {{ currentQuestion?.difficulty?.charAt(0)?.toUpperCase() + currentQuestion?.difficulty?.slice(1) }}
    </p>
    <QuizQuestion v-if="currentQuestion" :quizQuestion="currentQuestion">
      <AnswerCard
        :answer="answer"
        v-for="answer in shuffledAnswers"
        :key="answer"
        :wasCorrectAnswer="selectedAnswer === answer ? isCorrect : null"
        @click="handleAnswerClick(answer)"
      />
      <p v-html="feedbackMessage" v-if="feedbackMessage" :class="[$style.feedbackMessage, { [$style.correct]: isCorrect, [$style.incorrect]: isCorrect === false }]"></p>
      <button v-if="selectedAnswer !== null" :class="$style.nextButton" @click="handleNextButtonClick">
        {{ buttonText }}
      </button>
    </QuizQuestion>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useGameStore } from '@/stores/useGameStore';
import QuizQuestion from '@/components/QuizQuestion.vue';
import AnswerCard from '@/components/AnswerCard.vue';
import { sanitizeHTML } from '@/utils/utils.js';
import AnswersTracker from '@/components/AnswersTracker.vue'

const router = useRouter();

const gameStore = useGameStore();

const questions = ref([]);
const currentQuestionIndex = ref(0);
const currentQuestion = computed(() => questions.value[currentQuestionIndex.value]);
const shuffledAnswers = ref([]);
const selectedAnswer = ref(null);
const isCorrect = ref(null);
const answeredQuestions = ref([]);

watch(() => gameStore.questions,
  (newQuestions) => {
    questions.value = newQuestions;
    if (newQuestions.length === 0) {
      router.push('/');
    }
  },
  { immediate: true }
);

watch(currentQuestion, (newQuestion) => {
  if (newQuestion) {
    shuffledAnswers.value = newQuestion.getRandomizedAnswerOptions();
    selectedAnswer.value = null;
    isCorrect.value = null;
  }
}, { immediate: true });

const handleAnswerClick = (answer) => {
  if (selectedAnswer.value === null) {
    const questionId = currentQuestion.value.id;
    const correct = gameStore.setCorrectAnswer(questionId, answer);
    isCorrect.value = correct;
    answeredQuestions.value.push({ id: questionId, correct });
    selectedAnswer.value = answer;
  }
};

const handleNextButtonClick = () => {
  if (currentQuestionIndex.value < questions.value.length - 1) {
    currentQuestionIndex.value += 1;
  } else {
    router.push('/');
  }
};

const buttonText = computed(() => {
  return currentQuestionIndex.value < questions.value.length - 1 ? 'Next Question' : 'Finish';
});

const questionStatus = computed(() => {
  return questions.value.map(question => {
    const answered = answeredQuestions.value.find(q => q.id === question.id);
    return answered ? answered.correct : null;
  });
});

const feedbackMessage = computed(() => {
  if (selectedAnswer.value === null) return '';
  if (isCorrect.value) {
    return 'Correct!';
  } else {
    return `Incorrect. The correct answer is: ${sanitizeHTML(currentQuestion.value.correct_answer)}`;
  }
});
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
    padding-top: 4rem;
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
}

.feedbackMessage {
  margin-top: 1rem;
  font-size: 1.25rem;
  color: white;
}

.correct {
  color: green;
}

.incorrect {
  color: red;
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
