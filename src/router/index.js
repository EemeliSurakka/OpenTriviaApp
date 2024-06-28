import { createRouter, createWebHistory } from 'vue-router'
import SetupView from '../views/SetupView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'setup',
      meta: {
        title: 'Trivia night - Setup'
      },
      component: SetupView
    },
    {
      path: '/quiz',
      meta: {
        title: 'Trivia night - Quiz'
      },
      name: 'quiz',
      component: () => import('../views/QuizView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Trivia night'
  next()
})

export default router
