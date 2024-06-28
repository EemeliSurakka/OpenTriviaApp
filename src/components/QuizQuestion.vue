<template>
  <div :class="$style.quizQuestion">
    <h2 :class="$style.question" v-html="sanitizedQuestion"></h2>
    <div :class="$style.answers">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import QuizQuestion from '@/classes/QuizQuestion.js';
import DOMPurify from 'dompurify';
import { computed } from 'vue';

const props = defineProps({
  quizQuestion: QuizQuestion,
});

const sanitizedQuestion = computed(() => DOMPurify.sanitize(props.quizQuestion.question));
</script>

<style module>
.quizQuestion {
  padding: 2rem;
  width: 50rem;
  text-align: center;
}

.question {
  font-family: 'Kalam', sans-serif;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;

  @media (max-width: 800px) {
    font-size: 3rem;
  }
}

.answers {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
</style>
