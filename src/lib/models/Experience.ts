import { Nullable } from '../types'
import { ExperienceDescription } from './ExperienceDescription'
import { ExperienceImage } from './ExperienceImage'
import { ExperienceInstance } from './ExperienceInstance'
import { ExperienceLocation } from './ExperienceLocation'
import { User } from './User'

export type Experience = {
  id: number
  providerId: Nullable<string>
  added: string
  isApproved: boolean
  isArchived: boolean
  descriptions: ExperienceDescription[]
  categoryId: number
  regionId: number
  poiId: Nullable<number>
  genderRestrictionId: number
  ageRestrictionId: number
  difficultyLevelId: number
  activityIds: number[]
  images: ExperienceImage[]
  instances: ExperienceInstance[]
  instanceCount: Nullable<number>
  locations: ExperienceLocation[]
  latitude: number
  longitude: number
  provider: User
}
