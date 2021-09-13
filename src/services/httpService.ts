import { store } from 'lib/store/store'
import { hasKeys, getWebView, jsonToQueryString } from 'lib/utils'
import { API_BASE_PATH, MOYASAR_BASE_PATH } from 'lib/constants'
import { Nullable, Undefineable } from 'lib/types'
import { authSlice } from '../features/auth/store/auth.slice'
import { FirebaseService } from './FirebaseService'

export enum RestMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type RequestOptions<T> = {
  method?: RestMethods
  param?: string | number
  body?: T
  query?: T
  token?: Nullable<string>
  headers?: Record<string, Undefineable<string>>
}

export const httpServiceMoyasar = {
  request: (options: RequestOptions<FormData>) => {
    const { body } = options
    const pathToRequest = MOYASAR_BASE_PATH
    return fetch(pathToRequest, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body,
    })
  },
}

export const httpServiceFormData = {
  request: (path: string, options: RequestOptions<FormData>) => {
    const { query, body, headers, param, method } = options
    const exactPath = API_BASE_PATH.concat(path)
    const pathWithParam = param ? exactPath.concat(`/${param}`) : exactPath
    const pathToRequest =
      query && hasKeys(query)
        ? `${pathWithParam}?${jsonToQueryString(query)}`
        : pathWithParam
    const requestHeaders = {
      Authorization: options.token ? `Bearer ${options.token}` : undefined,
      ...headers,
    } as Record<string, string>

    return fetch(pathToRequest, {
      method,
      headers: requestHeaders,
      body: body,
    })
  },
}

export const httpService = {
  request: async <T extends Record<string, any>>(
    path: string,
    options: RequestOptions<T>
  ) => {
    const { query, body, headers, param, method } = options
    const exactPath = API_BASE_PATH.concat(path)
    const pathWithParam = param ? exactPath.concat(`/${param}`) : exactPath
    const pathToRequest =
      query && hasKeys(query)
        ? `${pathWithParam}?${jsonToQueryString(query)}`
        : pathWithParam
    const requestHeaders = {
      'Content-Type': 'application/json',
      Authorization: options.token ? `Bearer ${options.token}` : undefined,
      ...headers,
    } as Record<string, string>

    const callFetch = () =>
      fetch(pathToRequest, {
        method,
        headers: requestHeaders,
        body: body ? JSON.stringify(body) : undefined,
      })

    const res = await callFetch()

    if (res.status === 401) {
      if (getWebView()) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        window.ReactNativeWebView.postMessage('refreshToken')
        // wait for mobile app to refresh token and retry
        // the token is being refreshed in store of WebView by hook useCookieUpdate
        await new Promise((resolve) => setTimeout(resolve, 2000))

        return callFetch()
      }

      const token = await FirebaseService.refreshToken()

      if (token) {
        store.dispatch(authSlice.actions.setToken(token.token))

        return callFetch()
      } else {
        store.dispatch(authSlice.actions.setIsAuthenticated(false))
      }
    }

    return res
  },
}
