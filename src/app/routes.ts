import {
    createWebHistory,
    createRouter,
    type NavigationGuardNext,
    type RouteLocationNormalizedGeneric,
    type RouteLocationNormalizedLoadedGeneric,
    type Router,
    type RouteRecordRaw,
} from "vue-router";
import {useAuthStore} from "../auth/store/auth.store.ts";
import {RoutesNamesEnum, RoutesPathEnum} from "../enums/RoutesNames.enum.ts";
import {RolesEnums} from "@/enums/Roles.enums.ts";

const routes: Readonly<RouteRecordRaw[]> = [
    {
        path: RoutesPathEnum.AUTH,
        name: RoutesNamesEnum.LOGIN,
        component: () => import("../auth/views/LoginView.vue"),
    },
    {
        path: RoutesPathEnum.MAIN,
        name: RoutesNamesEnum.MAIN,
        component: () => import("../layouts/MainLayout.vue"),
        children: [
            {
                path: RoutesPathEnum.HOME,
                name: RoutesNamesEnum.HOME,
                component: () =>
                    import("../modules/dashboard/views/DashboardViews.vue"),
            },
            {
                path: RoutesPathEnum.CLIENTS,
                name: RoutesNamesEnum.CLIENTS,
                component: () =>
                    import('../modules/clients/views/ClientsViews.vue'),
                beforeEnter: (_, _from, next: NavigationGuardNext) => {
                    const store = useAuthStore();
                    if (store.client?.rolId !== RolesEnums.ADMIN) {
                        return next({ name: RoutesNamesEnum.HOME });
                    }
                    return next();
                }
            },
            {
                path: RoutesPathEnum.CATEGORIES,
                name: RoutesNamesEnum.CATEGORIES,
                component: () =>
                    import('../modules/categories/views/CategoriesViews.vue')
            },
            {
                path: RoutesPathEnum.PRODUCTS,
                name: RoutesNamesEnum.PRODUCTS,
                component: () =>
                    import('../modules/products/views/ProductsViews.vue')
            },
            {
                path: RoutesPathEnum.ORDERS,
                name: RoutesNamesEnum.ORDERS,
                component: () =>
                    import('../modules/orders/views/OrdersViews.vue')
            },
            {
                path: RoutesPathEnum.SALES,
                name: RoutesNamesEnum.SALES,
                component: () =>
                    import('../modules/sales/views/SalesViews.vue')
            }
        ],
        beforeEnter: (
            _: RouteLocationNormalizedGeneric,
            _from: RouteLocationNormalizedLoadedGeneric,
            next: NavigationGuardNext
        ) => {
            const auth = useAuthStore();
            const isLogged: boolean = auth.client !== null && auth.token !== null
            if (!isLogged) return next({name: RoutesNamesEnum.LOGIN});
            next();
        },
    },
];

export const router: Router = createRouter({
    history: createWebHistory(),
    routes,
});
