import { TagLabel } from './TagLabel'

export type Filters = {
  id: number
  title: TagLabel[]
  isChecked: boolean
  iconEmoji?: string
  regionId?: number
}
