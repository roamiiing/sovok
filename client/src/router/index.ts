import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@sovok/client/views/HomeView.vue'
import { AuthRequirement } from '@sovok/client/domain/auth'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: HomeView,
      meta: {
        auth: AuthRequirement.Whatever,
      },
    },

    {
      path: '/auth',
      meta: {
        auth: AuthRequirement.Unauthenticated,
      },
      children: [
        {
          path: 'sign-up',
          component: () => import('@sovok/client/views/auth/SignUpView.vue'),
        },
        {
          path: 'sign-in',
          component: () => import('@sovok/client/views/auth/SignInView.vue'),
        },
      ],
    },

    {
      path: '/app',
      meta: {
        auth: AuthRequirement.Authenticated,
      },
      children: [],
    },

    {
      path: '/:pathMatch(.*)*',
      component: () => import('@sovok/client/views/NotFoundView.vue'),
    },
  ],
})
