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
      <button @click="getTrivia" :class="$style.button">Start</button>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { triviaService } from '@/services/triviaService.js';

const selectedDifficulty = ref('easy');

async function getTrivia() {
  const token = await triviaService(selectedDifficulty.value);
  console.log(token);
}
</script>

<style module>
@font-face {
  font-family: 'Kalam';
  src: url('@/assets/fonts/Kalam-Regular.ttf') format('truetype');
  font-weight: 400;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  background-color: #2c3e50;
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
}

.button:hover {
  background-color: #0056b3;
}
</style>
