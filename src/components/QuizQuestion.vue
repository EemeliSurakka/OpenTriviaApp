<template>
  <div :class="$style.container">
    <h2 :class="$style.question" v-html="sanitizedQuestion"></h2>
    <div :class="$style.answers">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import QuizQuestion from '@/classes/QuizQuestion.js'
import { computed } from 'vue'
import { sanitizeHTML } from '@/utils/utils.js'

const props = defineProps({
  quizQuestion: QuizQuestion
})

const sanitizedQuestion = computed(() => sanitizeHTML(props.quizQuestion.question))
</script>

<style module>
.container {
  padding: 2rem;
  max-width: 50rem;
  text-align: center;

  @media (max-width: 800px) {
    padding: 1rem;
  }
}

.question {
  font-family: 'Kalam', sans-serif;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;

  @media (max-width: 800px) {
    font-size: 1rem;
    margin-bottom: 0.75rem;
  }
}

.answers {
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (max-width: 800px) {
    gap: 0.25rem;
  }
}
</style>
