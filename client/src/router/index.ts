import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@sovok/client/views/HomeView.vue'
import { AuthRequirement } from '@sovok/client/domain/auth'
import { Page } from '../domain/page'
import { redirectOnAuthMiddleware } from './redirect'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: HomeView,
      name: Page.Home,
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
          path: '',
          redirect: {
            name: Page.SignIn,
          },
        },
        {
          path: 'sign-up',
          name: Page.SignUp,
          component: () => import('@sovok/client/views/auth/SignUpView.vue'),
        },
        {
          path: 'sign-in',
          name: Page.SignIn,
          component: () => import('@sovok/client/views/auth/SignInView.vue'),
        },
      ],
    },

    {
      path: '/app',
      meta: {
        auth: AuthRequirement.Authenticated,
      },
      children: [
        {
          path: '',
          name: Page.DashboardHome,
          component: () =>
            import('@sovok/client/views/dashboard/DashboardHomeView.vue'),
        },
      ],
    },

    {
      path: '/:pathMatch(.*)*',
      component: () => import('@sovok/client/views/NotFoundView.vue'),
    },
  ],
})

router.beforeEach(redirectOnAuthMiddleware)

export { router }
