import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { URL_AUTH_LOGIN, URL_AUTH_REGISTER } from '../../../utils/urls/apiUrls'
import { HttpMethodsEnum } from "../../../utils/enums/HttpMethodsEnum";
import { setLogin, setLoginError } from "../slices/auth.slices";

  export const AuthService = createApi({
    reducerPath: "authService",
    baseQuery: fetchBaseQuery({ baseUrl: "/" }),
    endpoints: builder => ({
      getLoginService: builder.query<
        { access_token: string },
        { req: { email: string; password: string } }
      >({
        query: ({ req }: any) => ({
          url: URL_AUTH_LOGIN,
          method: HttpMethodsEnum.POST,
          body: req,
        }),
        onQueryStarted: async (_arg,  { dispatch, queryFulfilled }) => {
          try {
            const { data } = await queryFulfilled
            const token = data?.access_token
            dispatch(setLogin(token))
          } catch (error) {
            dispatch(setLoginError('Error al intentar loguarse'))
          }
        },
      }),
      getRegisterService: builder.query({
        query: ({ req }: any) => ({
          url: URL_AUTH_REGISTER,
          method: HttpMethodsEnum.POST,
          body: req,
        }),
      }),
    }),
  })


export const { useLazyGetLoginServiceQuery, useLazyGetRegisterServiceQuery } = AuthService