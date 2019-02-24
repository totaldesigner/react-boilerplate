import { Store } from 'redux'
import { combineEpics, Epic } from 'redux-observable'
import { debounceTime, ignoreElements, tap } from 'rxjs/operators'
import { ActionType } from 'typesafe-actions'
import * as actions from '../actions'
import { RootState } from '../reducers'
import { saveState } from '../shared/services/cache'
import { fetchUsers } from './users'

type Action = ActionType<typeof actions>

const SAVING_DELAY = 1000

const getEpics = (store: Store) => {
  const saveStateToLocalStorage: Epic<Action, Action, RootState> = action$ =>
    action$.pipe(
      debounceTime(SAVING_DELAY),
      tap(() => {
        saveState(store.getState())
      }),
      ignoreElements()
    )

  return combineEpics(fetchUsers, saveStateToLocalStorage)
}

export default getEpics
