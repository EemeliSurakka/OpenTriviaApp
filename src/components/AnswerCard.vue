<template>
  <div :class="$style.answerCard">
    {{ sanitizedAnswer }}
  </div>
</template>

<script setup>
import { computed } from 'vue'
import DOMPurify from 'dompurify'

const props = defineProps({
  answer: String
});

const sanitizedAnswer = computed(() => DOMPurify.sanitize(props.answer));
</script>

<style module>
.answerCard {
  border: 1px solid #ccc;
  padding: 8px;
  border-radius: 4px;
  background-color: var(--secondary-color);
  margin: 4px 0;
  text-align: center;
  color: white;

  @media (max-width: 800px) {
      padding: 16px;
      font-size: 1.75rem;
  }
}

</style>
