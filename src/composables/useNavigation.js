import { useRouter } from 'vue-router';

export function useNavigation() {
  const router = useRouter();

  async function navigateTo(route) {
    await router.push(route);
  }

  return { navigateTo };
}
