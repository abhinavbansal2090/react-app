import { combineEpics, Epic, ofType } from 'redux-observable'
import { catchError, ignoreElements, mergeMap, switchMap } from 'rxjs/operators'
import { PayloadAction } from '@reduxjs/toolkit'
import { concat, from, of } from 'rxjs'
import { StoreState } from 'lib/store/reducers'
import { store } from 'lib/store/store'
import { RequestState } from 'lib/types'
import { ExperienceInstancesRepository } from 'services/experienceInstances/repository'
import { ExperienceInstanceAdd } from 'lib/models'
import {
  GetInstancesForExperienceRequest,
  GetInstancesForExperienceResponse,
} from 'services/experienceInstances'
import {
  experienceInstancesSlice,
  ExperienceInstancesSliceActions,
} from './experienceInstances.slice'

type RootEpic = Epic<
  ExperienceInstancesSliceActions,
  ExperienceInstancesSliceActions,
  StoreState
>

const postExperienceInstanceEpic$: RootEpic = (action$) =>
  action$.pipe(
    ofType(experienceInstancesSlice.actions.postExperienceInstance.type),
    switchMap<PayloadAction<ExperienceInstanceAdd>, any>(({ payload }) => {
      store.dispatch(
        experienceInstancesSlice.actions.setExperienceInstance(payload)
      )

      return from(
        ExperienceInstancesRepository.addInstance(payload).then((res) => {
          store.dispatch(
            experienceInstancesSlice.actions.postingExperienceInstanceSuccess()
          )

          return res
        })
      ).pipe(
        catchError(() => {
          store.dispatch(
            experienceInstancesSlice.actions.postingExperienceInstanceError()
          )

          return of()
        })
      )
    }),
    ignoreElements()
  )

const getExperienceInstanceEpic$: RootEpic = (action$): any =>
  action$.pipe(
    ofType(experienceInstancesSlice.actions.getInstancesOfExperience.type),
    switchMap<PayloadAction<GetInstancesForExperienceRequest>, any>(
      ({ payload }) =>
        from(
          ExperienceInstancesRepository.getInstancesForExperience(payload)
        ).pipe(
          mergeMap((res: GetInstancesForExperienceResponse) =>
            of(
              payload.page !== undefined && payload.page > 0
                ? experienceInstancesSlice.actions.appendInstancesOfExperience(
                    res
                  )
                : experienceInstancesSlice.actions.setInstancesOfExperience(res)
            )
          ),
          catchError(() => {
            return of()
          })
        )
    )
  )

const deleteExperienceInstanceEpic$: RootEpic = (action$): any =>
  action$.pipe(
    ofType(experienceInstancesSlice.actions.deleteInstance.type),
    switchMap<PayloadAction<number>, any>(({ payload }) =>
      concat(
        of(
          experienceInstancesSlice.actions.setDeleteInstanceRequestState(
            RequestState.IsFetching
          )
        ),
        from(ExperienceInstancesRepository.deleteInstance(payload)).pipe(
          mergeMap(() =>
            of(
              experienceInstancesSlice.actions.setDeleteInstanceRequestState(
                RequestState.Success
              )
            )
          ),
          catchError(() =>
            of(
              experienceInstancesSlice.actions.setDeleteInstanceRequestState(
                RequestState.Error
              )
            )
          )
        )
      )
    )
  )

export const experienceInstancesEpics$ = combineEpics(
  postExperienceInstanceEpic$,
  getExperienceInstanceEpic$,
  deleteExperienceInstanceEpic$
)
