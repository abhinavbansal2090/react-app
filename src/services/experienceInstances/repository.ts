import { ExperienceInstanceAdd } from 'lib/models'
import { store } from 'lib/store/store'
import { httpService, RestMethods } from '../httpService'
import { API_PATHS } from '../apiPaths'
import { GetInstancesForExperienceResponse } from './responses'
import { GetInstancesForExperienceRequest } from './requests'

const getToken = () => store.getState().auth.token

const addInstance = async (query: ExperienceInstanceAdd) => {
  const queryFormated = { ...query, price: query.price * 100 }

  const response = await httpService.request(
    API_PATHS.experienceInstance.create,
    {
      method: RestMethods.POST,
      body: queryFormated,
      token: getToken(),
    }
  )

  if (!response.ok) {
    throw new Error('Could not create experience instance')
  }

  return response.json() as Promise<ExperienceInstanceAdd>
}

export const getInstancesForExperience = async (
  req: GetInstancesForExperienceRequest
) => {
  const { experienceId, page = 0, pastInstances = false } = req
  const response = await httpService.request(
    API_PATHS.experienceInstance.forExperience,
    {
      method: RestMethods.GET,
      param: experienceId,
      query: {
        Page: page,
        PastInstances: pastInstances,
      },
      token: getToken(),
    }
  )

  if (!response.ok) {
    throw new Error('Could not get experience instances')
  }

  return response.json() as Promise<GetInstancesForExperienceResponse>
}

const deleteInstance = async (instanceId: number) => {
  const response = await httpService.request(
    API_PATHS.experienceInstance.delete,
    {
      method: RestMethods.DELETE,
      param: instanceId,
      token: getToken(),
    }
  )

  if (!response.ok) {
    throw new Error('Could not delete experience instance')
  }

  return true
}

export const ExperienceInstancesRepository = {
  addInstance,
  getInstancesForExperience,
  deleteInstance,
}
