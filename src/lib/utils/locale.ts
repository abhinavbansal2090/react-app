import { AvailableLocaleNames } from '../types'
import { LanguageIds } from '../i18n'

export const getLanguageIdByLocaleName = (locale: AvailableLocaleNames) => {
  switch (locale) {
    case 'en':
      return LanguageIds.English
    case 'ar':
      return LanguageIds.Arabic
    default:
      return LanguageIds.English
  }
}
