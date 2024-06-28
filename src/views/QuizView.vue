<template>
  <div :class="$style.quiz">
    <QuizQuestion v-if="currentQuestion" :quizQuestion="currentQuestion">
      <AnswerCard :answer="answer" v-for="answer in shuffledAnswers" :key="answer"/>
    </QuizQuestion>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useGameStore } from '@/stores/useGameStore';
import { useInitGame } from '@/composables/useInitGame.js';
import QuizQuestion from '@/components/QuizQuestion.vue';
import AnswerCard from '@/components/AnswerCard.vue';

const { startGame } = useInitGame();

const gameStore = useGameStore();
startGame('easy');

const questions = ref([]);
const currentQuestionIndex = ref(0);

watch(() => gameStore.questions,
  (newQuestions) => questions.value = newQuestions,
  { immediate: true }
);

const currentQuestion = computed(() => questions.value[currentQuestionIndex.value]);
const shuffledAnswers = ref([]);

watch(currentQuestion, (newQuestion) => {
  if (newQuestion) {
    shuffledAnswers.value = [newQuestion.correct_answer, ...newQuestion.incorrect_answers]
      .sort(() => Math.random() - 0.5);
    console.log(shuffledAnswers.value);
  }
}, { immediate: true });
</script>

<style module>
.quiz {
  padding-top: 10rem;
  display: flex;
  justify-content: center;
  height: 100vh;
  width: 100%;

  @media (max-width: 800px) {
    padding-top: 4rem;
  }
}
</style>
