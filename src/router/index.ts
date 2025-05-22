import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/optimization',
      redirect: '/optimization/quick'
    },
    {
      path: '/optimization/quick',
      name: 'quick-optimization',
      component: () => import('../views/Optimization.vue')
    },
    {
      path: '/optimization/fine',
      name: 'fine-optimization',
      component: () => import('../views/Optimization.vue')
    },
    {
      path: '/optimization/settings',
      name: 'settings',
      component: () => import('../views/Optimization.vue')
    }
  ]
})

export default router 