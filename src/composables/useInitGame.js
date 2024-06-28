import { ref } from 'vue';
import { triviaService } from '@/services/triviaService';
import QuizQuestion from '@/classes/QuizQuestion';
import { useGameStore } from '@/stores/useGameStore';

export function useInitGame() {
  const loading = ref(false);
  const error = ref(null);
  const gameStore = useGameStore();

  const startGame = async (difficulty) => {
    loading.value = true;
    error.value = null;

    const { data, error: serviceError } = await triviaService(difficulty);

    if (serviceError) {
      error.value = serviceError;
    } else {
      gameStore.setQuestions(data.map(q => new QuizQuestion(
        q.category,
        q.correct_answer,
        q.difficulty,
        q.incorrect_answers,
        q.question,
        q.type
      )));
    }

    loading.value = false;
  };

  // Todo: Handle error

  return {
    loading,
    error,
    startGame
  };
}
