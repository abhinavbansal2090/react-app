import { Nullable } from '../types'

export type ExperienceRallyLocation = {
  entityId?: number
  languageId: number
  city?: Nullable<string>
  address?: Nullable<string>
  location: string
}
