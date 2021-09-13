import { store } from 'lib/store/store'
import { GetUserResult } from 'features/user/types'
import { httpService, RestMethods } from '../httpService'
import { API_PATHS } from '../apiPaths'
import { GetUserMeResponse } from './responses'

const getToken = () => store.getState().auth.token

const getUserMe = async () => {
  const token = getToken()

  const response = await httpService.request(API_PATHS.user.me, {
    method: RestMethods.GET,
    token,
  })

  if (response.status === 404) {
    throw new Error(GetUserResult.NotFound)
  }

  if (!response.ok) {
    throw new Error(GetUserResult.Error)
  }

  return response.json() as Promise<GetUserMeResponse>
}

export const UserRepository = {
  getUserMe,
}
