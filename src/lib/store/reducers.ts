import {
  experienceSlice,
  ExperienceState,
} from 'features/experience/store/experience.slice'
import {
  initializeSlice,
  InitializeState,
} from 'features/initialize/initialize.slice'
import {
  AllFiltersState,
  businessSlice,
} from 'features/business/store/business.slice'
import { localeSlice, LocaleState } from 'features/locale/store/locale.slice'
import { authSlice, AuthState } from 'features/auth/store/auth.slice'
import { UserState, userSlice } from 'features/user/store'
import {
  experienceInstancesSlice,
  ExperienceInstanceState,
} from 'features/experienceInstances/store/experienceInstances.slice'

export interface StoreState {
  auth: AuthState
  base: InitializeState
  business: AllFiltersState
  experience: Partial<ExperienceState>
  experienceInstance: ExperienceInstanceState
  locale: LocaleState
  user: Partial<UserState>
}

export const reducers = {
  auth: authSlice.reducer,
  base: initializeSlice.reducer,
  business: businessSlice.reducer,
  experience: experienceSlice.reducer,
  experienceInstance: experienceInstancesSlice.reducer,
  locale: localeSlice.reducer,
  user: userSlice.reducer,
}
