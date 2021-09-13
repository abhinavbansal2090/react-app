import { ExperienceInstanceForm } from 'lib/types/experience'

export const isRequiredDataExists = (data: ExperienceInstanceForm) =>
  data.experienceId &&
  data.time &&
  data.bookingLimit > 0 &&
  data.map &&
  data.price > 0 &&
  (data.durationHours || data.durationDays)
