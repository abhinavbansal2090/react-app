import { ExperienceInstance } from 'lib/models'

export type GetInstancesForExperienceResponse = {
  data: ExperienceInstance[]
  pages: number
  page: number
  pageSize: number
  total: number
}
