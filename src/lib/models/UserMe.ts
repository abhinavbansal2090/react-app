import { Nullable } from '../types'
import { LanguageIds } from '../i18n'
import { Language } from './Language'
import { Experience } from './Experience'
import { ExperienceBooking } from './ExperienceBooking'

export type UserMe = {
  phoneNumber: Nullable<string>
  notificationLanguage: Nullable<Language[]>
  notificationLanguageId: LanguageIds
  isProvider: boolean
  isActive: boolean
  providerPending: boolean
  createdExperiences: Nullable<Experience[]>
  bookings: Nullable<ExperienceBooking[]>
  walletBalance: number
  referralCode: Nullable<string>
  referredBy: Nullable<string>
  firstName: Nullable<string>
  lastName: Nullable<string>
  avatar: Nullable<string>
  id: string
}
