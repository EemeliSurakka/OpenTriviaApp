<template>
  <div :class="[$style.container, wasCorrectAnswer !== null ? (wasCorrectAnswer ? $style.correct : $style.incorrect) : '']">
    <span v-html="sanitizedAnswer" />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { sanitizeHTML } from '@/utils/utils.js'

const props = defineProps({
  answer: String,
  wasCorrectAnswer: {
    type: Boolean,
    default: null,
  },
});

const sanitizedAnswer = computed(() => sanitizeHTML(props.answer));
</script>

<style module>
.container {
  border: 1px solid #ccc;
  padding: 8px;
  border-radius: 4px;
  background-color: var(--secondary-color);
  margin: 4px 0;
  text-align: center;
  color: white;
  transition: all 0.2s ease;
  cursor: pointer;

  @media (max-width: 800px) {
    padding: 16px;
    font-size: 1.75rem;
  }
}

.correct {
  border-color: green;
}

.incorrect {
  border-color: red;
}
</style>
