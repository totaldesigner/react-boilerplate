import { ActionType, getType } from 'typesafe-actions'
import * as actions from '../actions'
import { DEFAULT_LOCALE } from '../i18n'

type Action = ActionType<typeof actions>

export default (state = DEFAULT_LOCALE, action: Action) => {
  switch (action.type) {
    case getType(actions.changeLocale):
      return action.payload
    default:
      return state
  }
}
