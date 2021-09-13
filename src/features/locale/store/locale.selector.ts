import { StoreState } from 'lib/store/reducers'

export const getLanguageId = (store: StoreState) => store.locale.languageId
export const getLocale = (store: StoreState) => store.locale.locale
export const getIsRtl = (store: StoreState) => store.locale.isLayoutRtl
