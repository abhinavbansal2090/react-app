export enum ENV {
  Dev = 'dev',
  Staging = 'staging',
  Prod = 'prod',
}

const WEBSITE_ENV = process.env.REACT_APP_ENV

export const isProduction = () => WEBSITE_ENV === ENV.Prod
export const isStaging = () => WEBSITE_ENV === ENV.Staging
export const isDevelopment = () => WEBSITE_ENV === ENV.Dev
