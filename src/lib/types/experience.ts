import { ExperienceMap } from 'lib/models'

export type ExperienceRoutingParams = {
  experienceId: string
}

export type ExperienceInstanceRoutingParams = {
  experienceId: string
  instanceId: string
}

export type ExperienceInstanceForm = {
  experienceId: number
  time: string
  bookingLimit: number
  price: number
  map?: ExperienceMap
  durationHours: number
  durationDays: number
}
