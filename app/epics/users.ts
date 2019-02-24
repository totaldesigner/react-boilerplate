import { Epic } from 'redux-observable'
import { from, of } from 'rxjs'
import { catchError, filter, map, mergeMap } from 'rxjs/operators'
import { ActionType, getType, isOfType } from 'typesafe-actions'
import * as actions from '../actions'
import { RootState } from '../reducers'
import * as api from '../shared/services/api'

type Action = ActionType<typeof actions>

export const fetchUsers: Epic<Action> = action$ =>
  action$.pipe(
    filter(isOfType(getType(actions.fetchUsers))),
    mergeMap((action) => {
      const { page, seed } = action.payload
      return from(api.fetchUsers(seed, page))
    }),
    map(payload => actions.fetchUsersSuccess(payload)),
    catchError(error => of(actions.fetchUsersFailure(error)))
  )
