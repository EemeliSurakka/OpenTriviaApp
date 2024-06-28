<template>
    <h1>Trivia Night</h1>
  <div :class="$style.card">
  </div>
</template>

<script setup>

import { triviaService } from '@/services/triviaService.js'

async function getTrivia() {
  const token = await triviaService('hard');
  console.log(token);
}

getTrivia();

</script>

<style module>
.card {
  min-width: 20rem;
  max-width: 50rem;
  height: 12.5rem;
  background-color: white;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
