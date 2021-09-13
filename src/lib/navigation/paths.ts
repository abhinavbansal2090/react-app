import { routes } from './routes'

export const paths = {
  addExperienceInstance: (experienceId: number) =>
    experienceId ? `/experience/${experienceId}/addInstance` : routes.manage,
  addExperienceInstanceMap: (experienceId: number) =>
    experienceId ? `/experience/${experienceId}/map` : routes.manage,
  experience: (experienceId: number) =>
    experienceId ? `/experience/${experienceId}` : routes.manage,
  experienceInstance: (experienceId: number, instanceId: number) =>
    experienceId
      ? `/experience/${experienceId}/instance/${instanceId}`
      : routes.manage,
  experiencePastInstances: (experienceId: number) =>
    experienceId ? `/experience/${experienceId}/past-instances` : routes.manage,
}
