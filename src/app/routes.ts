import {
  createMemoryHistory,
  createRouter, type NavigationGuardNext,
  type RouteLocationNormalizedGeneric,
  type RouteLocationNormalizedLoadedGeneric, type Router,
  type RouteRecordRaw
} from 'vue-router'
import { useAuthStore } from '../auth/store/auth.store.ts'
import {RoutesNamesEnum} from "../enums/routesNames.enum.ts";
const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/auth',
    name: RoutesNamesEnum.LOGIN,
    component: () => import('../auth/views/LoginView.vue')
  },
  {
    path: '/',
    name: RoutesNamesEnum.MAIN,
    component: () => import('../layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: RoutesNamesEnum.HOME,
        component: () => import('../modules/dashboard/views/DashboardViews.vue'),
      }
    ],
    beforeEnter: (_: RouteLocationNormalizedGeneric, _from: RouteLocationNormalizedLoadedGeneric, next: NavigationGuardNext) => {
      const auth = useAuthStore()
      if (!auth.isLogged) return next({ name: RoutesNamesEnum.LOGIN })
      next()
    }
  }
]

export const router: Router = createRouter({
  history: createMemoryHistory(),
  routes,
})