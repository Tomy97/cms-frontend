import { createBrowserRouter } from "react-router-dom"
import { HomeViews, LoginViews, RegisterView } from "../views/index"
import { AuthLayout } from "../layouts/AuthLayout"
import { MainLayout } from "../layouts/MainLayout"
import { RoutesEnum } from "../utils/enums/RoutesEnum"
export const routes = createBrowserRouter(
  [
    {
      path: '',
      element: <AuthLayout />,
      children: [
        {
          index: true,
          element: <LoginViews />,
        },
        {
          path: RoutesEnum.REGISTER,
          element: <RegisterView />,
        },
      ],
    },
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          path: RoutesEnum.HOME,
          element: <HomeViews />,
        },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  },
)
