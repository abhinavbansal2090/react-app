import { combineEpics, Epic, ofType } from 'redux-observable'
import { catchError, mergeMap, switchMap } from 'rxjs/operators'
import { empty, from, of } from 'rxjs'
import { StoreState } from 'lib/store/reducers'
import { authSlice } from 'features/auth/store/auth.slice'
import { GetUserMeResponse, UserRepository } from 'services/user'
import { GetUserResult } from '../types'
import { UserActions, userSlice } from './user.slice'

type RootEpic = Epic<UserActions, UserActions, StoreState>

const fetchUserMeEpic$: RootEpic = (action$) =>
  action$.pipe(
    ofType(userSlice.actions.fetchUserMe.type),
    switchMap(() =>
      from(UserRepository.getUserMe()).pipe(
        mergeMap((response: GetUserMeResponse) =>
          of(
            userSlice.actions.setUser(response),
            userSlice.actions.setGettingUserResult(GetUserResult.Success)
          )
        ),
        catchError((err) => {
          if (err.message === GetUserResult.Error) {
            return of(
              userSlice.actions.setGettingUserResult(GetUserResult.Error),
              authSlice.actions.reset()
            )
          }

          if (err.message === GetUserResult.NotFound) {
            return of(
              userSlice.actions.setGettingUserResult(GetUserResult.NotFound)
            )
          }

          return empty
        })
      )
    )
  )

export const userEpics$ = combineEpics(fetchUserMeEpic$)
