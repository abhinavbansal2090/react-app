import { ExperienceInstance } from '../models'
import { getDate } from './date'

export const groupInstancesByDate = (instances: ExperienceInstance[]) => {
  const instancesDate: any = []

  for (const instance of instances) {
    const idx = instancesDate
      .map(function (e: any) {
        return e.date
      })
      .indexOf(getDate(instance.time))
    if (idx === -1) {
      instancesDate.push({
        dateUTC: instance.time,
        date: getDate(instance.time),
        instances: [{ ...instance }],
      })
    } else {
      instancesDate[idx].instances.push(instance)
    }
  }
  instancesDate.sort(function (a: any, b: any) {
    return new Date(a.dateUTC).getTime() - new Date(b.dateUTC).getTime()
  })

  return instancesDate
}
