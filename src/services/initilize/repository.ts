import { RestMethods, httpService } from 'services/httpService'
import { API_PATHS } from 'services/apiPaths'
import { store } from 'lib/store/store'

const getAppData = async () => {
  const response = await httpService.request(API_PATHS.initialize, {
    method: RestMethods.GET,
  })

  if (!response.ok) {
    throw new Error('Could not load base of app')
  }

  return response.json()
}

const getToken = () => store.getState().auth.token

const getWallet = async () => {
  const response = await httpService.request(API_PATHS.walet, {
    method: RestMethods.GET,
    token: getToken(),
  })

  if (!response.ok) {
    console.log('error')
    return
  }
  return response.json()
}
const getPOIS = async () => {
  const response = await httpService.request(API_PATHS.poi, {
    method: RestMethods.GET,
  })

  if (!response.ok) {
    throw new Error('Could not load POI of app')
  }

  return response.json()
}

export const initializeRepositiory = {
  getAppData,
  getWallet,
  getPOIS,
}
