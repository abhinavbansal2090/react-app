import { Experience } from 'lib/models'

export type GetExperienceMineResponse = {
  data: Experience[]
  pages: number
  page: number
  pageSize: number
  total: number
}
