<template>
  <p
    v-if="message"
    v-html="message"
    :class="[
      $style.feedbackMessage,
      { [$style.correct]: isCorrect, [$style.incorrect]: !isCorrect }
    ]"
  ></p>
</template>

<script setup>
defineProps({
  message: String,
  isCorrect: Boolean
})
</script>

<style module>
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
</style>
