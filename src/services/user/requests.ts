import { LanguageIds } from 'lib/i18n'
import { Nullable } from 'lib/types'

export type UserInitializeBody = {
  firstName: Nullable<string>
  lastName: Nullable<string>
  languageId: LanguageIds
  referral: Nullable<string>
  phoneNumber: string
}
