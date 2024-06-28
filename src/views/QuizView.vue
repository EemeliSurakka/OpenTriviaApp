<template>
  <div :class="$style.quiz">
    <div :class="$style.header">
      <p>Answered Questions:</p>
      <AnswerBalls :questions="questions" :questionStatus="questionStatus" />
    </div>
    <QuizQuestion v-if="currentQuestion" :quizQuestion="currentQuestion">
      <AnswerCard
        :answer="answer"
        v-for="answer in shuffledAnswers"
        :key="answer"
        :wasCorrectAnswer="selectedAnswer === answer ? isCorrect : null"
        @click="handleAnswerClick(answer)"
      />
    </QuizQuestion>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useGameStore } from '@/stores/useGameStore';
import { useInitGame } from '@/composables/useInitGame.js';
import QuizQuestion from '@/components/QuizQuestion.vue';
import AnswerCard from '@/components/AnswerCard.vue';
import AnswerBalls from '@/components/AnswersTracker.vue';

const { startGame } = useInitGame();

const gameStore = useGameStore();
startGame('easy');

const questions = ref([]);
const currentQuestionIndex = ref(0);
const currentQuestion = computed(() => questions.value[currentQuestionIndex.value]);
const shuffledAnswers = ref([]);
const selectedAnswer = ref(null);
const isCorrect = ref(null);
const answeredQuestions = ref([]); // Array to track answered questions and their correctness

watch(() => gameStore.questions,
  (newQuestions) => questions.value = newQuestions,
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

const questionStatus = computed(() => {
  return questions.value.map(question => {
    const answered = answeredQuestions.value.find(q => q.id === question.id);
    return answered ? answered.correct : null;
  });
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

.header ul {
  list-style-type: none;
  padding: 0;
}

.header li {
  margin: 0.5rem 0;
}
</style>
