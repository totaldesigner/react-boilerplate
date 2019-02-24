import { Epic } from 'redux-observable'
import { from, of } from 'rxjs'
import { catchError, filter, map, mergeMap } from 'rxjs/operators'
import { ActionType, getType, isOfType } from 'typesafe-actions'

import { RootState } from '../reducers'
import { fetchUsers } from '../shared/services/api'

import * as actions from '../actions'

type Action = ActionType<typeof actions>

export const fetchUsersEpic: Epic<Action, Action, RootState> = action$ =>
  action$.pipe(
    filter(isOfType(getType(actions.fetchUsers))),
    mergeMap((action) => {
      const { page, seed } = action.payload
      return from(fetchUsers(seed, page))
    }),
    map(payload => actions.fetchUsersSuccess(payload)),
    catchError(err => of(actions.fetchUsersFailure(err)))
  )
