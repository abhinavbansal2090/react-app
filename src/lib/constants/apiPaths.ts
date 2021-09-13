import { isProduction, isDevelopment, isStaging } from './environment'

const DEV_API_BASE_PATH = 'https://api-dev.track-sa.com/api/'
const STAGING_API_BASE_PATH = 'https://api-dev.track-sa.com/api/'
const PROD_API_BASE_PATH = 'https://api.track-sa.com/api/'

const MOYASAR_PATH = 'https://api.moyasar.com/v1/payments'
const CORS_PATH_MOYASAR =
  'https://cors-anywhere.herokuapp.com/https://api.moyasar.com/v1/payments'

const getApiBasePath = () => {
  if (isProduction()) {
    return PROD_API_BASE_PATH
  }

  if (isStaging()) {
    return STAGING_API_BASE_PATH
  }

  if (isDevelopment()) {
    return DEV_API_BASE_PATH
  }

  return DEV_API_BASE_PATH
}

const getMoyasarPath = () => {
  if (isDevelopment()) {
    return CORS_PATH_MOYASAR
  }

  if (isStaging()) {
    return MOYASAR_PATH
  }

  if (isProduction()) {
    return MOYASAR_PATH
  }

  return CORS_PATH_MOYASAR
}

export const API_BASE_PATH = getApiBasePath()
export const MOYASAR_BASE_PATH = getMoyasarPath()
