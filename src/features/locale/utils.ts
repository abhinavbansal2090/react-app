import Cookies from 'js-cookie'
import { ExperienceDescription, ExperienceLocation, TagLabel } from 'lib/models'
import { store } from 'lib/store/store'
import {
  availableLocales,
  availableLocalesNames,
  DEFAULT_APP_LOCALE,
} from 'lib/i18n'
import { ConfigCookies } from 'lib/constants'
import { Nullable } from 'lib/types'

const getLanguageId = () => store.getState().locale.languageId

export const getLabelsTranslationByLocale = (labels: TagLabel[]) => {
  const appLanguageId = getLanguageId()

  const label = labels.find((label) => label.languageId === appLanguageId)

  return label?.label
}

export const getDescriptionTranslationByLocale = (
  labels: ExperienceDescription[]
) => {
  const appLanguageId = getLanguageId()

  const label = labels.find((label) => label.languageId === appLanguageId)

  return label?.name
}

export const getLocationTranslationByLocale = (
  labels: ExperienceLocation[]
) => {
  const appLanguageId = getLanguageId()

  const label = labels.find((label) => label.languageId === appLanguageId)

  return label
}

type AvailableLocalesNames = keyof typeof availableLocales

export const updateLocalizationByCookieOrBrowser = () => {
  const localeFromCookie = Cookies.get(ConfigCookies.Locale) as Nullable<
    AvailableLocalesNames
  >
  const browserLang = navigator.language.split('-')[0] as AvailableLocalesNames

  const locale =
    localeFromCookie && availableLocalesNames.includes(localeFromCookie)
      ? localeFromCookie
      : availableLocalesNames.includes(browserLang)
      ? browserLang
      : DEFAULT_APP_LOCALE

  return {
    locale,
    isRtl: availableLocales[locale]?.isRtl,
    t: availableLocales[locale]?.t,
  }
}
