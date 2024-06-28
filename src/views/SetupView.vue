<template>
  <section :class="$style.container">
    <h1 :class="$style.heading">Trivia Night</h1>
    <div :class="$style.card">
      <label for="difficulty" :class="$style.label">Select Difficulty:</label>
      <select v-model="selectedDifficulty" id="difficulty" :class="$style.select">
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <button @click="handleStartClick" :class="$style.button" :disabled="loading">
        <span v-if="loading" :class="$style.spinner"></span>
        <span v-else>Start</span>
      </button>
      <p :class="$style.error" v-if="error">Oops... Something went wrong. Please try again in a bit.</p>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { useInitGame } from '@/composables/useInitGame.js';

const selectedDifficulty = ref('easy');
const { loading, error, startGame } = useInitGame();

const handleStartClick = async () => {
  await startGame(selectedDifficulty.value);
};
</script>

<style module>
.container {
  padding-top: 10rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  text-align: center;
}

.heading {
  font-family: 'Kalam', sans-serif;
  font-size: 2.5rem;
}

.card {
  min-width: 20rem;
  height: 12.5rem;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background-color: var(--primary-color);
}

.label {
  margin-bottom: 0.5rem;
}

.select {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  margin-bottom: 1rem;
  background-color: #f9f9f9;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

.select:focus {
  border-color: #007BFF;
  outline: none;
}

.button {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  color: white;
  background-color: #007BFF;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.button:disabled {
  background-color: #0056b3;
  cursor: not-allowed;
}

.spinner {
  border: 2px solid #f3f3f3;
  border-top: 2px solid #3498db;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
}

.error {
  color: red;
  margin-top: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
