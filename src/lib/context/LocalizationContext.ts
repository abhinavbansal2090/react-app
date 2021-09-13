import { createContext } from 'react'
import { AvailableLocaleNames, Translations } from '../types'

type LocalizationContextProps = {
  t: Translations
  isRtl: boolean
  locale: AvailableLocaleNames
}

export const LocalizationContext = createContext<LocalizationContextProps>(
  {} as LocalizationContextProps
)
