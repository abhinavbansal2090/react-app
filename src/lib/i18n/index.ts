import { AvailableLocaleNames } from '../types'
import { ar } from './ar'
import { en } from './en'

export const availableLocales = {
  ar,
  en,
}
export const availableLocalesNames = Object.keys(
  availableLocales
) as AvailableLocaleNames[]
export * from './consts'
