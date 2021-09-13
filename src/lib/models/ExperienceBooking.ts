import { ExperienceBookingStatus } from './ExperienceBookingStatus'
import { User } from './User'

export type ExperienceBooking = {
  id: number
  userId: string
  instanceId: number
  amount: number
  status: ExperienceBookingStatus
  user: User
}
