import { Epic, combineEpics, ofType } from 'redux-observable'
import { ignoreElements, switchMap, tap } from 'rxjs/operators'
import { from, pipe } from 'rxjs'
import { StoreState } from 'lib/store/reducers'
import { store } from 'lib/store/store'
import { initializeRepositiory } from 'services/initilize/repository'
import { businessSlice } from 'features/business/store/business.slice'

import { InitializeActions, initializeSlice } from './initialize.slice'

type RootEpic = Epic<InitializeActions, InitializeActions, StoreState>

const initializeEpic$: RootEpic = (action$) =>
  action$.pipe(
    ofType(initializeSlice.actions.initialize.type),
    pipe(
      switchMap(() => from(initializeRepositiory.getAppData())),
      tap((response: any) => {
        store.dispatch(initializeSlice.actions.setBase({ response }))
        store.dispatch(businessSlice.actions.setBase({ response }))
      }),
      switchMap(() => from(initializeRepositiory.getWallet())),
      tap((response: any) => {
        store.dispatch(initializeSlice.actions.setUserData({ response }))
      }),
      switchMap(() => from(initializeRepositiory.getPOIS())),
      tap((response: any) => {
        store.dispatch(initializeSlice.actions.setPOI({ response }))
        store.dispatch(businessSlice.actions.setPOI({ response }))
      })
    ),
    ignoreElements()
  )

export const initializeEpics$ = combineEpics(initializeEpic$)
