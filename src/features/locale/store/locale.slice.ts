import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ActionsUnion } from 'lib/redux/action-union'
import { availableLocales, LanguageIds, DEFAULT_APP_LOCALE } from 'lib/i18n'
import { AvailableLocaleNames, Translations } from 'lib/types'
import { getLanguageIdByLocaleName } from 'lib/utils'

export interface LocaleState {
  isLayoutRtl: boolean
  languageId: number
  locale: AvailableLocaleNames
  t: Translations
}

const initialState: LocaleState = {
  isLayoutRtl: false,
  languageId: LanguageIds.English,
  locale: 'en',
  t: availableLocales[DEFAULT_APP_LOCALE].t,
}

export const localeSlice = createSlice({
  name: 'locale',
  initialState,
  reducers: {
    reset: () => initialState,
    setByLocale: (
      state,
      action: PayloadAction<{ locale: AvailableLocaleNames }>
    ) => {
      const languageId = getLanguageIdByLocaleName(action.payload.locale)

      state.languageId = languageId
      state.isLayoutRtl = availableLocales[action.payload.locale].isRtl
      state.locale = action.payload.locale
      state.t = availableLocales[action.payload.locale].t
    },
  },
})

export type LocaleActions = ActionsUnion<typeof localeSlice.actions>
