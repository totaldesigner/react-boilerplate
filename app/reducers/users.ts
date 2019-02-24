import { ActionType, getType } from 'typesafe-actions'
import * as actions from '../actions'
import User, { IUserDTO } from '../shared/models/User'

type Action = ActionType<typeof actions>

export default (state = [], action: Action) => {
  switch (action.type) {
    case getType(actions.fetchUsers):
      return state
    case getType(actions.fetchUsersSuccess):
      const payload = action.payload as any
      const results = payload.results || []
      return results.map((result: IUserDTO) => new User(result.email))
    case getType(actions.fetchUsersFailure):
      return state
    default:
      return state
  }
}
