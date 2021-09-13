import { Nullable } from '../types'

export type ExperienceLocation = {
  entityId: number
  languageId: number
  city: Nullable<string>
  address: Nullable<string>
  location: Nullable<string>
}
