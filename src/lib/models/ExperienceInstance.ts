import { ExperienceBooking } from './ExperienceBooking'
import { ExperienceRallyLocation } from './ExperienceRallyLocation'

export type ExperienceInstance = {
  id: number
  experienceId: number
  time: string
  bookingLimit: number
  price: number
  remainingSlots: number
  latitude: number
  longitude: number
  rallyLocation: ExperienceRallyLocation[]
  bookings: ExperienceBooking[]
  duration?: number
}
