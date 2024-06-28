<template>
  <div :class="$style.container">
    <div
      v-for="(question, index) in questions"
      :key="question.id"
      :class="[
        $style.ball,
        questionStatus[index] === null ? $style.unanswered :
        questionStatus[index] ? $style.correct : $style.incorrect,
        index === currentQuestionIndex ? $style.current : ''
      ]"
    ></div>
  </div>
</template>

<script setup>
defineProps({
  questions: {
    type: Array,
    required: true
  },
  questionStatus: {
    type: Array,
    required: true
  },
  currentQuestionIndex: {
    type: Number,
    required: true
  }
});
</script>

<style module>
.container {
  display: flex;
  gap: 8px;
}

.ball {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: grey; /* Default color for unanswered questions */
}

.unanswered {
  background-color: grey;
}

.correct {
  background-color: green;
}

.incorrect {
  background-color: red;
}

.current {
  background-color: yellow;
}
</style>
