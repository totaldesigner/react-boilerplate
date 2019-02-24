import { routerMiddleware } from 'react-router-redux'
import { applyMiddleware, createStore, Middleware, Store } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { ActionType } from 'typesafe-actions'
import * as actions from './actions'
import getEpics from './epics'
import reducers, { RootState } from './reducers'
import { loadState } from './shared/services/cache'
import history from './utils/history'

type Action = ActionType<typeof actions>

export default function configureStore(initialState?: object) {
  const persistedState = loadState()
  const epicMiddleware = createEpicMiddleware<Action, Action, RootState>()

  const middlewares: Middleware[] = [
    epicMiddleware,
    routerMiddleware(history),
  ]
  const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore)
  const store = createStoreWithMiddleware(reducers, persistedState || initialState!)

  epicMiddleware.run(getEpics(store))
  return store
}
