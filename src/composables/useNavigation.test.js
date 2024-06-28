import { describe, it, expect, vi } from 'vitest';
import { createRouter, createWebHistory } from 'vue-router';
import { useNavigation } from '@/composables/useNavigation';
import { mount } from '@vue/test-utils';
import { defineComponent } from 'vue';

describe('useNavigation', () => {
  const routes = [
    { path: '/quiz', name: 'Quiz', component: defineComponent({ template: '<div>Quiz</div>' }) },
  ];

  const router = createRouter({
    history: createWebHistory(),
    routes,
  });

  router.push = vi.fn().mockResolvedValue(true);

  it('navigates to the given route', async () => {
    const TestComponent = defineComponent({
      template: '<div>Quiz</div>',
      setup() {
        const { navigateTo } = useNavigation();
        navigateTo('/quiz');
      },
    });

    mount(TestComponent, {
      global: {
        plugins: [router],
      },
    });

    expect(router.push).toHaveBeenCalledWith('/quiz');
  });
});
