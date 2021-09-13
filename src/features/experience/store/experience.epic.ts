import { combineEpics, Epic, ofType } from 'redux-observable'
import { catchError, ignoreElements, map, switchMap } from 'rxjs/operators'
import { from, of } from 'rxjs'
import { PayloadAction } from '@reduxjs/toolkit'
import { store } from 'lib/store/store'
import { StoreState } from 'lib/store/reducers'
import { DEFAULT_PAGE_SIZE } from 'lib/configs'
import { ExperienceRepository } from 'services/experiences/repository'
import { GetExperienceMineResponse } from 'services/experiences/responses'
import { ExperienceActions, experienceSlice } from './experience.slice'

type RootEpic = Epic<ExperienceActions, ExperienceActions, StoreState>

const getExperienceMineEpic$: RootEpic = (action$) =>
  action$.pipe(
    ofType(experienceSlice.actions.fetchExperienceMine.type),
    switchMap<PayloadAction<{ Page: number }>, any>(({ payload }) =>
      from(
        ExperienceRepository.getMine({
          PageSize: DEFAULT_PAGE_SIZE,
          Page: payload?.Page,
        })
      ).pipe(
        map((res: GetExperienceMineResponse) => {
          if (res.page > 0) {
            return store.dispatch(
              experienceSlice.actions.appendExperienceMine(res)
            )
          }

          store.dispatch(experienceSlice.actions.setExperienceMine(res))
        }),
        catchError(() => {
          return of()
        })
      )
    ),
    ignoreElements()
  )

const archiveExperienceEpic$: RootEpic = (action$, store$) =>
  action$.pipe(
    ofType(experienceSlice.actions.archiveExperience.type),
    switchMap<PayloadAction<{ experienceId: number }>, any>(({ payload }) => {
      store.dispatch(experienceSlice.actions.setArchiveError(undefined))

      return from(
        ExperienceRepository.archiveExperience(payload.experienceId)
      ).pipe(
        map(() => {
          return store.dispatch(
            experienceSlice.actions.fetchExperienceMine({ Page: 0 })
          )
        }),
        catchError(() => {
          store.dispatch(
            experienceSlice.actions.setArchiveError(
              store$.value.locale.t.experience.archiveModal.archiveError
            )
          )

          return of()
        })
      )
    }),
    ignoreElements()
  )

export const listExperiencesEpics$ = combineEpics(
  getExperienceMineEpic$,
  archiveExperienceEpic$
)
