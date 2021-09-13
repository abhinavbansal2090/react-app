import { ExperienceRallyLocation } from './ExperienceRallyLocation'

export type ExperienceInstanceAdd = {
  experienceId: number
  time: string
  bookingLimit: number
  price: number
  rallyLocation?: ExperienceRallyLocation[]
  latitude?: number
  longitude?: number
  duration: number
}
