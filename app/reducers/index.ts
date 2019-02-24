import { connectRouter } from 'connected-react-router'
import { combineReducers } from 'redux'
import { ActionType, getType } from 'typesafe-actions'
import * as actions from '../actions'
import User from '../shared/models/User'
import history from '../utils/history'
import locale from './locale'
import users from './users'

export type RootState = {
  locale: Language
  users: User[]
}

type Action = ActionType<typeof actions>

const isFetching = (state = false, action: Action) => {
  switch (action.type) {
    case getType(actions.fetchUsers):
      return true
    case getType(actions.fetchUsersSuccess):
    case getType(actions.fetchUsersFailure):
      return false
    default:
      return state
  }
}

const errorMessage = (state = null, action: Action) => {
  switch (action.type) {
    case getType(actions.fetchUsersFailure):
      return action.payload as any
    case getType(actions.fetchUsers):
    case getType(actions.fetchUsersSuccess):
      return null
    default:
      return state
  }
}

export default combineReducers({
  users,
  locale,
  isFetching,
  errorMessage,
  router: connectRouter(history),
})
