import { combineEpics } from 'redux-observable'
import { initializeEpics$ } from 'features/initialize/initialize.epic'
import { listExperiencesEpics$ } from 'features/experience/store/experience.epic'
import { experienceInstancesEpics$ } from 'features/experienceInstances/store/experienceInstances.epic'
import { userEpics$ } from 'features/user/store'

export const rootEpic = combineEpics(
  initializeEpics$,
  listExperiencesEpics$,
  experienceInstancesEpics$,
  userEpics$
)
