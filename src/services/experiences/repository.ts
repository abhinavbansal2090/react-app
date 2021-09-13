import { API_PATHS } from 'services/apiPaths'
import { store } from 'lib/store/store'
import { ExperienceAdd } from 'lib/models/ExperienceAdd'
import { httpService, httpServiceFormData, RestMethods } from '../httpService'
import { GetExperienceMineResponse } from './responses'
import { GetExperienceMineRequest } from './requests'

const getToken = () => store.getState().auth.token

const getMine = async (query: GetExperienceMineRequest) => {
  const response = await httpService.request(API_PATHS.experience.Mine, {
    method: RestMethods.GET,
    query,
    token: getToken(),
  })

  if (!response.ok) {
    throw new Error('Could not get mine experiences')
  }

  return response.json() as Promise<GetExperienceMineResponse>
}

const addExperience = async (body: ExperienceAdd) => {
  const response = await httpService.request(API_PATHS.experience.Add, {
    method: RestMethods.POST,
    body,
    token: getToken(),
  })
  return {
    ok: response.ok,
    data: response.ok ? await response.json() : response,
  }
}

const addPhoto = async (query: any, id: number) => {
  const formData = new FormData()

  formData.append('file', query)
  const response = await httpServiceFormData.request(
    `${API_PATHS.experience.Image}/${id}`,
    {
      method: RestMethods.POST,
      body: formData,
      token: getToken(),
    }
  )

  if (!response.ok) {
    return false
  }

  return response
}

const archiveExperience = async (experienceId: number) => {
  const response = await httpService.request(API_PATHS.experience.archive, {
    method: RestMethods.PUT,
    param: experienceId,
    token: getToken(),
  })

  if (!response.ok) {
    throw new Error('Could not archive experience')
  }

  return true
}

export const ExperienceRepository = {
  addPhoto,
  getMine,
  addExperience,
  archiveExperience,
}
